import mongoose, { Schema } from "mongoose";

const higherAuthSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    state: {
        required: true,
        type: String,
    },
    region: {
        required: false,
        type: String,
    },
    role: {
        required: true,
        type: String,
    },

    projects: [
        {
            project: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "projectModel",
            },
            cycles: [
                {
                    tenure: {
                        type: String,
                    },

                    approveDate: {
                        type: Date,
                    },
                    approveAlerts: [
                        {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "Alert",
                        },
                    ],
                    escalationAlerts: [
                        {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "Alert",
                        },
                    ],
                },
            ],
        },
    ],
});

export const higherAuth =
    mongoose.models.higherAuth ??
    mongoose.model("higherAuth", higherAuthSchema);
