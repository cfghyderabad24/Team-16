import mongoose, { Schema } from "mongoose";

const cycleSchema = new Schema(
    {
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
        alhist: {
            type: [Date],
            default: [],
        },
    },
    { _id: false }
); // Disable _id for cycle subdocuments

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
    associatedFrontlineWorker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Frontliner",
    },
    budget: {
        type: Number,
        required: true,
    },
    state: {
        required: true,
        type: String,
    },
    region: {
        required: false,
        type: String,
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
    cycles: [cycleSchema], // Use cycleSchema for cycles array
});

// Export the Project model
export const Project =
    mongoose.models.Project ?? mongoose.model("Project", projectSchema);