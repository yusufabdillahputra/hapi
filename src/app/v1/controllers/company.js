const { response } = require('../../../helper/response')
const { dirStorageImage } = require('../../../helper/path')
const { randomString } = require('../../../helper/generator')
const multer = require('multer')
const fs = require('fs')
const companyModel = require('../models/company')

module.exports = {

  replaceFileIfExist: async (req, res, pathStorage = 'corp', photoField = 'photo_company', defaultPhoto = 'default.png') => {
    try {
      const readById = await companyModel.readById(req.params.id_company)
      const getFilesNameToUnlink = readById.rows[0][photoField]
      if (getFilesNameToUnlink !== defaultPhoto && fs.existsSync(dirStorageImage(pathStorage) + getFilesNameToUnlink)) {
        return fs.unlinkSync(dirStorageImage(pathStorage) + getFilesNameToUnlink)
      }
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  createData: async (req, res) => {
    try {
      const payload = await companyModel.createData(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  readAll: async (req, res) => {
    try {
      const payload = await companyModel.readAll(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  readById: async (req, res) => {
    try {
      const payload = await companyModel.readById(req.params.id_company)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  updateById: async (req, res) => {
    try {
      const payload = await companyModel.updateById(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  updatePhoto: async (req, res) => {
    try {
      await module.exports.replaceFileIfExist(req, res, 'corp')

      const storage = multer.diskStorage({
        destination: './storage/image/corp/',
        filename: (req, file, cb) => {
          cb(null, randomString(10) + '.' + file.mimetype.split('/')[1])
        }
      })
      const upload = multer({ storage: storage }).single('photo_company')
      upload(req, res, async error => {
        if (error instanceof multer.MulterError) {
          response(res, 200, 500, error)
        } else {
          const model = await companyModel.updatePhoto(req, req.file.filename)
          console.log(model)
          response(res, 200, 200, {
            model: model
          })
        }
      })
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  verifyById: async (req, res) => {
    try {
      const payload = await companyModel.verifyById(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  unverifyById: async (req, res) => {
    try {
      const payload = await companyModel.unverifyById(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  deleteById: async (req, res) => {
    try {
      await module.exports.replaceFileIfExist(req, res)

      const payload = await companyModel.deleteById(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  }

}
