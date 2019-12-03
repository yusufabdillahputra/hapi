const Router = require('express').Router()
const { verifyToken } = require('../middlewares/authentication')

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
  .get('/', verifyToken, readAll)
  .get('/:id_company', verifyToken, readById)
  .post(`/`, verifyToken, createData)
  .put('/id/:id_company', verifyToken, updateById)
  .put('/verify/:id_company', verifyToken, verifyById)
  .put('/unverify/:id_company', verifyToken, unverifyById)
  .put('/photo/:id_company', verifyToken, updatePhoto)
  .delete('/id/:id_company', verifyToken, deleteById)

module.exports = Router