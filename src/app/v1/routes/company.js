const Router = require('express').Router()

const {
  createData,
  readAll,
  readById,
  updateById,
  updatePhoto,
  verifyById,
  unverifyById,
  deleteById
} = require('../controllers/company')

Router
  .get('/', readAll)
  .get('/:id_company', readById)
  .post(`/`, createData)
  .put('/id/:id_company', updateById)
  .put('/verify/:id_company', verifyById)
  .put('/unverify/:id_company', unverifyById)
  .put('/photo/:id_company', updatePhoto)
  .delete('/id/:id_company', deleteById)

module.exports = Router