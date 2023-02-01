import dbConnect from "../../../util/mongo";
import New from "../../../models/New";
import { verify } from "jsonwebtoken";
const handler = async(req, res) => {
  const { method } = req;
  const token = req.headers.authorization;
  await dbConnect();

  if (method === "GET") {
    try {
      const news = await New.find();
      res.status(200).json(news);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    verify(token,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
      if(!err && decoded) {
        if(decoded.role=='admin'){
          try {
            const neww = await New.create(req.body);
            res.status(201).json(neww);
          } catch (err) {
            res.status(500).json(err);
          }
        }
      }
    })
  }

};
export default handler;
