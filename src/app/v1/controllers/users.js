const { response } = require('../../../helper/response')
const { dirStorageImage } = require('../../../helper/path')
const { getFilesExtension, randomString } = require('../../../helper/generator')
const multer = require('multer')
const fs = require('fs')
const usersModel = require('../models/users')

module.exports = {

  createData: async (req, res) => {
    try {
      const payload = await usersModel.createData(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  readAll: async (req, res) => {
    try {
      const payload = await usersModel.readAll()
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  readAllRoot: async (req, res) => {
    try {
      const payload = await usersModel.readAllRoot()
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  readAllEngineer: async (req, res) => {
    try {
      const payload = await usersModel.readAllEngineer()
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  readAllPartner: async (req, res) => {
    try {
      const payload = await usersModel.readAllPartner()
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  updateById: async (req, res) => {
    try {
      const payload = await usersModel.updateById(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  updateByIdRoot: async (req, res) => {
    try {
      const disStorage = 'root'
      const defaultPhoto = 'default.png'
      const photoField = 'photo_root'
      const roleUsers = await usersModel.readRole(req.params.id_users)
      const readById = await usersModel.readById(roleUsers.rows[0].id_users, roleUsers.rows[0].role_users)
      const getFilesNameToUnlink = readById.rows[0][photoField]

      const generateFileName = randomString(10) + getFilesExtension(req.file.mimetype)
      //const model = await usersModel.updateByIdRoot(req, generateFileName)


      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, dirStorageImage(disStorage))
        },
        filename: function (req, file, cb) {
          cb(null, generateFileName)
        }
      })
      const upload = multer({ storage: storage })

      getFilesNameToUnlink !== defaultPhoto && fs.existsSync(dirStorageImage(disStorage) + getFilesNameToUnlink)
        ? fs.unlinkSync(dirStorageImage(disStorage) + getFilesNameToUnlink)
        : null

      response(res, 200, 200, {
        upload: upload
      })

    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  updateByIdEngineer: async (req, res) => {
    try {
      const defaultPhoto = 'default.png'
      const photoField = 'photo_engineer'
      const roleUsers = await usersModel.readRole(req.params.id_users)
      const readById = await usersModel.readById(roleUsers.rows[0].id_users, roleUsers.rows[0].role_users)
      const getFilesNameToUnlink = readById.rows[0][photoField]

    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  updateByIdPartner: async (req, res) => {
    try {
      const defaultPhoto = 'default.png'
      const photoField = 'photo_partner'
      const roleUsers = await usersModel.readRole(req.params.id_users)
      const readById = await usersModel.readById(roleUsers.rows[0].id_users, roleUsers.rows[0].role_users)
      const getFilesNameToUnlink = readById.rows[0][photoField]

    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  deleteById: async (req, res) => {
    try {
      const payload = await usersModel.deleteById(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },

}
