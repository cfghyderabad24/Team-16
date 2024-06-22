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
    email: {
        required: true,
        type: String,
    },
    projects: [
        {
            project: {
                type: mongoose.Schema.Types.ObjectId, ref: "projectModel"
            },
            cycles: [
                {
                    tenure: {
                        type: String,

                    },
                    visitAlerts: [{
                        type: mongoose.Schema.Types.ObjectId, ref: "alertModel"
                    }],
                    visitDate: {
                        type: Date
                    },
                    uploaded:
                    {
                        type: Boolean
                    },



                }
            ]
        }
    ]
});

export const Frontliner = mongoose.models.Frontliner ?? mongoose.model("Frontliner", frontlinerSchema);
