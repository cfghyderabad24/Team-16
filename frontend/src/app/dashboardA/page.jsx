"use client";
import { AdminRegistrationForm } from "@/components/userRegistrationAdmin";
import React, { useState } from "react";

const page = () => {
    const [choosenpage, setChoosenpage] = useState("Project");

    return (
        <div className="flex w-full h-screen pt-20 ">
            <div className="w-[30%] bg-zinc-100 felx h-full max-h-full flex-col justify-evenly items-start ">
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
            <div className="flex-1 ">
                {choosenpage === "Project" && <div>Add Project</div>}
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
