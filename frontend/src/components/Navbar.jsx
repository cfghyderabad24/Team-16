"use client";

import React, { useState, useEffect } from "react";
import { ModeToggle } from "./themeToggle";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { doLogout } from "@/lib/actions";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignJustify, LogOut } from "lucide-react";

const Navbar = () => {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (status) {
            setLoading(false);
        }
    }, [status]);
    return (
        <>
            {!loading && (
                <div className=" z-50 fixed flex justify-between items-center w-screen h-20 px-4 border-b-[0.1px] border-opacity-25 border-slate-600 bg-white backdrop-blur-sm dark:bg-zinc-900 dark:bg-opacity-50 bg-opacity-75">
                    <div className="flex flex-row items-center gap-4 font-medium dark:text-slate-300 text-slate-900 justify-normal">
                        <div className="mr-4 text-3xl font-normal dark:font-thin">
                            LOGO
                        </div>
                        <div className="items-center hidden gap-4 md:flex ">
                            <Link
                                className="duration-300 hover:text-blue-500"
                                href={"/"}
                            >
                                Home
                            </Link>
                            <Link
                                className="duration-300 hover:text-blue-500"
                                href={"/"}
                            >
                                Link1
                            </Link>
                            <Link
                                className="duration-300 hover:text-blue-500"
                                href={"/"}
                            >
                                Link2
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-4 ">
                        <ModeToggle />
                        {session ? (
                            // <div
                            //     onClick={doLogout}
                            //     className="px-4 py-2 font-light text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-400"
                            // >
                            //     Log Out
                            // </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="px-4 py-2 font-light text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-400">
                                    Profile
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="dark:bg-zinc-800 bg-zinc-50">
                                    <DropdownMenuLabel>
                                        My Account
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link href={"/dashboard"}>
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={doLogout}>
                                        <LogOut className="w-4 h-4 mr-2" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link
                                href={"/login"}
                                className="px-4 py-2 font-light text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-400"
                            >
                                Login
                            </Link>
                        )}
                        <DropdownMenu>
                            <DropdownMenuTrigger className="md:hidden">
                                <AlignJustify />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="dark:bg-zinc-800 bg-zinc-50">
                                {/* <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator /> */}
                                <DropdownMenuItem>
                                    <Link href={"/"}>Home</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={"/"}>Link1</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={"/"}>Link2</Link>
                                </DropdownMenuItem>
                                {/* <DropdownMenuItem onClick={doLogout}>
                                    <LogOut className="w-4 h-4 mr-2" />
                                    <span>Log out</span>
                                </DropdownMenuItem> */}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
