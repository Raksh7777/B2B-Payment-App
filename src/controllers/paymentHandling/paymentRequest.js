const dbClient = require("../../db/utils");

module.exports = async (req, res) => {
  try {
    let userId = req.authInfo.id;
    const paymentRequestQuery = {
      text: "INSERT INTO payment_details(sender_id,receiver_id,amount,payment_state ) values($1,$2,$3,$4)",
      values: [userId, req.body.receiverId, req.body.amount, "PAYMENT_REQUEST"],
    };
    await dbClient.Query(paymentRequestQuery);
    res.status(200).send({
      message: "Payment Request Sent Successfully",
      statusCode: 200,
      status: "Success",
      data: {},
      error: null,
    });
  } catch (e) {
    res.status(500).send({
      message: "Payment Request cannot be sent",
      statusCode: 200,
      status: "Fail",
      data: {},
      error: null,
    });
  }
};
