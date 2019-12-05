const { response } = require('../../../helper/response')
const projectModel = require('../models/project')

module.exports = {
  createData: async (req, res) => {
    try {
      const payload = await projectModel.createData(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  readAll: async (req, res) => {
    try {
      const payload = await projectModel.readAll(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  readById: async (req, res) => {
    try {
      const payload = await projectModel.readById(req.params.id_project)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  updateById: async (req, res) => {
    try {
      const payload = await projectModel.updateById(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  deleteById: async (req, res) => {
    try {
      const payload = await projectModel.deleteById(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },

  readAllProjectEngineer: async (req, res) => {
    try {
      const payload = await projectModel.readAllProjectEngineer(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  readByIdProjectEngineer: async (req, res) => {
    try {
      const payload = await projectModel.readByIdProjectEngineer(req.params.id_project_engineer)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  readByIdUsersProjectEngineer: async (req, res) => {
    try {
      const payload = await projectModel.readByIdUsersProjectEngineer(req.params.id_users)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  readAllProjectEngineer: async (req, res) => {
    try {
      const payload = await projectModel.readAllProjectEngineer(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  readByIdProjectEngineer: async (req, res) => {
    try {
      const payload = await projectModel.readByIdProjectEngineer(req.params.id_project_engineer)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  createProjectEngineer: async (req, res) => {
    try {
      const payload = await projectModel.createProjectEngineer(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  updateByIdProjectEngineer: async (req, res) => {
    try {
      const payload = await projectModel.updateByIdProjectEngineer(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  deleteProjectEngineer: async (req, res) => {
    try {
      const payload = await projectModel.deleteProjectEngineer(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  }
}
