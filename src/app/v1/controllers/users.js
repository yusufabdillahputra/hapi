const { response } = require('../../../helper/response')
const { dirStorageImage } = require('../../../helper/path')
const { randomString } = require('../../../helper/generator')
const multer = require('multer')
const fs = require('fs')
const usersModel = require('../models/users')

module.exports = {

  replaceFileIfExist: async (req, res, pathStorage, photoField, defaultPhoto = 'default.png') => {
    try {
      const roleUsers = await usersModel.readRole(req.params.id_users)
      const readById = await usersModel.readById(roleUsers.rows[0].id_users, roleUsers.rows[0].role_users)
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
      const payload = await usersModel.createData(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 200, 406, error)
    }
  },
  readAll: async (req, res) => {
    try {
      const payload = await usersModel.readAll(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  readById: async (req, res) => {
    try {
      const roleUsers = await usersModel.readRole(req.params.id_users)
      const payload = await usersModel.readById(roleUsers.rows[0].id_users, roleUsers.rows[0].role_users)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  readAllRoot: async (req, res) => {
    try {
      const payload = await usersModel.readAllRoot(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  readAllEngineer: async (req, res) => {
    try {
      const payload = await usersModel.readAllEngineer(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  readAllPartner: async (req, res) => {
    try {
      const payload = await usersModel.readAllPartner(req)
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
  updatePhotoRoot: async (req, res) => {
    try {
      await module.exports.replaceFileIfExist(req, res, 'root', 'photo_root')

      const storage = multer.diskStorage({
        destination: './storage/image/root/',
        filename: (req, file, cb) => {
          cb(null, randomString(10) + '.' + file.mimetype.split('/')[1])
        }
      })
      const upload = multer({ storage: storage }).single('photo_root')
      upload(req, res, async error => {
        if (error instanceof multer.MulterError) {
          response(res, 200, 500, error)
        } else {
          const model = await usersModel.updatePhotoRoot(req, req.file.filename)
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
  updateByIdRoot: async (req, res) => {
    try {
      const payload = await usersModel.updateByIdRoot(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  updatePhotoEngineer: async (req, res) => {
    try {
      await module.exports.replaceFileIfExist(req, res, 'engineer', 'photo_engineer')

      const storage = multer.diskStorage({
        destination: './storage/image/engineer/',
        filename: (req, file, cb) => {
          cb(null, randomString(10) + '.' + file.mimetype.split('/')[1])
        }
      })
      const upload = multer({ storage: storage }).single('photo_engineer')
      upload(req, res, async error => {
        if (error instanceof multer.MulterError) {
          response(res, 200, 500, error)
        } else {
          const model = await usersModel.updatePhotoEngineer(req, req.file.filename)
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
  updateByIdEngineer: async (req, res) => {
    try {
      const payload = await usersModel.updateByIdEngineer(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  updatePhotoPartner: async (req, res) => {
    try {
      await module.exports.replaceFileIfExist(req, res, 'partner', 'photo_partner')

      const storage = multer.diskStorage({
        destination: './storage/image/partner/',
        filename: (req, file, cb) => {
          cb(null, randomString(10) + '.' + file.mimetype.split('/')[1])
        }
      })
      const upload = multer({ storage: storage }).single('photo_partner')
      upload(req, res, async error => {
        if (error instanceof multer.MulterError) {
          response(res, 200, 500, error)
        } else {
          const model = await usersModel.updatePhotoPartner(req, req.file.filename)
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
  updateByIdPartner: async (req, res) => {
    try {
      const payload = await usersModel.updateByIdPartner(req)
      response(res, 200, 200, payload)
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  },
  deleteById: async (req, res) => {
    try {
      const defaultPhoto = 'default.png'
      const roleUsers = await usersModel.readRole(req.params.id_users)
      const readById = await usersModel.readById(roleUsers.rows[0].id_users, roleUsers.rows[0].role_users)
      if (roleUsers.rows[0].role_users === 1) {
        const pathStorage = 'root'
        const getFilesNameToUnlink = readById.rows[0].photo_root
        getFilesNameToUnlink !== defaultPhoto && fs.existsSync(dirStorageImage(pathStorage) + getFilesNameToUnlink)
          ? fs.unlinkSync(dirStorageImage(pathStorage) + getFilesNameToUnlink)
          : null

        const model = await usersModel.deleteById(req)
        response(res, 200, 200, {
          getFilesNameToUnlink: getFilesNameToUnlink,
          model: model
        })
      }
      if (roleUsers.rows[0].role_users === 2) {
        const pathStorage = 'engineer'
        const getFilesNameToUnlink = readById.rows[0].photo_engineer
        if (getFilesNameToUnlink !== defaultPhoto && fs.existsSync(dirStorageImage(pathStorage) + getFilesNameToUnlink)) {
          return fs.unlinkSync(dirStorageImage(pathStorage) + getFilesNameToUnlink)
        }
        getFilesNameToUnlink !== defaultPhoto && fs.existsSync(dirStorageImage(pathStorage) + getFilesNameToUnlink)
          ? fs.unlinkSync(dirStorageImage(pathStorage) + getFilesNameToUnlink)
          : null

        const model = await usersModel.deleteById(req)
        response(res, 200, 200, {
          getFilesNameToUnlink: getFilesNameToUnlink,
          model: model
        })
      }
      if (roleUsers.rows[0].role_users === 3) {
        const pathStorage = 'partner'
        const getFilesNameToUnlink = readById.rows[0].photo_partner
        getFilesNameToUnlink !== defaultPhoto && fs.existsSync(dirStorageImage(pathStorage) + getFilesNameToUnlink)
          ? fs.unlinkSync(dirStorageImage(pathStorage) + getFilesNameToUnlink)
          : null

        const model = await usersModel.deleteById(req)
        response(res, 200, 200, {
          getFilesNameToUnlink: getFilesNameToUnlink,
          model: model
        })
      }
    } catch (error) {
      console.log(error)
      response(res, 500, 500, error)
    }
  }

}
