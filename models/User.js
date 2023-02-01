import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 60,
    },
    fullname: {
        type: String,
        maxlength: 60,
    },
    image: {
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/hfc-resto.appspot.com/o/pizzas%2Fguest-user.jpg?alt=media&token=db829d3e-873c-4f50-b876-179998e49ba5',
        maxlength: 2000,
    },
    phonenumber: {
      type: String,
      maxlength: 2000,
      required: true,
    },
    email:{
      type: String,
      index: true,
      sparse: true,
      unique: true
    },
    address: {
      type: {
        country:{ type: String},
        city:{ type: String},
      },
      default: null,
      maxlength: 3000,
    },
    location: {
        type: {
            lat:{ type: String},
            long:{ type: String},
        },
        default: null,
        maxlength: 3000,
    },
    url:{
      type: String,
      default: null,
      maxlength: 3000,
    },
    view:{
      type: String,
      default: "talent",
      maxlength: 3000,
    },
    role:{
      type:String,
      default: "user",
    },
    about:{
      type: String,
      default: null,
      maxlength: 5000,
    },
    department:{
      type: String,
      default: null,
      maxlength: 100,
    },
    speciality:{
      type: String,
      default: null,
      maxlength: 100,
    },
    category:{
      type: String,
      default: null,
      maxlength: 100,
    },
    yearsofexperience:{
      type: Number,
      default: null,
      maxlength: 300,
    },
    interests:{
      type: [String],
      default: null,
      maxlength: 5000,
    },
    links:{
      type: [{ 
        link:{
          type: String,
          default: null,
          maxlength: 300,
          required: true,
        },
        provider:{
          type: String,
          default: null,
          maxlength: 300,
          required: true,
        },
      }],
      default: null,
      maxlength: 3000,
    },
    education:{
      type: {
        educationlevel:{
          type: String,
          default: null,
          maxlength: 50,
          required:true,
        },
        fieldofstudy:{
          type: String,
          default: null,
          maxlength: 50,
          required:true,
        },
        graduationyear:{
          type: Number,
          default: null,
          maxlength: 10,
          required: true,
        },
      },
      default: null,
      maxlength: 500,
    },    
    languages:{
      type: [String],
      default: null,
      maxlength: 500,
    },
    showreel:{
      type: [String],
      default: null,
      maxlength: 300,
    },
  },
  { timestamps: true }
);
export default mongoose.models.User ||
  mongoose.model("User", UserSchema);
