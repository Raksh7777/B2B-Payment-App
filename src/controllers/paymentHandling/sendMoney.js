const dbClient = require("./../../db/utils");

module.exports = async (req, res) => {
  try {
    let userId = req.user.id;
    const paymentId = req.body.paymentId;
    const paymentRequestQuery = {
      text: "SELECT * from payment_details where payment_id=$1",
      values: [paymentId],
    };

    const getPaymentRequest = await dbClient.Query(paymentRequestQuery);
    if (getPaymentRequest[0].status === "Completed") {
      res.status(200).send({
        response: {
          message: "Payment Already done",
          statusCode: 200,
          status: "Success",
          data: {},
          error: null,
        },
      });
    } else {
      const payment = getPaymentRequest[0].amount;
      const getAmountQuery = {
        text: "SELECT balance from users where user_id=$1",
        values: [userId],
      };
      const getBalance = await dbClient.Query(getAmountQuery);
      const balance = getBalance[0].balance;
      if (balance < payment) {
        res.status(200).send({
          response: {
            message: "Not enough balance",
            statusCode: 200,
            status: "Success",
            data: {},
            error: null,
          },
        });
      } else {
        const updateBalanceQuery = {
          text: "UPDATE users set balance=balance-$1 where user_id=$2",
          values: [payment, userId],
        };
        await dbClient.Query(updateBalanceQuery);
        res.status(200).send({
          response: {
            message: "Payment Request Sent Successfully",
            statusCode: 200,
            status: "Success",
            data: {},
            error: null,
          },
        });
      }
    }
  } catch (e) {
    res.status(500).send(e);
  }
};
