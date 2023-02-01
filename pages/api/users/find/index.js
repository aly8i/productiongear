import dbConnect from "../../../../util/mongo";
import User from "../../../../models/User";
export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  if (method === "POST") {
    try {
      const user = await User.findOne({'email': req.body.email});
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
