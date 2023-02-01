import mongoose from "mongoose";
const NewSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        maxlength: 60,
    },
    image: {
        type: String,
        default: null,
        maxlength: 8000,
    },
    description: {
      type: String,
      default: null,
    },
    tags: {
      type: [String],
      default: null,
      maxlength: 8000,
    },
    article:{
        type: [{
          sectionTitle: {
            type: String,
            default: null,
          },
          sectionContent: {
            type: String,
            default: null,
          },
        }],
      default: null,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

export default mongoose.models.New ||
  mongoose.model("New", NewSchema);
