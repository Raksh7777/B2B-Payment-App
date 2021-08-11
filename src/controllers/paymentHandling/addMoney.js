const dbClient = require("./../../db/utils");

module.exports = async (req, res) => {
  try {
    let userId = req.authInfo.id;
    let money = req.body.money;
    const addMoneyQuery = {
      text: "UPDATE users set balance=balance+$1 where user_id=$2 returning balance",
      values: [money, userId],
    };
    const balanceUpdate = await dbClient.Query(addMoneyQuery);
    res.status(200).send({
      message: "Balance updated successfully",
      statusCode: 200,
      status: "Success",
      data: { balance: balanceUpdate.rows[0].balance },
      error: null,
    });
  } catch (error) {
    res.status(500).send({
      message: "Balance cannot be updated",
      statusCode: 500,
      status: "Fail",
      data: {},
      error: null,
    });
  }
};
