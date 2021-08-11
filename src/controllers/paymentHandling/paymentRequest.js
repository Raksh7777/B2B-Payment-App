const dbClient = require("../../db/utils");

module.exports = async (req, res) => {
  try {
    let userId = req.authInfo.id;
    const receiverIDQuery = {
      text: "SELECT user_id from users WHERE phone_number=$1",
      values: [req.body.phoneNumber],
    };
    console.log("query", receiverIDQuery);
    const getReceiverId = await dbClient.Query(receiverIDQuery);
    console.log(getReceiverId);

    const paymentRequestQuery = {
      text: "INSERT INTO payment_details(sender_id,receiver_id,amount,payment_state ) values($1,$2,$3,$4)",
      values: [
        userId,
        getReceiverId.rows[0].user_id,
        req.body.amount,
        "PAYMENT_REQUEST",
      ],
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
    console.log(e);
    res.status(500).send({
      message: "Payment Request cannot be sent",
      statusCode: 200,
      status: "Fail",
      data: {},
      error: null,
    });
  }
};
