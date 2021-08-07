const config = require("./../../config/config");
const client = require("twilio")(config.accountSID, config.authToken);
const dbClient = require("./../../db/utils");
const tokenVerify= require("./../../middlewares/verifyToken")

module.exports= async  (req, res) => {
    try{
        jwt.verify(req.token,'secretkey',(err,authData)=>{
            if(err)
            {res.sendStatus(403)}
            else{
               
            }
        })
            
        }

    }
    catch(err){

    }
}