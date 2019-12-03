const { response } = require('../../../helper/response')
const skillModel = require('../models/skill')

module.exports = {
  createData: async (req, res) => {
    try {
      const payload = await skillModel.createData(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  readAll: async (req, res) => {
    try {
      const payload = await skillModel.readAll(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  readById: async (req, res) => {
    try {
      const payload = await skillModel.readById(req.params.id_skill)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  updateById: async (req, res) => {
    try {
      const payload = await skillModel.updateById(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  deleteById: async (req, res) => {
    try {
      const payload = await skillModel.deleteById(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  readAllSkillEngineer: async (req, res) => {
    try {
      const payload = await skillModel.readAllSkillEngineer(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  readByIdSkillEngineer: async (req, res) => {
    try {
      const payload = await skillModel.readByIdSkillEngineer(req.params.id_skill_engineer)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  readAllSkillEngineer: async (req, res) => {
    try {
      const payload = await skillModel.readAllSkillEngineer(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  readByIdSkillEngineer: async (req, res) => {
    try {
      const payload = await skillModel.readByIdSkillEngineer(req.params.id_skill_engineer)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  createSkillEngineer: async (req, res) => {
    try {
      const payload = await skillModel.createSkillEngineer(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  updateByIdSkillEngineer: async (req, res) => {
    try {
      const payload = await skillModel.updateByIdSkillEngineer(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  deleteSkillEngineer: async (req, res) => {
    try {
      const payload = await skillModel.deleteSkillEngineer(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  }
}