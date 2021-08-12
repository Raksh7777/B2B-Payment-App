const dbClient = require("./../../db/utils");

module.exports = async (req, res) => {
  try {
    let userId = req.authInfo.id;
    const getUserQuery = {
      text: "SELECT user_name,phone_number,is_registered,balance from users where user_id=$1",
      values: [userId],
    };
    const user = await dbClient.Query(getUserQuery);
    console.log("user", user);
    const getPaymentRequestQuery = {
      text: "SELECT users.user_name,users.phone_number,payment_id,sender_id,amount,payment_state,payment_details.created_at from payment_details  INNER JOIN users on payment_details.sender_id = users.user_id where receiver_id=$1",
      values: [userId],
    };
    const getPaymentResponse = await dbClient.Query(getPaymentRequestQuery);

    const paymentRequestSentQuery = {
      text: "SELECT users.user_name,users.phone_number,payment_id,sender_id,amount,payment_state,payment_details.created_at from payment_details  INNER JOIN users on payment_details.receiver_id = users.user_id where sender_id=$1",
      values: [userId],
    };
    const paymentRequestSent = await dbClient.Query(paymentRequestSentQuery);
    //console.log(paymentRequestSent);
    //const sender_id = getPaymentResponse.rows[0].sender_id;
    //const getSenderId = {
    // text: "SELECT user_name from users where user_id=$1",
    // values: [sender_id],
    //};

    //console.log("Received", getPaymentResponse);
    res.status(200).send({
      message: "User details fetched succesfully",
      statusCode: 200,
      status: "Success",
      data: {
        receiver_name: user.rows[0].user_name,
        //sender_name: senderName,
        phoneNumber: user.rows[0].phone_number,
        balance: user.rows[0].balance,
        paymentRequestSent: paymentRequestSent.rows,
        paymentRequestReceived: getPaymentResponse.rows,
      },
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "User details cannot be fetched",
      statusCode: 500,
      status: "Fail",
      data: {},
      error: null,
    });
  }
};
