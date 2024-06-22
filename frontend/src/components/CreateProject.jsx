"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";

export const CreateProjectForm = () => {
    const router = useRouter();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const formData = new FormData(event.currentTarget);

            const title = formData.get("title");
            const description = formData.get("description");
            const associatedNGO = formData.get("associatedNGO");
            const budget = formData.get("budget");
            const levels = formData.get("levels");
            const startDate = formData.get("startDate");
            const tenure = formData.get("tenure");
            const noOfCycles = formData.get("noOfCycles");
            const frontlinerEmail = formData.get("frontlinerEmail");

            const response = await fetch(`/api/create-project`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                    associatedNGO,
                    budget,
                    levels,
                    startDate,
                    tenure,
                    noOfCycles,
                    frontlinerEmail,
                }),
            });

            response.status === 201 && router.push("/");
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <div className="w-full max-w-md p-4 mx-auto bg-white rounded-none md:rounded-2xl md:p-8 shadow-input dark:bg-black">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                Create Project
            </h2>

            <form className="my-8" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                        id="title"
                        name="title"
                        placeholder="Project Title"
                        type="text"
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="description">Description</Label>
                    <Input
                        id="description"
                        name="description"
                        placeholder="Project Description"
                        type="text"
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="associatedNGO">Associated NGO</Label>
                    <Input
                        id="associatedNGO"
                        name="associatedNGO"
                        placeholder="Associated NGO"
                        type="text"
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="budget">Budget</Label>
                    <Input
                        id="budget"
                        name="budget"
                        placeholder="Budget"
                        type="number"
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="levels">Levels</Label>
                    <Input
                        id="levels"
                        name="levels"
                        placeholder="Number of Levels"
                        type="number"
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                        id="startDate"
                        name="startDate"
                        placeholder="Start Date"
                        type="date"
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="tenure">Tenure (Years)</Label>
                    <Input
                        id="tenure"
                        name="tenure"
                        placeholder="Tenure"
                        type="number"
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="noOfCycles">Number of Cycles</Label>
                    <Input
                        id="noOfCycles"
                        name="noOfCycles"
                        placeholder="Number of Cycles"
                        type="number"
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="frontlinerEmail">Frontliner Email</Label>
                    <Input
                        id="frontlinerEmail"
                        name="frontlinerEmail"
                        placeholder="Frontliner Email"
                        type="email"
                    />
                </LabelInputContainer>

                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    Create Project &rarr;
                    <BottomGradient />
                </button>

                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            </form>
        </div>
    );
};

const BottomGradient = () => {
    return (
        <>
            <span className="absolute inset-x-0 block w-full h-px transition duration-500 opacity-0 group-hover/btn:opacity-100 -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="absolute block w-1/2 h-px mx-auto transition duration-500 opacity-0 group-hover/btn:opacity-100 blur-sm -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({ children, className }) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
