const Router = require('express').Router()

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
  .get('/', readAll)
  .get('/root', readAllRoot)
  .get('/engineer', readAllEngineer)
  .get('/partner', readAllPartner)
  .post(`/`, createData)
  .put('/id/:id_users', updateById)
  .put('/root/id/:id_users', updateByIdRoot)
  .put('/root/photo/:id_users', updatePhotoRoot)
  .put('/engineer/id/:id_users', updateByIdEngineer)
  .put('/engineer/photo/:id_users', updatePhotoEngineer)
  .put('/partner/id/:id_users', updateByIdPartner)
  .put('/partner/photo/:id_users', updatePhotoPartner)
  .delete('/id/:id_users', deleteById)

module.exports = Router
