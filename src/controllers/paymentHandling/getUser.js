const dbClient = require("./../../db/utils");

module.exports = async (req, res) => {
  try {
    let userId = req.user.id;
    const getUserQuery = {
      text: "SELEct name,phone,is_registered,balance from users where user_id=$1",
      values: [userId],
    };
    const user = await dbClient.Query(getUserQuery);
    const getPaymentRequestQuery = {
      text: "SELECT sender_id,amount,payment_state from payment_details where receiver_id=$1",
      values: [userId],
    };
    const getPaymentResponse = await dbClient.Query(getPaymentRequestQuery);
    const paymentRequestSentQuery = {
      text: "SELECT receiver_id,amount,payment_state from payment_details where sender_id=$1",
    };
    const paymentRequestSent = await dbClient.Query(paymentRequestSentQuery);
    res.status(200).send({
      message: "Balance updated successfully",
      statusCode: 200,
      status: "Success",
      data: {
        name: user[0].name,
        paymentRequestSent: paymentRequestSent.rows,
        paymentRequestReceived: getPaymentResponse.rows,
      },
      error: null,
    });
  } catch (error) {
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
