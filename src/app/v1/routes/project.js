const Router = require('express').Router()
const { verifyToken } = require('../middlewares/authentication')

const {
  createData,
  readAll,
  readById,
  updateById,
  deleteById,
  readByCreatedBy,
  readAllProjectEngineer,
  readByIdProjectEngineer,
  readByIdProject,
  readByIdUsersProjectEngineer,
  createProjectEngineer,
  updateByIdProjectEngineer,
  deleteProjectEngineer
} = require('../controllers/project')

Router
  .get('/', verifyToken, readAll)
  .get('/id/:id_project', readById)
  .get('/created/:created_by', verifyToken, readByCreatedBy)
  .post('/', verifyToken, createData)
  .put('/id/:id_project', verifyToken, updateById)
  .delete('/id/:id_project', verifyToken, deleteById)
  .get('/engineer', readAllProjectEngineer)
  .get('/engineer/id/:id_project_engineer', readByIdProjectEngineer)
  .get('/engineer/project/id/:id_project', readByIdProject)
  .get('/engineer/users/:id_users', readByIdUsersProjectEngineer)
  .post('/engineer', verifyToken, createProjectEngineer)
  .put('/engineer/id/:id_project_engineer', verifyToken, updateByIdProjectEngineer)
  .delete('/engineer/id/:id_project_engineer', verifyToken, deleteProjectEngineer)

module.exports = Router
