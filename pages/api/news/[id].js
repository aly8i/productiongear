import dbConnect from "../../../util/mongo";
import New from "../../../models/New";
import { verify } from "jsonwebtoken";

export default async function handler(req, res) {

  const {method, query: { id }} = req;
  const token = req.headers.authorization;
  await dbConnect();

  if (method === "GET") {
    try {
      const neww = await New.findById(id);
      res.status(200).json(neww);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
      verify(token,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
        if(!err && decoded) {
          if( decoded.role=='admin'){
            try {
              const neww = await New.findByIdAndUpdate(id, req.body,{new:true});
              res.status(200).json(neww);
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
      verify(token,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
        if(!err && decoded) {
          if( decoded.role=='admin'){
            try {
              await New.findByIdAndDelete(id);
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
