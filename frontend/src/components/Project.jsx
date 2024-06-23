import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const FrontlinerProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState(null);
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
                window.location.reload();
                // Optionally, you can refresh the alerts list or update the state
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
        const fetchProjects = async () => {
            try {
                const response = await fetch("/api/fetchfrontlinerprojects", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch projects");
                }

                const data = await response.json();
                setProjects(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        if (session?.user?.email) {
            fetchProjects();
        }
    }, [email]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {!loading && (
                <div>
                    {projects.map((projectWrapper, index) => (
                        <div
                            key={index}
                            className="w-full px-8 py-4 mx-8 my-4 rounded-lg bg-zinc-100"
                        >
                            <h2 className="mb-4 text-4xl font-bold">
                                {projectWrapper.project.title}
                            </h2>
                            <p className="mb-2 text-lg text-gray-700 ">
                                Description:{" "}
                                {projectWrapper.project.description}
                            </p>
                            <p className="mb-2 text-lg text-gray-700 ">
                                Associated NGO:{" "}
                                {projectWrapper.project.associatedNGO}
                            </p>
                            <p className="mb-2 text-lg text-gray-700 ">
                                Budget: {projectWrapper.project.budget}
                            </p>
                            <p className="mb-2 text-lg text-gray-700 ">
                                State: {projectWrapper.project.state}
                            </p>
                            <p className="mb-2 text-lg text-gray-700 ">
                                Region: {projectWrapper.project.region}
                            </p>
                            <p className="mb-2 text-lg text-gray-700 ">
                                Levels: {projectWrapper.project.levels}
                            </p>
                            <p className="mb-2 text-lg text-gray-700 ">
                                Start Date:{" "}
                                {new Date(
                                    projectWrapper.project.startDate
                                ).toLocaleDateString()}
                            </p>
                            <p className="mb-2 text-lg text-gray-700 ">
                                Tenure: {projectWrapper.project.tenure} years
                            </p>
                            <p className="mb-2 text-lg text-gray-700 ">
                                Number of Cycles:{" "}
                                {projectWrapper.project.noOfCycles}
                            </p>
                            <h1>Alerts</h1>
                            {projectWrapper.cycles.map((cycle, index) => (
                                <div className="flex flex-col items-center px-4 py-4 mb-4 border rounded-lg">
                                    <div>{cycle.tenure}</div>
                                    <div>
                                        {cycle.visitAlerts.map((alert) => (
                                            <div
                                                key={alert.title}
                                                className="flex flex-row gap-3 my-2"
                                            >
                                                <div className="px-4 py-2 border rounded-lg">
                                                    {alert.title}
                                                </div>
                                                <div className="px-4 py-2 border rounded-lg">
                                                    {alert.description}
                                                </div>
                                                <div className="px-4 py-2 border rounded-lg">
                                                    {alert.sentDate}
                                                </div>
                                                <div
                                                    className={
                                                        alert.responded
                                                            ? "bg-green-400 px-2 py-4 border w-16 rounded-md shadow-lg "
                                                            : "bg-red-500 px-2 py-4 border w-16 rounded-md shadow-lg"
                                                    }
                                                >
                                                    {alert.responded}
                                                </div>
                                                <button
                                                    className="px-4 py-4 bg-blue-500 border rounded-lg shadow-xl"
                                                    onClick={() =>
                                                        markAsComplete(
                                                            alert._id
                                                        )
                                                    }
                                                    disabled={alert.responded}
                                                >
                                                    {alert.responded
                                                        ? "Completed"
                                                        : "Mark as Complete"}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FrontlinerProjects;
