import dbConnect from "../../../util/mongo";
import Equipment from "../../../models/Equipment";
import { verify } from "jsonwebtoken";

export default async function handler(req, res) {

  const {method, query: { id }} = req;
  const token = req.headers.authorization;
  await dbConnect();

  if (method === "GET") {
      try {
        Equipment.findById(id)
        .exec()
        .then(docs=>{
            res.status(200).json(docs);
        })
      } catch (err) {
        res.status(500).json(err);
      }
  }

  if (method === "PUT") {
      const eq = await Equipment.findById(id);
      verify(token,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
        if(!err && decoded) {
          if(decoded.sub == eq.userid || decoded.role=='admin'){
            try {
              const equipment = await Equipment.findByIdAndUpdate(id, req.body,{new:true});
              res.status(200).json(equipment);
            } catch (err) {
              res.status(500).json(err);
            }
          }
          return res.status(500).json({message: 'Sorry you are not authorized'})
        }
        res.status(600).json({message: "Sorry you are not authenticated"})
      })
  }

  if (method === "DELETE") {
    const eq = await Equipment.findById(id);
      verify(token,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
        if(!err && decoded) {
          if(decoded.sub == eq.userid || decoded.role=='admin'){
            try {
              await Equipment.findByIdAndDelete(id);
              res.status(200).json("The equipment has been deleted!");
            } catch (err) {
              res.status(500).json(err);
            }
          }
          return res.status(500).json({message: 'Sorry you are not authorized'})
        }
        res.status(600).json({message: "Sorry you are not authenticated"})
      })
  }
};
