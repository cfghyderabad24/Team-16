import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/mongo";
import { Frontliner } from "@/models/frontliner";

export const POST = async (request) => {
    const { email } = await request.json();

    if (!email) {
        return new NextResponse("Email is required", { status: 400 });
    }

    await dbConnect();

    try {
        const frontliner = await Frontliner.findOne({ email })
            .populate({
                path: "projects.project",
                model: "Project",
            })
            .populate({
                path: "projects.cycles.visitAlerts",
                model: "Alert",
            })
            .populate({
                path: "projects.cycles.uploaded",
                model: "Alert",
            });

        if (!frontliner) {
            return new NextResponse("Frontliner not found", { status: 404 });
        }

        const alerts = frontliner.projects.flatMap((proj) =>
            proj.cycles.flatMap((cycle) => [
                ...cycle.visitAlerts,
                ...cycle.uploaded,
            ])
        );

        return new NextResponse(JSON.stringify(alerts), { status: 200 });
    } catch (error) {
        console.error("Error fetching alerts:", error);
        return new NextResponse("An error occurred while fetching alerts", {
            status: 500,
        });
    }
};
