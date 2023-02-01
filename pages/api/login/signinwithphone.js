import dbConnect from "../../../util/mongo";
import User from "../../../models/User";
import generateAccessToken from "../../../functions/generateAccessToken";
import { setCookie } from 'cookies-next';
const handler = async(req, res) => {
  await dbConnect();
  if (req.method === "POST") {
    var user={};
    var access = "";
    const phonenumber = req.body.phonenumber;
    try {
      user = await User.findOne({'phonenumber': phonenumber});
      access = generateAccessToken(user);
      setCookie('accessToken',access,{req,res,maxAge: process.env.NEXT_PUBLIC_COOKIE_AGE});
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
export default handler;