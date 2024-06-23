import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/mongo";
import { Frontliner } from "@/models/frontliner";
import { Alert } from "@/models/alertModel";
import { Project } from "@/models/projectModel";

export const POST = async (request) => {
    await dbConnect();

    try {
        const body = await request.json();
        // console.log(request);
        const { email } = body;

        if (!email) {
            return new NextResponse("Email is required", { status: 400 });
        }
        // console.log(email);
        // const frontliner = await Frontliner.findOne({ email });
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

        // console.log(frontliner.projects[0].cycles);
        if (!frontliner) {
            return new NextResponse("Frontliner not found", { status: 404 });
        }

        return new NextResponse(JSON.stringify(frontliner.projects), {
            status: 200,
        });
    } catch (err) {
        console.log(err);
        return new NextResponse(err.message, { status: 500 });
    }
};
