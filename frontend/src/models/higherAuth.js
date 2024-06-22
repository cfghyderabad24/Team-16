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

                    visitDate: {
                        type: Date
                    },
                    uploaded:
                    {
                        type: Boolean
                    },


                }
            ],
        }
    ]
});

export const higherAuth = mongoose.models.higherAuth ?? mongoose.model("higherAuth", higherAuthSchema);
