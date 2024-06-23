import { NextResponse } from "next/server";
import { Frontliner } from "../../models/frontliner";
import { dbConnect } from "../../utils/dbConnect"; // Ensure you have dbConnect function to establish connection

export const GET = async (req) => {
    const { id } = req.body.id; // Assuming id is passed as query parameter

    try {
        await dbConnect(); // Ensure database connection

        // Find the frontliner by id and populate the visitAlerts
        const frontliner = await Frontliner.findOne({ _id: id }).populate({
            path: "projects.cycles.uploaded",
            model: "Alert",
        });

        if (!frontliner) {
            return new NextResponse("Frontliner not found", { status: 404 });
        }

        // Extract visitAlerts from projects and cycles
        const uploadedAlerts = frontliner.projects.flatMap((project) =>
            project.cycles.flatMap((cycle) => cycle.uploaded)
        );

        console.log("Visit Alerts:", uploadedAlerts);

        return new NextResponse(JSON.stringify(uploadedAlerts), { status: 200 });
    } catch (error) {
        console.error("Error fetching uploadedAlerts:", error);
        return new NextResponse("Error fetching visitAlerts", { status: 500 });
    }
};
