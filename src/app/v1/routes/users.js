const Router = require('express').Router()
const multer = require('multer')
const upload = multer()

const {
  createData,
  readAll,
  readAllRoot,
  readAllEngineer,
  readAllPartner,
  updateById,
  updateByIdRoot,
  updateByIdEngineer,
  updateByIdPartner,
  deleteById
} = require('../controllers/users')

Router
  .get('/', readAll)
  .get('/root', readAllRoot)
  .get('/engineer', readAllEngineer)
  .get('/partner', readAllPartner)
  .post(`/`, createData)
  .put('/id/:id_users', updateById)
  .put('/root/id/:id_users', upload.single('photo_root'), updateByIdRoot)
  .put('/engineer/id/:id_users', upload.single('photo_engineer'), updateByIdEngineer)
  .put('/partner/id/:id_users', upload.single('photo_partner'), updateByIdPartner)
  .delete('/id/:id_users', deleteById)

module.exports = Router
