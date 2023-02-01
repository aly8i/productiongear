import mongoose from "mongoose";
import User from "./User";
const EquipmentSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        maxlength: 60,
    },
    images: {
        type: [String],
        default: [],
        maxlength: 8000,
    },
    tags: {
      type: [String],
      default: [],
      maxlength: 8000,
    },
    category:{
      type: String,
      default: null,
      maxlength: 50,
    },
    price:{
      type: Number,
      default: null,
      maxlength: 300,
    },
    rentprices:{
      type: [{
        price:{
          type: Number,
          default: null,
          maxlength: 300,
          required:true
        },
        duration:{
          type: Number,
          default: null,
          maxlength: 300,
          required:true
        }
      }],
      default: [],
    },
    forr:{
      type: String,
      default: "sell or rent",
      maxlength: 50,
    },
    attributes:{type:[{
      type:{
        type: String,
        default: null,
        required: true
      },
      values:{
        type: [String],
        default: null,
        required:true
      },
    }]},
    extras:{type:[{
      type:{
        type: String,
        default: null,
        required: true
      },
      value:{
        type: Number,
        default: null,
        required:true
      },
    }]},
    description:{
      type: [
        {
          type: { type: String, required: true },
          value: { type: String, required: true },
        },
      ],
      default: [],
      maxlength: 50,
    },
    warranty:{
      type: String,
      default: null,
      maxlength: 100,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Equipment ||
  mongoose.model("Equipment", EquipmentSchema);
