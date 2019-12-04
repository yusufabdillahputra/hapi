const Router = require('express').Router()
const { verifyToken } = require('../middlewares/authentication')

const {
  createData,
  readAll,
  readAllRoot,
  readAllEngineer,
  readAllPartner,
  updateById,
  updateByIdRoot,
  updatePhotoRoot,
  updateByIdEngineer,
  updatePhotoEngineer,
  updateByIdPartner,
  updatePhotoPartner,
  deleteById
} = require('../controllers/users')

Router
  .get('/', verifyToken, readAll)
  .get('/root', verifyToken, readAllRoot)
  .get('/engineer', readAllEngineer)
  .get('/partner', verifyToken, readAllPartner)
  .post('/', createData)
  .put('/id/:id_users', verifyToken, updateById)
  .put('/root/id/:id_users', verifyToken, updateByIdRoot)
  .put('/root/photo/:id_users', verifyToken, updatePhotoRoot)
  .put('/engineer/id/:id_users', verifyToken, updateByIdEngineer)
  .put('/engineer/photo/:id_users', verifyToken, updatePhotoEngineer)
  .put('/partner/id/:id_users', verifyToken, updateByIdPartner)
  .put('/partner/photo/:id_users', verifyToken, updatePhotoPartner)
  .delete('/id/:id_users', verifyToken, deleteById)

module.exports = Router
