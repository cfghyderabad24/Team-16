import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/mongo";
import { Alert } from "@/models/alertModel";
import { Project } from "@/models/projectModel";

export const POST = async (request) => {
    const { alertId } = await request.json();

    if (!alertId) {
        return new NextResponse("Alert ID is required", {
            status: 400,
        });
    }

    await dbConnect();

    try {
        // Find the alert and update the responded field
        const alert = await Alert.findById(alertId);
        if (!alert) {
            return new NextResponse("Alert not found", {
                status: 404,
            });
        }

        alert.responded = true;
        await alert.save().then(console.log("Saved"));

        // Find the corresponding project and update the cycle
        const project = await Project.findById(alert.projectId);
        if (!project) {
            return new NextResponse("Project not found", {
                status: 404,
            });
        }

        const sentMonth = alert.sentDate.getMonth();
        const sentYear = alert.sentDate.getFullYear();

        // Find the cycle that matches the sent date range
        const cycle = project.cycles.find((c) => {
            const [startMonth, endMonth] = c.cycleMonths.split("-");
            const start = new Date(sentYear, getMonthIndex(startMonth), 1);
            const end = new Date(sentYear, getMonthIndex(endMonth), 0);

            return alert.sentDate >= start && alert.sentDate <= end;
        });

        if (cycle) {
            if (alert.type === "visited") {
                // console.log("yes");
                cycle.visited = true;
                cycle.visitedDate = new Date();
            } else {
                cycle.uploaded = true;
                cycle.uploadedDate = new Date();
            }
            await project.save();
        }

        return new NextResponse("Alert marked as complete", {
            status: 200,
        });
    } catch (error) {
        console.error("Error marking alert as complete:", error);
        return new NextResponse(
            "An error occurred while marking the alert as complete",
            {
                status: 500,
            }
        );
    }
};

const getMonthIndex = (month) => {
    const monthNames = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
    ];
    return monthNames.indexOf(month.toLowerCase());
};
