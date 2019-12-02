require('dotenv/config')
const { dirImage } = require('../../storage/dirname')

module.exports = {
  dotEnv: (ENV) => {
    return process.env[ENV]
  },
  dirStorageImage: (folder) => {
    return dirImage(folder)
  },
  storagePath: (folder, fileName) => {
    return process.env.BASE_URL+folder+'/'+fileName
  }
}