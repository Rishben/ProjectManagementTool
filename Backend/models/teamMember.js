import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  teamLeader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TeamLead",
  },
  teamCode: {
    type: [String],
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
});

const TeamMember = mongoose.models.TeamMember || mongoose.model("TeamMember", teamMemberSchema);
export default TeamMember;
