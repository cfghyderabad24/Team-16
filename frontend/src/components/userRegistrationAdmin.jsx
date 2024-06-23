"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const AdminRegistrationForm = () => {
    const router = useRouter();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const formData = new FormData(event.currentTarget);

            const name = formData.get("name");
            const email = formData.get("email");
            const password = formData.get("password");
            const role = formData.get("role");
            const state = formData.get("state");
            const region = formData.get("region");

            const response = await fetch(`/api/create-users`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    role,
                    state,
                    region,
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
                Create User
            </h2>

            <form className="my-8" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="your name"
                        type="text"
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        name="email"
                        placeholder="projectmayhem@fc.com"
                        type="email"
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        type="password"
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="state">State</Label>
                    <Input
                        id="state"
                        name="state"
                        placeholder="your state"
                        type="text"
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="region">Region</Label>
                    <Input
                        id="region"
                        name="region"
                        placeholder="your region"
                        type="text"
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="role">Role</Label>
                    <Select name="role">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel></SelectLabel>
                                <SelectItem value="Frontliner">
                                    Frontliner
                                </SelectItem>
                                <SelectItem value="State Lead">
                                    State Lead
                                </SelectItem>
                                <SelectItem value="General Manager">
                                    General Manager
                                </SelectItem>
                                <SelectItem value="Regional Director">
                                    Regional Director
                                </SelectItem>
                                <SelectItem value="Head Office">
                                    Head Office
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </LabelInputContainer>

                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    Sign up &rarr;
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
