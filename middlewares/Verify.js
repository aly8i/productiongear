import { verify } from "jsonwebtoken";
import { getCookie } from 'cookies-next';
const Verify = (fn) => async (req,res) => {
  const token = getCookie('accessToken', { req, res });
  if(!token) return res.status(401).json("You are not authenticated");
   verify(token,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
    if(!err && decoded) {
        req.decoded = decoded;
      return await fn(req, res)
    }
  })
  return res.status(401).json('Token is not valid');
};
export default Verify;