import mongoose, { Schema } from "mongoose";

// Define the schema for the alert
const alertSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    sentDate: {
        type: Date,
        required: true,
    },
    respondedDate: {
        type: Date,
    },
    empType: {
        type: String,
        required: true,
        enum: ["Frontliner", "higherAuth"], // Assuming 'User' and 'Admin' are the two possible schemas
    },
    empId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: "empType",
    },
    type: {
        type: String,
        enum: ["visitReminder", "visit", "uploadReminder", "upload", "approve"],
        required: true,
    },
    currentAlertsCount: {
        type: Number,
        default: 0,
    },
    responded: {
        type: Boolean,
        default: false,
    },
});

export const Alert =
    mongoose.models.Alert ?? mongoose.model("Alert", alertSchema);
