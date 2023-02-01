import dbConnect from "../../../../util/mongo";
import Order from "../../../../models/Order";
import Equipment from "../../../../models/Equipment";
import Authorized from "../../../../middlewares/Authorized";
export default Authorized(async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === "GET") {
    try {
      Order.find()
        .populate('equipments.equipment')
        .exec()
        .then(docs=>{
            res.status(200).json(docs);
        })
    } catch (err) {
      res.status(500).json(err);
    }
  }
})