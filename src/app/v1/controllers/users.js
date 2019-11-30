const usersModel = require('../models/users')

module.exports = {

  readAll : async (req, res) => {
    try {
      const result = await usersModel.readAll()
      res.send({
        status: 200,
        result : result
      })
    } catch (error) {
      console.log(error)
    }
  }

}