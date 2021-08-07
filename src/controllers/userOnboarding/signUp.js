const config = require("./../../config/config");
const client = require("twilio")(config.accountSID, config.authToken);
const dbClient = require("./../../db/utils");
const tokenVerify = require("./../../middlewares/verifyToken");

module.exports = async (req, res) => {
  try {
    const userId = req.userInfo;
    const getUserQuery = {
      text: "SELECT * status from users where user_id=$1",
      values: [userId],
    };
    const getUserQueryResult = await dbClient.Query(getUserQuery);
    if (!getUserQueryResult.rows || getUserQueryResult.rows[0].isRegistered) {
      //error handling here
      res.status(400).send({
        response: {
          message: "User can't be registered",
          statusCode: 400,
          status: "Fail",
          data: {},
          error: null,
        },
      });
    } else {
      const userStatus = true;
      const updateUserQuery = {
        text: "UPDATE users SET name=$1,dob=$2,is_registered=$3 where user_id=$4",
        values: [req.body.name, req.body.dob, userStatus, userId],
      };
      const updateUserQueryResult = await dbClient.Query(updateUserQuery);
      if (!updateUserQueryResult.rows) {
        // error response
        res.status(400).send({
          response: {
            message: "User can't be registered",
            statusCode: 400,
            status: "Fail",
            data: {},
            error: null,
          },
        });
      } else {
        //success
        res.status(200).send({
          response: {
            message: "User Registered",
            statusCode: 200,
            status: "Success",
            data: {},
            error: null,
          },
        });
      }
    }
  } catch (err) {
    res.status(500).send({
      response: {
        message: "User can't be registered",
        statusCode: 500,
        status: "Fail",
        data: {},
        error: null,
      },
    });
  }
};
