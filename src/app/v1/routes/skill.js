const Router = require('express').Router()

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
  .get('/', readAll)
  .get('/id/:id_skill', readById)
  .post(`/`, createData)
  .put('/id/:id_skill', updateById)
  .delete('/id/:id_skill', deleteById)
  .get('/engineer', readAllSkillEngineer)
  .get('/engineer/id/:id_skill_engineer', readByIdSkillEngineer)
  .post(`/engineer`, createSkillEngineer)
  .put('/engineer/id/:id_skill_engineer', updateByIdSkillEngineer)
  .delete('/engineer/id/:id_skill_engineer', deleteSkillEngineer)

module.exports = Router