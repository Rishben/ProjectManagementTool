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
    unique: true,
  },
  teamLeader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TeamLeader",
    required: true,
  },
  teamMembers: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TeamMember"
      },
      name: {
        type: String
      },
      email: {
        type: String
      },
      isOnline: {
        type: Boolean,
        default: false
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;