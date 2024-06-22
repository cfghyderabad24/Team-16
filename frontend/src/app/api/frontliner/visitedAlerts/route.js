import { NextResponse } from "next/server";
import { Frontliner } from "../../models/frontliner";
import { dbConnect } from "../../utils/dbConnect"; // Ensure you have dbConnect function to establish connection

export const GET = async (req) => {
    const { id } = req.body.id; // Assuming id is passed as query parameter

    try {
        await dbConnect(); // Ensure database connection

        // Find the frontliner by id and populate the visitAlerts
        const frontliner = await Frontliner.findOne({ _id: id }).populate({
            path: "projects.cycles.visitAlerts",
            model: "Alert",
        });

        if (!frontliner) {
            return new NextResponse("Frontliner not found", { status: 404 });
        }

        // Extract visitAlerts from projects and cycles
        const visitAlerts = frontliner.projects.flatMap((project) =>
            project.cycles.flatMap((cycle) => cycle.visitAlerts)
        );

        console.log("Visit Alerts:", visitAlerts);

        return new NextResponse(JSON.stringify(visitAlerts), { status: 200 });
    } catch (error) {
        console.error("Error fetching visitAlerts:", error);
        return new NextResponse("Error fetching visitAlerts", { status: 500 });
    }
};
