import mongoose from "mongoose";
import Equipment from "../models/Equipment"
const OrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    equipments: {
      type: [{
        equipment:{type: mongoose.Schema.Types.ObjectId,ref: 'Equipment', required: true},
        amount:{type: Number, required: true},
        attributes:{type:[String]},
        price:{type: Number},
        extras:{ type: [String] }
      }],
    },
    status: {
      type: Number,
      default: 0,
    },
    location:{
      type: {
        lat:{type: Number},
        lng:{type: Number}
      }
    },
    customerID:{
      type: String
    },
    deliveryID:{
      type: String
    },
    phoneNumber:{
      type:String
    },
    address:{
      type:String
    },
  },
  { timestamps: true }
);
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
