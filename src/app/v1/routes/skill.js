const Router = require('express').Router()
const { verifyToken } = require('../middlewares/authentication')

const {
  createData,
  readAll,
  readById,
  updateById,
  deleteById,
  readAllSkillEngineer,
  readByIdSkillEngineer,
  createSkillEngineer,
  updateByIdSkillEngineer,
  deleteSkillEngineer
} = require('../controllers/skill')

Router
  .get('/', verifyToken, readAll)
  .get('/id/:id_skill', verifyToken, readById)
  .post(`/`, verifyToken, createData)
  .put('/id/:id_skill', verifyToken, updateById)
  .delete('/id/:id_skill', verifyToken, deleteById)
  .get('/engineer', verifyToken, readAllSkillEngineer)
  .get('/engineer/id/:id_skill_engineer', verifyToken, readByIdSkillEngineer)
  .post(`/engineer`, verifyToken, createSkillEngineer)
  .put('/engineer/id/:id_skill_engineer', verifyToken, updateByIdSkillEngineer)
  .delete('/engineer/id/:id_skill_engineer', verifyToken, deleteSkillEngineer)

module.exports = Router