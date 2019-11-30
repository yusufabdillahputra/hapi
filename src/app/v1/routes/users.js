const Router = require('express').Router()
const {
  createData,
  readAll,
  readRoot,
  readEngineer,
  readPartner,
  readById,
  readByName,
  updateById,
  deleteDataById
} = require(`../controllers/users`)

Router
  .get(`/`, readAll)
  // .post(`/`, createData)
  // .get(`/id/:id_users`, readById)
  // .get(`/name/:name_users`, readByName)
  // .get(`/company/:name_company`, readByCompany)
  // .put(`/:id_users`, updateById)
  // .delete(`/id/:id_users`, deleteDataById)

module.exports = Router
