module.exports = {

  landing: (req, res) => {
    try {
      res.send('Hello Landing')
    } catch (error) {
      res.send(error)
    }
  }

}
