const Router = require('express').Router()
const { verifyToken } = require('../middlewares/authentication')

const {
  createData,
  readAll,
  readById,
  readAllRoot,
  readAllEngineer,
  readAllProjectSkillEngineer,
  readAllPartner,
  updateById,
  updateByIdRoot,
  updatePhotoRoot,
  updateByIdEngineer,
  updatePhotoEngineer,
  updateByIdPartner,
  setCompanyPartner,
  updatePhotoPartner,
  deleteById
} = require('../controllers/users')

Router
  .get('/', verifyToken, readAll)
  .get('/id/:id_users', verifyToken, readById)
  .get('/root', verifyToken, readAllRoot)
  .get('/engineer', readAllEngineer)
  .get('/merge/engineer', readAllProjectSkillEngineer)
  .get('/partner', verifyToken, readAllPartner)
  .post('/', createData)
  .put('/id/:id_users', verifyToken, updateById)
  .put('/root/id/:id_users', verifyToken, updateByIdRoot)
  .put('/root/photo/:id_users', verifyToken, updatePhotoRoot)
  .put('/engineer/id/:id_users', verifyToken, updateByIdEngineer)
  .put('/engineer/photo/:id_users', verifyToken, updatePhotoEngineer)
  .put('/partner/id/:id_users', verifyToken, updateByIdPartner)
  .put('/partner/company/:id_users', verifyToken, setCompanyPartner)
  .put('/partner/photo/:id_users', verifyToken, updatePhotoPartner)
  .delete('/id/:id_users', verifyToken, deleteById)

module.exports = Router
