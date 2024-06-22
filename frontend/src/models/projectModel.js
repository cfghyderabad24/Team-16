import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    associatedNGO: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    levels: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    tenure: {
        type: Number,
        required: true,
    },
    noOfCycles: {
        type: Number,
        required: true,
    },
    cycles: [
        {
            alhist:{
                type: [Date],
                default: null,
            },
            cycleMonths: {
                type: String,
                required: true,
            },
            visited: {
                type: Boolean,
                default: false,
            },
            visitedDate: {
                type: Date,
            },
            uploaded: {
                type: Boolean,
                default: false,
            },
            uploadDate: {
                type: Date,
            },
            levelAccepted: {
                type: [Number],
                required: true,
            },
            NGOuploaded: {
                type: Boolean,
                default: false,
            },
            NGOuploadDate: {
                type: Date,
            },
        },
    ],
});

// Export the Project model
export const Project =
    mongoose.models.Project ?? mongoose.model("Project", projectSchema);
