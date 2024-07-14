const JWT=require("jsonwebtoken");
const secret="$uperMan@123";

function createTokenForUser(user)
{
    const payload={
        _id:user._id,
        email:user.email,
        profileImageUrl:user.profileImageUrl,
        role:user.role,
    };
    const token=JWT.sign(payload,secret);
    return token;
}


function validToken(token)
{
    try {
        const payload = JWT.verify(token, secret);
        return payload;
        
      } catch (error) {
        console.error("Token verification failed:", error);
        throw new Error("Invalid token");
      }
}

module.exports={
    createTokenForUser,validToken
}