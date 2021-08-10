const dbClient = require("./../../db/utils");

module.exports = async (req, res) => {
  try {
    let userId = req.user.id;
    let money = req.body.money;
    const addMoneyQuery = {
      text: "UPDATE users set balance=balance+$1 where user_id=$2",
      values: [money, userId],
    };
    dbClient.Query(addMoneyQuery);
    res.status(200).send({
      response: {
        message: "Balance updated successfully",
        statusCode: 200,
        status: "Success",
        data: {},
        error: null,
      },
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
