import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  projectCode: {
    type: String,
    required: true,
  },
  todo: {
    type: [String],
    
  },
  inProgress: {
    type: [String],
  },
  done: {
    type: [String],
  },
  teamLeader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TeamLead",
    required: true,
  },
  teamMembers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "TeamMember",
  },
});

export default mongoose.model("Project", projectSchema);
