import dbConnect from "../../../util/mongo";
import Job from "../../../models/Job";
import User from "../../../models/User";
const handler = async(req, res) => {
  const { method } = req;
  await dbConnect();
  
  if (method === "GET") {
    try {
      Job.find()
      .populate('userid')
      .exec()
      .then(docs=>{
          res.status(200).json(docs);
      })
    } catch (err) {
      res.status(500).json(err);
    }
  } 

  if (method === "POST") {
    try {
      const job = await Job.create(req.body);
      res.status(201).json(job);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
export default handler;
