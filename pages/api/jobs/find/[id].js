import dbConnect from "../../../../util/mongo";
import Job from "../../../../models/Job";
import User from "../../../../models/User";

export default async function handler(req, res) {

  const {method, query: { id }} = req;
  await dbConnect();

  if (method === "GET") {

    try {
      await Job.find({'userid': id})
      .populate('userid')
      .exec()
      .then(docs=>{
          res.status(200).json(docs);
      })
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
