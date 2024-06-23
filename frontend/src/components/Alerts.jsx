import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const FrontlinerAlerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const { data: session, status } = useSession();

    const markAsComplete = async (alertId) => {
        try {
            const response = await fetch("/api/markComplete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ alertId }),
            });

            if (response.ok) {
                alert("Marked as complete");
                // Optionally, you can refresh the alerts list or update the state
                setAlerts((prevAlerts) =>
                    prevAlerts.map((alert) =>
                        alert._id === alertId
                            ? { ...alert, responded: true }
                            : alert
                    )
                );
            } else {
                console.error(
                    "Error marking alert as complete:",
                    response.statusText
                );
                alert("Error marking alert as complete");
            }
        } catch (error) {
            console.error("Error marking alert as complete:", error);
            alert("Error marking alert as complete");
        }
    };

    useEffect(() => {
        if (session?.user?.email) {
            setEmail(session.user.email);
        }
    }, [session]);

    useEffect(() => {
        const fetchAlerts = async () => {
            if (session?.user?.email) {
                try {
                    const response = await fetch("/api/fetchallalerts", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email: session.user.email }),
                    });

                    if (!response.ok) {
                        throw new Error("Failed to fetch alerts");
                    }

                    const data = await response.json();
                    setAlerts(data);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchAlerts();
    }, [session]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="w-full ">
            <h1 className="mt-2 mb-4 text-3xl ">Frontliner Alerts</h1>
            <ul>
                {alerts.map((alert) => (
                    <li
                        key={alert._id}
                        className="flex flex-col gap-2 px-4 py-4 mb-4 rounded-md shadow-lg alert-item bg-slate-200 "
                    >
                        <h3 className="text-2xl ">{alert.title}</h3>
                        <p className="">{alert.description}</p>
                        <p>
                            Sent Date:{" "}
                            {new Date(alert.sentDate).toLocaleDateString()}
                        </p>
                        <p>Type: {alert.type}</p>
                        <p>Responded: {alert.responded ? "Yes" : "No"}</p>
                        <button
                            className="px-4 py-4 bg-blue-500 border rounded-lg shadow-xl"
                            onClick={() => markAsComplete(alert._id)}
                            disabled={alert.responded}
                        >
                            {alert.responded ? "Completed" : "Mark as Complete"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FrontlinerAlerts;
