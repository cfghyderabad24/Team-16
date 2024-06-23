import { Project } from "@/models/projectModel";
import { Alert } from "@/models/alertModel";
import { Frontliner } from "@/models/frontliner";
import mongoose from "mongoose";

export async function generateAlerts(projectId, empId) {
    try {
        // Find the project by ID

        const project = await Project.findById(projectId).populate(
            "associatedFrontlineWorker"
        );

        if (!project) {
            throw new Error("Project not found");
        }

        // Find the associated frontliner
        const frontliner = await Frontliner.findById(empId);

        if (!frontliner) {
            throw new Error("Frontliner not found");
        }

        const currentDate = new Date();
        const startDate = new Date(project.startDate);
        const diffInMilliseconds = currentDate.getTime() - startDate.getTime();
        const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

        // Check if the difference in days is within 3 months (90 days)
        if (diffInDays > 90) {
            console.log(
                "The project is older than 3 months. No alerts to generate."
            );
            return;
        }

        // First cycle of the project
        const firstCycle = project.cycles[0];

        if (!firstCycle) {
            throw new Error("No cycles found in the project");
        }

        // Generate alerts based on the date conditions
        const alerts = [];

        if (1) {
            const visitAlert = new Alert({
                title: "Visit Reminder",
                description: "Do make a visit to this project",
                projectId: project._id,
                sentDate: currentDate,
                empType: "Frontliner",
                empId: project.associatedFrontlineWorker._id,
                type: "visit",
            });

            await visitAlert.save();
            alerts.push(visitAlert);
            firstCycle.alhist.push(currentDate);

            // Add alert to frontliner data
            const frontlinerProject = frontliner.projects.find(
                (p) => p.project.toString() === project._id.toString()
            );
            if (frontlinerProject) {
                frontlinerProject.cycles[0].visitAlerts.push(visitAlert._id);
            }
        }

        if (diffInDays === 15 && firstCycle.visited && !firstCycle.uploaded) {
            const uploadAlert = new Alert({
                title: "Upload Reminder",
                description: "Do upload docs of this project",
                projectId: project._id,
                sentDate: currentDate,
                empType: "Frontliner",
                empId: project.associatedFrontlineWorker._id,
                type: "upload",
            });

            await uploadAlert.save();
            alerts.push(uploadAlert);

            // Add alert to frontliner data
            const frontlinerProject = frontliner.projects.find(
                (p) => p.project.toString() === project._id.toString()
            );
            if (frontlinerProject) {
                frontlinerProject.cycles[0].uploaded.push(uploadAlert._id);
            }
        }

        await frontliner.save();
        console.log(
            "Alerts generated and added to frontliner data successfully"
        );

        return alerts;
    } catch (error) {
        console.error("Error generating alerts:", error.message);
        throw error;
    }
}
