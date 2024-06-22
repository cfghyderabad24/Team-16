import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/utils/mongo";
import { Frontliner } from "@/models/frontliner";
import { higherAuth } from "@/models/higherAuth";

export const POST = async (request) => {
    const { name, email, password, role, state, region } = await request.json();

    console.log(name, email, password, role, state, region);

    await dbConnect();

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = {
        name,
        password: hashedPassword,
        email,
        role,
    };

    if (state) {
        newUser.state = state;
    }

    if (region) {
        newUser.region = region;
    }

    try {
        if (role === "Frontliner") {
            await Frontliner.create(newUser).then(() =>
                console.log("Frontliner user created")
            );
        } else {
            // console.log(newUser);
            await higherAuth
                .create(newUser)
                .then(() => console.log("HigherAuth user created"));
        }
    } catch (err) {
        return new NextResponse(err.message, {
            status: 500,
        });
    }

    return new NextResponse("New user has been created", {
        status: 201,
    });
};
