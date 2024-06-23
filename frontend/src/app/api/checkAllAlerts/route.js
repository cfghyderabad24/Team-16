import { NextResponse } from "next/server";
import { Project } from "@/models/projectModel";
import { Alert } from "@/models/alertModel";
import { dbConnect } from "@/utils/mongo";

const alertDays = [30, 60, 83]; // Days to trigger alerts

export const POST = async (request) => {
    await dbConnect();

    try {
        const projects = await Project.find();

        projects.forEach(async (p) => {
            const currentDate = new Date();
            const startDate = new Date(p.startDate);
            const diffInMilliseconds = currentDate - startDate;
            const diffInDays = Math.floor(
                diffInMilliseconds / (1000 * 60 * 60 * 24)
            );

            if (alertDays.includes(diffInDays)) {
                const newAlert = new Alert({
                    title: "Visit Reminder",
                    description: `It's been ${diffInDays} days since the project started. Please make a visit.`,
                    projectId: p._id,
                    sentDate: currentDate,
                    empType: "Frontliner",
                    empId: p.associatedFrontlineWorker, // Replace with the actual employee ID
                    type: "visit", // Replace with the actual alert type
                    responded: false,
                });

                await newAlert.save();
                console.log(
                    `Alert for day ${diffInDays} made for project ${p._id}`
                );
            } else {
                console.log(
                    `No alert needed for day ${diffInDays} for project ${p._id}`
                );
            }
        });

        return new NextResponse("Alerts processed successfully", {
            status: 200,
        });
    } catch (error) {
        console.error(error);
        return new NextResponse(error.message, {
            status: 500,
        });
    }
};
