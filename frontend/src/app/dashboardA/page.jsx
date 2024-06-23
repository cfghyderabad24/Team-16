"use client";
import { CreateProjectForm } from "@/components/createProject";
import { AdminRegistrationForm } from "@/components/userRegistrationAdmin";
import React, { useState } from "react";

const page = () => {
    const [choosenpage, setChoosenpage] = useState("Project");

    return (
        <div className="flex w-full h-screen pt-20 ">
            <div className="fixed flex-col items-start h-full max-h-full w-72 bg-zinc-100 felx justify-evenly ">
                <div
                    className="px-8 pt-8 pb-4 text-lg text-blue-700 cursor-pointer hover:text-blue-300"
                    onClick={() => setChoosenpage("Project")}
                >
                    Add Project
                </div>
                <div className="w-full h-[0.1px] my-4 bg-zinc-800"></div>

                <div
                    className="px-8 py-4 text-lg text-blue-700 cursor-pointer hover:text-blue-300"
                    onClick={() => setChoosenpage("create user")}
                >
                    Create Users
                </div>
                <div className="w-full h-[0.1px] my-4 bg-zinc-800"></div>
            </div>
            <div className="w-3/4 mt-4 ml-72">
                {choosenpage === "Project" && (
                    <div>
                        <CreateProjectForm />
                    </div>
                )}
                {choosenpage === "create user" && (
                    <div>
                        <AdminRegistrationForm />
                    </div>
                )}
            </div>
        </div>
    );
};

export default page;
