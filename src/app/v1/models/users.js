const sprintf = require('sprintf-js').sprintf
const { query, pool } = require('../../../helper/db')
const { hash } = require('../../../helper/bcrypt')
const { dateTimeNow } = require('../../../helper/date')
const primaryKey = 'id_users'

module.exports = {

  createData: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'createData',
        text: `INSERT INTO hiringus.db.tbl_users
                   (name_users, username_users, password_users, email_users, role_users)
               VALUES ($1, $2, $3, $4, $5)
               RETURNING *`,
        values: [
          req.body.name_users,
          req.body.username_users,
          hash(req.body.password_users),
          req.body.email_users,
          req.body.role_users
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  readRole: (id) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'readRole',
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
          name: 'readByIdRoot',
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
          name: 'readByIdEngineer',
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
          name: 'readByIdPartner',
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
          sort: req.query.sort || 'ASC',
        }
        const sql = sprintf(`SELECT *
                             FROM hiringus.db.tbl_users
                             WHERE %(fieldname) s LIKE $1
                             ORDER BY $2 %(sort) s
                                 LIMIT $3
                                 OFFSET $4`, property)
        const prepare = {
          name: 'readAllByQuery',
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
          name: 'readAll',
          text: `SELECT *
                 FROM hiringus.db.tbl_users`
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
          sort: req.query.sort || 'ASC',
        }
        const sql = sprintf(`SELECT *
                             FROM hiringus.db.vw_root
                             WHERE %(fieldname)s LIKE $1
                             ORDER BY $2 %(sort)s 
                             LIMIT $3 OFFSET $4`, property)
        const prepare = {
          name: 'readAllRootByQuery',
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
          name: 'readAllRoot',
          text: `SELECT * FROM hiringus.db.vw_root`
        }
        query(prepare, resolve, reject)
      }
    })
  },
  readAllEngineer: (req) => {
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
          sort: req.query.sort || 'ASC',
        }
        const sql = sprintf(`SELECT *
                             FROM hiringus.db.vw_engineer
                             WHERE %(fieldname)s LIKE $1
                             ORDER BY $2 %(sort)s 
                             LIMIT $3 OFFSET $4`, property)
        const prepare = {
          name: 'readAllEngineerByQuery',
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
      else {
        const prepare = {
          name: 'readAllEngineer',
          text: `SELECT * FROM hiringus.db.tbl_engineer`
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
          sort: req.query.sort || 'ASC',
        }
        const sql = sprintf(`SELECT *
                             FROM hiringus.db.vw_partner
                             WHERE %(fieldname)s LIKE $1
                             ORDER BY $2 %(sort)s 
                             LIMIT $3 OFFSET $4`, property)
        const prepare = {
          name: 'readAllPartnerByQuery',
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
      else {
        const prepare = {
          name: 'readAllPartner',
          text: `SELECT * FROM hiringus.db.vw_partner`
        }
        query(prepare, resolve, reject)
      }
    })
  },
  updateById: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'updateById',
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
          req.body.telp_users,
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
        name: 'updatePhotoRoot',
        text: `UPDATE hiringus.db.tbl_root 
                SET photo_root = $1, 
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
        name: 'updateByIdRoot',
        text: `UPDATE hiringus.db.tbl_root
                SET description_root = $1, 
                    position_root = $2, 
                    address_root = $3, 
                    city_root = $4, 
                    province_root = $5, 
                    nation_root = $6,
                    updated_by = $7, 
                    updated_at = $8 
                WHERE ${primaryKey} = $9
                RETURNING *`,
        values: [
          req.body.description_root,
          req.body.position_root,
          req.body.address_root,
          req.body.city_root,
          req.body.province_root,
          req.body.nation_root,
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
        name: 'updatePhotoEngineer',
        text: `UPDATE hiringus.db.tbl_engineer 
                SET photo_engineer = $1, 
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
        name: 'updateByIdEngineer',
        text: `UPDATE hiringus.db.tbl_engineer 
                SET description_engineer = $1,
                    focus_engineer = $2,
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
          req.body.description_engineer,
          req.body.focus_engineer,
          req.body.dbo_engineer,
          req.body.github_engineer,
          req.body.linkedin_engineer,
          req.body.portofolio_engineer,
          req.body.address_engineer,
          req.body.city_engineer,
          req.body.province_engineer,
          req.body.nation_engineer,
          req.body.updated_by,
          dateTimeNow(),
          req.params[primaryKey],
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  updatePhotoPartner: (req, fileName) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'updatePhotoPartner',
        text: `UPDATE hiringus.db.tbl_partner 
                SET photo_partner = $1, 
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
        name: 'updateByIdPartner',
        text: `UPDATE hiringus.db.tbl_partner 
                SET description_partner = $1, 
                    position_partner = $2, 
                    address_partner = $3, 
                    province_partner = $4, 
                    city_partner = $5, 
                    nation_partner = $6, 
                    updated_by = $7, 
                    updated_at = $8 
                WHERE ${primaryKey} = $9
                RETURNING *`,
        values: [
          req.body.description_partner,
          req.body.position_partner,
          req.body.address_partner,
          req.body.province_partner,
          req.body.city_partner,
          req.body.nation_partner,
          req.body.updated_by,
          dateTimeNow(),
          req.params[primaryKey],
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  deleteById: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'deleteById',
        text: `DELETE FROM hiringus.db.tbl_users WHERE ${primaryKey} = $1`,
        values: [
          req.params[primaryKey]
        ]
      }
      query(prepare, resolve, reject)
    })
  }

}
