const sprintf = require('sprintf-js').sprintf
const { query } = require('../../../helper/db')
const { hash } = require('../../../helper/bcrypt')
const { dateTimeNow } = require('../../../helper/date')
const primaryKey = 'id_users'

module.exports = {

  readRememberToken: (id) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'readRememberToken_users',
        text: `SELECT remember_token FROM hiringus.db.tbl_users WHERE ${primaryKey} = $1`,
        values: [
          id
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  createRememberToken: (token, id) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'createRememberToken_users',
        text: `UPDATE hiringus.db.tbl_users SET remember_token = $1 WHERE ${primaryKey} = $2 RETURNING *`,
        values: [
          token,
          id
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  destroyRememberToken: (id) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'destroyRememberToken',
        text: `UPDATE hiringus.db.tbl_users SET remember_token = NULL WHERE ${primaryKey} = $1 RETURNING *`,
        values: [
          id
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  createData: (req) => {
    return new Promise(async (resolve, reject) => {
      const password = await hash(req.body.password_users)
      const prepare = {
        name: 'createData_users',
        text: `INSERT INTO hiringus.db.tbl_users
                   (name_users, username_users, password_users, email_users, role_users)
               VALUES ($1, $2, '${password}', $3, $4)
               RETURNING *`,
        values: [
          req.body.name_users,
          req.body.username_users,
          req.body.email_users,
          req.body.role_users
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  readByLogin: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'readByLogin_users',
        text: `SELECT ${primaryKey}, username_users, password_users, name_users, remember_token, role_users FROM hiringus.db.tbl_users WHERE username_users = $1 LIMIT 1`,
        values: [
          req.body.username_users
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  readRole: (id) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'readRole_users',
        text: `SELECT ${primaryKey}, role_users FROM hiringus.db.tbl_users WHERE ${primaryKey} = $1 LIMIT 1`,
        values: [
          id
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  readById: (id, role) => {
    if (role === 1) {
      return new Promise((resolve, reject) => {
        const prepare = {
          name: 'readByIdRoot_users',
          text: `SELECT * FROM hiringus.db.vw_root WHERE ${primaryKey} = $1 LIMIT 1`,
          values: [
            id
          ]
        }
        query(prepare, resolve, reject)
      })
    }
    if (role === 2) {
      return new Promise((resolve, reject) => {
        const prepare = {
          name: 'readByIdEngineer_users',
          text: `SELECT * FROM hiringus.db.vw_engineer WHERE ${primaryKey} = $1 LIMIT 1`,
          values: [
            id
          ]
        }
        query(prepare, resolve, reject)
      })
    }
    if (role === 3) {
      return new Promise((resolve, reject) => {
        const prepare = {
          name: 'readByIdPartner_users',
          text: `SELECT * FROM hiringus.db.vw_partner WHERE ${primaryKey} = $1 LIMIT 1`,
          values: [
            id
          ]
        }
        query(prepare, resolve, reject)
      })
    }
  },
  readAll: (req) => {
    return new Promise((resolve, reject) => {
      if (req.query.fn) {
        const value = {
          fieldvalue: '%' + req.query.fv + '%' || '% %',
          orderBy: req.query.order || primaryKey,
          limit: req.query.limit || 60,
          offset: req.query.offset || 0
        }
        const property = {
          fieldname: req.query.fn || 'name_users',
          sort: req.query.sort || 'ASC'
        }
        const sql = sprintf(`SELECT *
                             FROM hiringus.db.tbl_users
                             WHERE %(fieldname)s ILIKE $1
                             ORDER BY $2 %(sort)s
                                 LIMIT $3
                                 OFFSET $4`, property)
        const prepare = {
          name: 'readAllByQuery_users',
          text: sql,
          values: [
            value.fieldvalue,
            value.orderBy,
            value.limit,
            value.offset
          ]
        }
        query(prepare, resolve, reject)
      } else {
        const prepare = {
          name: 'readAll_users',
          text: `SELECT *
                 FROM hiringus.db.tbl_users ORDER BY ${primaryKey} DESC`
        }
        query(prepare, resolve, reject)
      }
    })
  },
  readAllRoot: (req) => {
    return new Promise((resolve, reject) => {
      if (req.query.fn) {
        const value = {
          fieldvalue: '%' + req.query.fv + '%' || '% %',
          orderBy: req.query.order || primaryKey,
          limit: req.query.limit || 60,
          offset: req.query.offset || 0
        }
        const property = {
          fieldname: req.query.fn || 'name_users',
          sort: req.query.sort || 'ASC'
        }
        const sql = sprintf(`SELECT *
                             FROM hiringus.db.vw_root
                             WHERE %(fieldname)s ILIKE $1
                             ORDER BY $2 %(sort)s 
                             LIMIT $3 OFFSET $4`, property)
        const prepare = {
          name: 'readAllRootByQuery_users',
          text: sql,
          values: [
            value.fieldvalue,
            value.orderBy,
            value.limit,
            value.offset
          ]
        }
        query(prepare, resolve, reject)
      } else {
        const prepare = {
          name: 'readAllRoot_users',
          text: `SELECT * FROM hiringus.db.vw_root ORDER BY ${primaryKey} DESC`
        }
        query(prepare, resolve, reject)
      }
    })
  },
  readAllEngineer: (req) => {
    return new Promise((resolve, reject) => {
      if (req.query.fn) {
        if (req.query.fn === 'id_users') {
          const prepare = {
            name: 'readAllEngineerId_users',
            text: 'SELECT * FROM hiringus.db.vw_engineer WHERE id_users = $1 LIMIT 1',
            values: [
              req.query.fv
            ]
          }
          query(prepare, resolve, reject)
        } else {
          const value = {
            fieldvalue: '%' + req.query.fv + '%' || '% %',
            orderBy: req.query.order || primaryKey,
            limit: req.query.limit || 60,
            offset: req.query.offset || 0
          }
          const property = {
            fieldname: req.query.fn || 'name_users',
            sort: req.query.sort || 'ASC'
          }
          const sql = sprintf(`SELECT *
                             FROM hiringus.db.vw_engineer
                             WHERE %(fieldname)s ILIKE $1
                             ORDER BY $2 %(sort)s 
                             LIMIT $3 OFFSET $4`, property)
          const prepare = {
            name: 'readAllEngineerByQuery_users',
            text: sql,
            values: [
              value.fieldvalue,
              value.orderBy,
              value.limit,
              value.offset
            ]
          }
          query(prepare, resolve, reject)
        }
      } else {
        const prepare = {
          name: 'readAllEngineer_users',
          text: `SELECT * FROM hiringus.db.vw_engineer ORDER BY ${primaryKey} DESC`
        }
        query(prepare, resolve, reject)
      }
    })
  },
  readAllPartner: (req) => {
    return new Promise((resolve, reject) => {
      if (req.query.fn) {
        const value = {
          fieldvalue: '%' + req.query.fv + '%' || '% %',
          orderBy: req.query.order || primaryKey,
          limit: req.query.limit || 60,
          offset: req.query.offset || 0
        }
        const property = {
          fieldname: req.query.fn || 'name_users',
          sort: req.query.sort || 'ASC'
        }
        const sql = sprintf(`SELECT *
                             FROM hiringus.db.vw_partner
                             WHERE %(fieldname)s ILIKE $1
                             ORDER BY $2 %(sort)s 
                             LIMIT $3 OFFSET $4`, property)
        const prepare = {
          name: 'readAllPartnerByQuery_users',
          text: sql,
          values: [
            value.fieldvalue,
            value.orderBy,
            value.limit,
            value.offset
          ]
        }
        query(prepare, resolve, reject)
      } else {
        const prepare = {
          name: 'readAllPartner_users',
          text: `SELECT * FROM hiringus.db.vw_partner ORDER BY ${primaryKey} DESC`
        }
        query(prepare, resolve, reject)
      }
    })
  },
  updateById: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'updateById_users',
        text: `UPDATE hiringus.db.tbl_users
                SET name_users = $1, 
                    username_users = $2, 
                    telp_users = $3, 
                    email_users = $4, 
                    updated_by = $5, 
                    updated_at = $6 
                WHERE ${primaryKey} = $7 
                RETURNING *`,
        values: [
          req.body.name_users,
          req.body.username_users,
          req.body.telp_users || null,
          req.body.email_users,
          req.body.updated_by,
          dateTimeNow(),
          req.params[primaryKey]
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  updatePhotoRoot: (req, fileName) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'updatePhotoRoot_users',
        text: `UPDATE hiringus.db.tbl_root 
                SET photo_users = $1, 
                    updated_by = $2, 
                    updated_at = $3 
                WHERE ${primaryKey} = $4
                RETURNING *`,
        values: [
          fileName,
          req.body.updated_by,
          dateTimeNow(),
          req.params[primaryKey]
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  updateByIdRoot: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'updateByIdRoot_users',
        text: `UPDATE hiringus.db.tbl_root
                SET description_root = $1, 
                    position_users = $2, 
                    address_root = $3, 
                    city_root = $4, 
                    province_root = $5, 
                    nation_root = $6,
                    updated_by = $7, 
                    updated_at = $8 
                WHERE ${primaryKey} = $9
                RETURNING *`,
        values: [
          req.body.description_root || null,
          req.body.position_users || null,
          req.body.address_root || null,
          req.body.city_root || null,
          req.body.province_root || null,
          req.body.nation_root || null,
          req.body.updated_by,
          dateTimeNow(),
          req.params[primaryKey]
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  updatePhotoEngineer: (req, fileName) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'updatePhotoEngineer_users',
        text: `UPDATE hiringus.db.tbl_engineer 
                SET photo_users = $1, 
                    updated_by = $2, 
                    updated_at = $3 
                WHERE ${primaryKey} = $4
                RETURNING *`,
        values: [
          fileName,
          req.body.updated_by,
          dateTimeNow(),
          req.params[primaryKey]
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  updateByIdEngineer: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'updateByIdEngineer_users',
        text: `UPDATE hiringus.db.tbl_engineer 
                SET description_engineer = $1,
                    position_users = $2,
                    dbo_engineer = $3,
                    github_engineer = $4,
                    linkedin_engineer = $5,
                    portofolio_engineer = $6,
                    address_engineer = $7,
                    city_engineer = $8,
                    province_engineer = $9,
                    nation_engineer = $10, 
                    updated_by = $11, 
                    updated_at = $12 
                WHERE ${primaryKey} = $13
                RETURNING *`,
        values: [
          req.body.description_engineer || null,
          req.body.position_users || null,
          req.body.dbo_engineer || null,
          req.body.github_engineer || null,
          req.body.linkedin_engineer || null,
          req.body.portofolio_engineer || null,
          req.body.address_engineer || null,
          req.body.city_engineer || null,
          req.body.province_engineer || null,
          req.body.nation_engineer || null,
          req.body.updated_by,
          dateTimeNow(),
          req.params[primaryKey]
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  updatePhotoPartner: (req, fileName) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'updatePhotoPartner_users',
        text: `UPDATE hiringus.db.tbl_partner 
                SET photo_users = $1, 
                    updated_by = $2, 
                    updated_at = $3 
                WHERE ${primaryKey} = $4
                RETURNING *`,
        values: [
          fileName,
          req.body.updated_by,
          dateTimeNow(),
          req.params[primaryKey]
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  updateByIdPartner: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'updateByIdPartner_users',
        text: `UPDATE hiringus.db.tbl_partner 
                SET description_partner = $1, 
                    position_users = $2, 
                    address_partner = $3, 
                    province_partner = $4, 
                    city_partner = $5, 
                    nation_partner = $6, 
                    updated_by = $7, 
                    updated_at = $8 
                WHERE ${primaryKey} = $9
                RETURNING *`,
        values: [
          req.body.description_partner || null,
          req.body.position_users || null,
          req.body.address_partner || null,
          req.body.province_partner || null,
          req.body.city_partner || null,
          req.body.nation_partner || null,
          req.body.updated_by,
          dateTimeNow(),
          req.params[primaryKey]
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  setCompanyPartner: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'setCompanyPartner_users',
        text: `UPDATE hiringus.db.tbl_partner 
                SET id_company = $1,
                    updated_by = $2, 
                    updated_at = $3 
                WHERE ${primaryKey} = $4
                RETURNING *`,
        values: [
          req.body.id_company || null,
          req.body.updated_by,
          dateTimeNow(),
          req.params[primaryKey]
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  deleteById: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'deleteById_users',
        text: `DELETE FROM hiringus.db.tbl_users WHERE ${primaryKey} = $1`,
        values: [
          req.params[primaryKey]
        ]
      }
      query(prepare, resolve, reject)
    })
  }

}
