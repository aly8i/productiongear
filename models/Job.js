import mongoose from "mongoose";
import User from "./User";
const JobSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      maxlength: 60,
    },
    title: {
        type: String,
        maxlength: 60,
    },
    department: {
        type: String,
        default: null,
        maxlength: 50,
    },
    speciality: {
      type: String,
      default: null,
      maxlength: 50,
    },
    category: {
      type: String,
      default: null,
      maxlength: 50,
    },
    description: {
      type: String,
      default: null,
      maxlength: 3000,
    },
    employmenttype:{
      type: String,
      default: null,
      maxlength: 300,
    },
    salary:{
      type: Number,
      default: null,
      maxlength: 300,
    },
    salaryduration:{
      type: {
        unit: {
          type: String,
          default: null,
          maxlength: 20,
        },
        value: {
          type: Number,
          default: null,
          maxlength: 100,
        },
      },
      default: null,
    },
    workdays:{
      type: [String],
      default: null,
      maxlength: 300,
    },
    workhours:{
      type: [String],
      default: null,
      maxlength: 300,
    },
    image:{
      type: String,
      default: null,
      maxlength: 300,
    }
  },
  { timestamps: true }
);
export default mongoose.models.Job ||
  mongoose.model("Job", JobSchema);

