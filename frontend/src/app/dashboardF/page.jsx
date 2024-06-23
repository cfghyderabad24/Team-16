"use client";

import FrontlinerAlerts from "@/components/Alerts";
import FrontlinerProjects from "@/components/Project";
import VisualizationPage from "@/components/Vis";
import React, { useState } from "react";

const page = () => {
    const [selected, setSelected] = useState("projects");
    return (
        <div className="flex flex-row w-full pt-20">
            <div className="fixed min-h-screen w-72 bg-zinc-200 h-max">
                <ul className="flex-1">
                    <li className="mb-4">
                        <div
                            onClick={() => setSelected("projects")}
                            className="px-4 pt-4 hover:text-blue-500 "
                        >
                            Projects
                        </div>
                        <div className="w-full h-[0.1px] my-4 bg-zinc-800"></div>
                    </li>
                    <li className="mb-4">
                        <div
                            onClick={() => setSelected("alerts")}
                            className="px-4 hover:text-blue-500 "
                        >
                            Alerts
                        </div>
                        <div className="w-full h-[0.1px] my-4 bg-zinc-800"></div>
                    </li>
                    <li className="mb-4">
                        <div
                            href="/visualization"
                            className="px-4 hover:text-blue-500"
                        >
                            Visualization
                        </div>
                        <div className="w-full h-[0.1px] my-4 bg-zinc-800"></div>
                    </li>
                    <li className="mb-4">
                        <div
                            href="/escalation"
                            className="px-4 hover:text-blue-500"
                        >
                            Escalation
                        </div>
                        <div className="w-full h-[0.1px] my-4 bg-zinc-800"></div>
                    </li>
                </ul>
            </div>
            <div className="absolute w-3/5 mt-2 ml-72 ">
                {selected === "projects" && <FrontlinerProjects />}
            </div>
            <div className="absolute w-3/5 ml-80 ">
                {selected === "alerts" && <FrontlinerAlerts />}
            </div>
            {/* <div className="absolute w-3/5 ml-80 ">
                {selected === "vis" && <VisualizationPage />}
            </div> */}
        </div>
    );
};

export default page;
