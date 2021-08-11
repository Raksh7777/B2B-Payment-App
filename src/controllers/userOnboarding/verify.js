const config = require("./../../config/config");
const client = require("twilio")(config.accountSID, config.authToken);
const dbClient = require("./../../db/utils");

const idToken = require("./../../helpers/token");

module.exports = async (req, res) => {
  try {
    const twilioResponse = await client.verify
      .services(config.serviceID)
      .verificationChecks.create({
        to: `+${req.query.phonenumber}`,
        code: req.query.code,
      });
    if (!twilioResponse.valid) {
      res.status(403).send({
        message: "OTP invalid!",
        statusCode: 403,
        status: "Fail",
        data: {},
        error: null,
      });
    } else {
      const checkQuery = {
        text: "SELECT user_id, is_Registered FROM users WHERE phone_number=$1",
        values: [req.query.phonenumber],
      };
      const userExists = await dbClient.Query(checkQuery);
      const isReg = userExists.rows[0].is_registered;
      console.log(isReg);

      if (userExists.rowCount === 0) {
        const insertQuery = {
          text: "INSERT INTO users(phone_number)VALUES($1) RETURNING user_id",
          values: [req.query.phonenumber.trim()],
        };
        const writeUser = await dbClient.Query(insertQuery);

        const user = writeUser.rows[0].user_id;
        const resToken = await idToken(user);

        res.status(200).send({
          message: "OTP sent successfully",
          statusCode: 200,
          status: "Success",
          data: { resToken, is_Registered: isReg },
          error: null,
        });
      } else if (userExists.rowCount === 1) {
        const selectQuery = {
          text: "SELECT user_id from users WHERE phone_number=$1",
          values: [req.query.phonenumber],
        };
        const existingUser = await dbClient.Query(selectQuery);

        const user = existingUser.rows[0].user_id;
        const resToken = await idToken(user);
        console.log(resToken);

        // console.log(user)

        res.status(200).send({
          message: "OTP verified successfully",
          statusCode: 200,
          status: "Success",
          data: { resToken, is_Registered: isReg },
          error: null,
        });
      }
    }
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};
