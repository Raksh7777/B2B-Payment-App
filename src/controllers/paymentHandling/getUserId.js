const dbClient = require("./../../db/utils");

module.exports = async (req, res) => {
  try {
    let phoneNumber = req.user.phone;
    const getUserId = {
      text: "SELECT name,user_id,is_registered from users where phone=$1",
      values: [phoneNumber],
    };
    const userDetails = await dbClient.Query(getUserId);
    res.status(200).send({
      message: "Balance updated successfully",
      statusCode: 200,
      status: "Success",
      data: { ...userDetails.rows[0] },
      error: null,
    });
  } catch (error) {
    res.status(500).send({
      message: "User can't be registered",
      statusCode: 500,
      status: "Fail",
      data: {},
      error: null,
    });
  }
};
