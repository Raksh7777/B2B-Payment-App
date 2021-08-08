const { CpsInstance } = require("twilio/lib/rest/preview/trusted_comms/cps");
const config = require("./../../config/config");
const client = require("twilio")(config.accountSID, config.authToken);
const dbClient = require("./../../db/utils");
const tokenVerify = require("./../../middlewares/verifyToken");

module.exports = async (req, res) => {
  try {
    const userId = req.authInfo.id;
    console.log("User id", userId);
    const getUserQuery = {
      text: "SELECT is_registered from users where user_id=$1",
      values: [userId],
    };
    const getUserQueryResult = await dbClient.Query(getUserQuery);
    //console.log(getUserQueryResult);
    if (
      !getUserQueryResult.rows || getUserQueryResult.rowCount > 0
        ? getUserQueryResult.rows[0].is_registered
        : false
    ) {
      //error handling here
      res.status(400).send({
        message: "User does not exist",
        statusCode: 400,
        status: "fail",
        data: {},
        error: null,
      });
    } else {
      const isRegistered = true;
      const updateUserQuery = {
        text: "UPDATE users SET user_name=$1,dob=$2,is_registered=$3 where user_id=$4",
        values: [req.body.name, req.body.dob, isRegistered, userId],
      };
      const updateUserQueryResult = await dbClient.Query(updateUserQuery);
      console.log(updateUserQuery);
      if (!updateUserQueryResult.rows) {
        // error response
        res.status(400).send({
          message: "User can't be registered",
          statusCode: 400,
          status: "fail",
          data: {},
          error: null,
        });
      } else {
        //success
        res.status(200).send({
          message: "User Registered",
          statusCode: 200,
          status: "success",
          data: {},
          error: null,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "User can't be registered",
      statusCode: 500,
      status: "fail",
      data: {},
      error: null,
    });
  }
};
