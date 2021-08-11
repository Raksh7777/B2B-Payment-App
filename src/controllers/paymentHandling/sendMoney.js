const dbClient = require("./../../db/utils");

module.exports = async (req, res) => {
  try {
    let userId = req.authInfo.id;
    const paymentId = req.body.paymentId;
    const paymentRequestQuery = {
      text: "SELECT * from payment_details where payment_id=$1",
      values: [paymentId],
    };

    const getPaymentRequest = await dbClient.Query(paymentRequestQuery);
    console.log(getPaymentRequest);
    //enum payment_state []
    if (getPaymentRequest.rows[0].payment_state === "Completed") {
      res.status(200).send({
        message: "Payment Already done",
        statusCode: 200,
        status: "Success",
        data: {},
        error: null,
      });
    } else {
      const payment = getPaymentRequest.rows[0].amount;
      const getAmountQuery = {
        text: "SELECT balance from users where user_id=$1",
        values: [userId],
      };
      const getBalance = await dbClient.Query(getAmountQuery);
      const balance = getBalance.rows[0].balance;
      if (balance < payment) {
        res.status(200).send({
          message: "Not enough balance",
          statusCode: 200,
          status: "Success",
          data: {},
          error: null,
        });
      } else {
        const updatePaymentState = {
          text: "UPDATE payment_details set payment_state=$1 where payment_id=$2",
          values: ["PAYMENT_COMPLETE", paymentId],
        };
        dbClient.Query(updatePaymentState);
        const updateBalanceQuery = {
          text: "UPDATE users set balance=balance-$1 where user_id=$2 returning balance",
          values: [payment, userId],
        };
        const updatedBalance = await dbClient.Query(updateBalanceQuery);
        res.status(200).send({
          message: "Money Sent Successfully",
          statusCode: 200,
          status: "Success",
          data: { balance: updatedBalance.rows[0].balance },
          error: null,
        });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
