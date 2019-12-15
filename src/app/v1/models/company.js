const sprintf = require('sprintf-js').sprintf
const { query } = require('../../../helper/db')
const { dateTimeNow } = require('../../../helper/date')
const primaryKey = 'id_company'

module.exports = {

  createData: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'createData_company',
        text: `INSERT INTO hiringus.db.tbl_company
                   (name_company, created_by)
               VALUES ($1, $2)
               RETURNING *`,
        values: [
          req.body.name_company,
          req.body.created_by
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  readById: (id) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'readById_company',
        text: `SELECT * FROM hiringus.db.tbl_company WHERE ${primaryKey} = $1 LIMIT 1`,
        values: [
          id
        ]
      }
      query(prepare, resolve, reject)
    })
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
                             FROM hiringus.db.tbl_company
                             WHERE %(fieldname)s LIKE $1
                             ORDER BY $2 %(sort)s
                                 LIMIT $3
                                 OFFSET $4`, property)
        const prepare = {
          name: 'readAllByQuery_company',
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
          name: 'readAll_company',
          text: `SELECT * FROM hiringus.db.tbl_company ORDER BY ${primaryKey} DESC`
        }
        query(prepare, resolve, reject)
      }
    })
  },
  updatePhoto: (req, fileName) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'updatePhoto_company',
        text: `UPDATE hiringus.db.tbl_company
                SET photo_company = $1, 
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
  updateById: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'updateById_company',
        text: `UPDATE hiringus.db.tbl_company
                SET name_company = $1,
                    address_company = $2, 
                    city_company = $3, 
                    province_company = $4, 
                    nation_company = $5,
                    updated_by = $6, 
                    updated_at = $7 
                WHERE ${primaryKey} = $8
                RETURNING *`,
        values: [
          req.body.name_company || null,
          req.body.address_company || null,
          req.body.city_company || null,
          req.body.province_company || null,
          req.body.nation_company || null,
          req.body.updated_by,
          dateTimeNow(),
          req.params[primaryKey]
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  verifyById: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'verifyById_company',
        text: `UPDATE hiringus.db.tbl_company
                SET verify_company = $1,
                    updated_by = $2, 
                    updated_at = $3 
                WHERE ${primaryKey} = $4
                RETURNING *`,
        values: [
          true,
          req.body.updated_by,
          dateTimeNow(),
          req.params[primaryKey]
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  unverifyById: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'verifyById_company',
        text: `UPDATE hiringus.db.tbl_company
                SET verify_company = $1,
                    updated_by = $2, 
                    updated_at = $3 
                WHERE ${primaryKey} = $4
                RETURNING *`,
        values: [
          false,
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
        name: 'deleteById_company',
        text: `DELETE FROM hiringus.db.tbl_company WHERE ${primaryKey} = $1`,
        values: [
          req.params[primaryKey]
        ]
      }
      query(prepare, resolve, reject)
    })
  }

}
