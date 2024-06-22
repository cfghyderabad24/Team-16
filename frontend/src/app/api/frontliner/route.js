import { NextResponse } from "next/server";
import { Frontliner } from "../../../models/frontliner";

//from this api
export const GET = async (request) => {
    const id = req.body.id;
    const data = await Frontliner.findOne({ _id: id }).populate("projects");
    console.log(data);
    await dbConnect();
    return new NextResponse("Fetching the details of projects", {
        status: 200,
    });
};





