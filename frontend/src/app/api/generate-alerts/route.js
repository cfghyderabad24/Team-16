import { NextResponse } from "next/server";
import { generateAlerts } from "@/utils/generateAlerts";
import { dbConnect } from "@/utils/mongo";

export const POST = async (request) => {
    const { projectId, empId } = await request.json();

    if (!projectId || !empId) {
        return new NextResponse(
            JSON.stringify({
                message: "Project ID and Employee ID are required",
            }),
            {
                status: 400,
            }
        );
    }

    try {
        await dbConnect();
        const alerts = await generateAlerts(projectId, empId);
        return new NextResponse(
            JSON.stringify({
                message: "Alerts generated successfully",
                alerts,
            }),
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("Error generating alerts:", error);
        return new NextResponse(
            JSON.stringify({
                message: "An error occurred while generating alerts",
            }),
            {
                status: 500,
            }
        );
    }
};
