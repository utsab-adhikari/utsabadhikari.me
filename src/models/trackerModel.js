import mongoose from "mongoose";


const TaskSchema = new mongoose.Schema(
{
name: { type: String, required: true },
completed: { type: Boolean, default: false },
notes: { type: String, default: "" },
},
{ _id: false }
);


const TrackerSchema = new mongoose.Schema({
title: { type: String, required: true },
date: { type: Date, required: true },
description: { type: String },
status: {
type: String,
enum: ["pending", "started", "completed"],
default: "pending",
},
tasks: [TaskSchema],
editorContent: { type: String }, // stored as HTML from TipTap
reportSubmitted: { type: Boolean, default: false },
reportHtml: { type: String },
createdAt: { type: Date, default: Date.now },
});


export default mongoose.models.Tracker || mongoose.model("Tracker", TrackerSchema);