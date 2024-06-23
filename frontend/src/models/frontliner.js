import mongoose, { Schema } from "mongoose";

const frontlinerSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    state: {
        required: true,
        type: String,
    },

    email: {
        required: true,
        type: String,
    },
    projects: [
        {
            project: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Project",
            },
            cycles: [
                {
                    tenure: {
                        type: String,
                    },
                    visitAlerts: [
                        {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "Alert",
                        },
                    ],

                    uploaded: [
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

export const Frontliner =
    mongoose.models.Frontliner ??
    mongoose.model("Frontliner", frontlinerSchema);
