import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/mongo";
import { Frontliner } from "@/models/frontliner";
import { Project } from "@/models/projectModel";
import { higherAuth } from "@/models/higherAuth";

export const POST = async (request) => {
    const {
        title,
        description,
        associatedNGO,
        budget,
        state,
        region,
        levels,
        startDate,
        tenure,
        noOfCycles,
        frontlinerEmail,
    } = await request.json();

    await dbConnect();

    try {
        const frontliner = await Frontliner.findOne({ email: frontlinerEmail });

        if (!frontliner) {
            return new NextResponse("Frontliner not found", {
                status: 404,
            });
        }

        // console.log("person found");
        const tenureInMonths = tenure * 12;
        const cycleLength = Math.floor(tenureInMonths / noOfCycles);
        const associatedFrontlineWorker = frontliner._id;
        const cycles = [];
        let currentDate = new Date(startDate);

        for (let i = 0; i < noOfCycles; i++) {
            const cycleStartMonth = currentDate.toLocaleString("default", {
                month: "short",
            });
            const endDate = new Date(currentDate);
            endDate.setMonth(endDate.getMonth() + cycleLength - 1);
            const cycleEndMonth = endDate.toLocaleString("default", {
                month: "short",
            });

            const cycleMonths = `${cycleStartMonth}-${cycleEndMonth}`;

            cycles.push({
                cycleMonths,
                visited: false,
                uploaded: false,
                levelAccepted: new Array(levels).fill(0),
                NGOuploaded: false,
            });

            currentDate.setMonth(currentDate.getMonth() + cycleLength);
        }

        const newProject = new Project({
            title,
            description,
            associatedNGO,
            associatedFrontlineWorker,
            budget,
            state,
            region,
            levels,
            startDate,
            tenure,
            noOfCycles,
            cycles,
        });
        // console.log(cycles);

        console.log(newProject);

        const project = await newProject.save();
        console.log("Project ");
        const frontlinerCycles = cycles.map((cycle) => ({
            tenure: cycle.cycleMonths,
            visitAlerts: [],
            uploaded: [],
        }));

        frontliner.projects.push({
            project: project._id,
            cycles: frontlinerCycles,
        });

        await frontliner.save();

        const stateLead = await higherAuth.findOne({
            state,
            role: "State Lead",
        });
        const generalManager = await higherAuth.findOne({
            state,
            role: "General Manager",
        });
        const regionalDirector =
            levels >= 4
                ? await higherAuth.findOne({
                      region,
                      role: "Regional Director",
                  })
                : null;
        const headOffice =
            levels === 5
                ? await higherAuth.findOne({ role: "Head Office" })
                : null;

        const higherAuths = [stateLead, generalManager];
        if (regionalDirector) higherAuths.push(regionalDirector);
        if (headOffice) higherAuths.push(headOffice);

        for (const auth of higherAuths) {
            const authCycles = cycles.map((cycle) => ({
                tenure: cycle.cycleMonths,
                approveDate: null,
                approveAlerts: [],
                escalationAlerts: [],
            }));

            auth.projects.push({
                project: project._id,
                cycles: authCycles,
            });

            await auth.save();
        }

        return new NextResponse("Project created successfully", {
            status: 201,
        });
    } catch (err) {
        return new NextResponse(err.message, {
            status: 500,
        });
    }
};
