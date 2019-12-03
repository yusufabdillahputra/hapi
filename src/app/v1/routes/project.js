const Router = require('express').Router()

const {
  createData,
  readAll,
  readById,
  updateById,
  deleteById,
  readAllProjectEngineer,
  readByIdProjectEngineer,
  createProjectEngineer,
  updateByIdProjectEngineer,
  deleteProjectEngineer
} = require('../controllers/project')

Router
  .get('/', readAll)
  .get('/id/:id_project', readById)
  .post(`/`, createData)
  .put('/id/:id_project', updateById)
  .delete('/id/:id_project', deleteById)
  .get('/engineer', readAllProjectEngineer)
  .get('/engineer/id/:id_project_engineer', readByIdProjectEngineer)
  .post(`/engineer`, createProjectEngineer)
  .put('/engineer/id/:id_project_engineer', updateByIdProjectEngineer)
  .delete('/engineer/id/:id_project_engineer', deleteProjectEngineer)

module.exports = Router