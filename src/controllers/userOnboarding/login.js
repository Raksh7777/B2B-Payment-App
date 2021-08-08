const config = require("./../../config/config");
console.log(config);
const client = require("twilio")(config.accountSID, config.authToken);

module.exports = async (req, res) => {
  try {
    const twilioResponse = await client.verify
      .services(config.serviceID)
      .verifications.create({
        to: `+${req.query.phonenumber}`,
        channel: req.query.channel,
      });
    res.status(200).send({
      message: "OTP sent Successfully",
      statusCode: 200,
      status: "Success",
      data: {},
      error: null,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "OTP cannot be sent!",
      statusCode: 500,
      status: "Fail",
      data: {},
      error: err,
    });
  }
};
