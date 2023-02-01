import dbConnect from "../../../util/mongo";
import Static from "../../../models/Static";
import { verify } from "jsonwebtoken";
const handler = async(req, res) => {
  const { method } = req;
  const token = req.headers.authorization;
  await dbConnect();

  if (method === "GET") {
    try {
      const statics = await Static.find();
      res.status(200).json(statics[0]);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "PUT") {
    verify(token,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
      if(!err && decoded) {
        if(decoded.role=='admin'){
          try {
            const statics = await Static.findByIdAndUpdate("6394a8d767cc315d3e971faf", req.body,{new:true});
            res.status(200).json(statics);
          } catch (err) {
            res.status(500).json(err);
          }
        }
      }  
    })
  };
}
export default handler;

