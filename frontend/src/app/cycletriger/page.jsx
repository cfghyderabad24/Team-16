import { Project } from "@/models/projectModel";
import { Alert } from "@/models/alertModel";

export default async function alertBE(req, res) {
  try {
    const projects = await Project.find();

    projects.forEach(async (p) => {
      for (let i = 0; i < p.cycles.length; i++) {
        const cycle = p.cycles[i];
        const currentDate = new Date();

        if (cycle.alhist.length < 1) {
          const diffInMilliseconds = currentDate.getTime() - p.startDate.getTime();
          const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

          if (diffInDays % 30 === 0 && diffInDays / 30 < 3) {
            cycle.alhist.push(currentDate);

            const newAlert = new Alert({
                title: "Visit Reminder",
                description: "Do make a visit to this project",
                projectId: p._id,
                sentDate: currentDate,
                empType: "Frontliner",
                empId: p.associatedFrontlineWorker, // Replace with the actual employee ID
                type: "visit", // Replace with the actual alert type
              });

            await newAlert.save();
            console.log("Alert made");
          } else {
            console.log("Not a good time to send alert");
          }
        } else {
          const lastElement = cycle.alhist[cycle.alhist.length - 1];
          const diffInMilliseconds = currentDate.getTime() - lastElement.getTime();
          const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

          if (diffInDays % 30 === 0 && diffInDays / 30 < 3) {
            cycle.alhist.push(currentDate);

            const newAlert = new Alert({
              title: "Visit Reminder",
              description: "Do make a visit to this project",
              projectId: p._id,
              sentDate: currentDate,
              empType: "Frontliner",
              empId: p.associatedFrontlineWorker, // Replace with the actual employee ID
              type: "visit", // Replace with the actual alert type
            });

            await newAlert.save();
            console.log("Alert made");
          } else {
            console.log("Not a good time to send alert");
          }

          if (diffInDays === 15 && cycle.visited && !cycle.uploaded) {
            const newAlert = new Alert({
                title: "Upload Reminder",
                description: "Do do upload docs of this project",
                projectId: p._id,
                sentDate: currentDate,
                empType: "Frontliner",
                empId: p.associatedFrontlineWorker, // Replace with the actual employee ID
                type: "upload", // Replace with the actual alert type
              });

            await newAlert.save();
            console.log("Upload alert made");
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}