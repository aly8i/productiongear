import dbConnect from "../../../util/mongo";
import User from "../../../models/User";
import { verify } from "jsonwebtoken";

export default async function handler(req, res) {

  const {
    method,
    query: { id }
  } = req;

  const token = req.headers.authorization;
  await dbConnect();

  if (method === "GET") {
    try {
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    verify(token,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
      if(!err && decoded) {
        res
        if(decoded.sub == id || decoded.role=='admin'){
          try {
            const user = await User.findByIdAndUpdate(id, req.body,{new:true});
            res.status(200).json(user);
          } catch (err) {
            res.status(500).json(err);
          }
        }
        return res.status(500).json({message: 'Sorry you are not authorized'})
      }
      res.status(600).json({message: `Sorry you are not authenticated ${token}`})
    })
  }

  if (method === "DELETE") {
      verify(token,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
        if(!err && decoded) {
          if(decoded.sub == id || decoded.role=='admin'){
            try {
              await User.findByIdAndDelete(id);
              res.status(200).json("The user has been deleted!");
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
