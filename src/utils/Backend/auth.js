import {sign , verify} from 'jsonwebtoken'
// Models
// import User from "@/models/user";
// Database
import connectDB from "@/src/configs/db";

const generateToken = (data)=>{
const token = sign(data ,process.env.JWT_KEY , {
    // algorithm
    expiresIn: "7 days"
} )
return token
}


const verifyToken = (token)=>{
    try{
        const validationResult = verify(token ,process.env.JWT_KEY )
        return validationResult
    }catch(err){
        console.log("Verify Token Err =>" , err)
        return false
    }
}
const whoAreYou = async(req)=>{
    connectDB();

    const getVersanToken = req.cookies.get("versanToken");
    if (!getVersanToken) {
      return false
    }
    const token = getVersanToken.value;
    if (!token) {
        return false
    }
    const tokenPayload = verifyToken(token);
    if (!tokenPayload) {
      return false
  
    }
    // const user = await User.findOne({ phone: tokenPayload.phone }).catch((err) => {
    //     console.log(err);
    // });
    // if (!user) {
    //   return false
    // }
    
    //   return NextResponse.json(user);
    return user;
}


export {generateToken , verifyToken , whoAreYou }