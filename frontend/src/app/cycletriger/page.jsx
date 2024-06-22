import { Project } from "@/models/projectModel";
import { Alert } from "@/models/alertModel";
export default async function alertBE(req, res) {
    try {
        const projects = await Project.find();
        projects.map((p) => {
            p.cycles.forEach((cycle, index) => {
                const value = p.tenure*12/p.noOfCycles;
                const currentDate = new Date(); 
                if (cycle.alhist.length < 1) {
                    const diffInMilliseconds = currentDate.getTime() - p.satrtDate.getTime();
                    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
                    if(diffInDays%30 == 0 && diffInDays/30 <3){
                        cycle.alhist.push(currentDate);
                        // add alert
                        const newAlert = new Alert({
                            title: "Visit Reminder",
                            description: "Do make a visit to this project",
                            projectId: p._id, 
                            sentDate: currentDate,
                            empType: "Frontliner", 
                            empId: "Your employee ID", // Replace with the actual employee ID
                            type: "Your alert type", // Replace with the actual alert type
                          });
                          newAlert.save();
                        console.log("alert made");
                    }else
                    console.log("not a good time to send alert");
                }else{
                    const lastElement = cycle.alhist[cycle.alhist.length - 1];
                    const diffInMilliseconds = currentDate.getTime() - lastElement.getTime();
                    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
                    if(diffInDays%30 == 0 && diffInDays/30 <3){
                        cycle.alhist.push(currentDate);
                        // add alert
                        console.log("alert made");
                    }else
                    console.log("not a good time to send alert");
                }
            });
        });
    } catch (error) {

    }
}