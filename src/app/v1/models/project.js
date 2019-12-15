const sprintf = require('sprintf-js').sprintf
const { query } = require('../../../helper/db')
const { dateTimeNow } = require('../../../helper/date')
const primaryKey = 'id_project'

module.exports = {

  createData: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'createData_project',
        text: `INSERT INTO hiringus.db.tbl_project
                   (name_project, deadline_project, created_by)
               VALUES ($1, $2, $3)
               RETURNING *`,
        values: [
          req.body.name_project,
          req.body.deadline_project || null,
          req.body.created_by
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  readById: (id) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'readById_project',
        text: `SELECT * FROM hiringus.db.tbl_project WHERE ${primaryKey} = $1 LIMIT 1`,
        values: [
          id
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  readByCreatedBy: (req) => {
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
                             FROM hiringus.db.tbl_project
                             WHERE created_by = $1
                             AND %(fieldname)s LIKE $2
                             ORDER BY $3 %(sort)s
                                 LIMIT $4
                                 OFFSET $5`, property)
        const prepare = {
          name: 'readByCreatedByQuery_project',
          text: sql,
          values: [
            req.params.created_by,
            value.fieldvalue,
            value.orderBy,
            value.limit,
            value.offset
          ]
        }
        query(prepare, resolve, reject)
      } else {
        const prepare = {
          name: 'readByCreatedBy_project',
          text: `SELECT * FROM hiringus.db.tbl_project WHERE created_by = $1 ORDER BY ${primaryKey} DESC`,
          values: [
            req.params.created_by
          ]
        }
        query(prepare, resolve, reject)
      }
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
                             FROM hiringus.db.tbl_project
                             WHERE %(fieldname)s LIKE $1
                             ORDER BY $2 %(sort)s
                                 LIMIT $3
                                 OFFSET $4`, property)
        const prepare = {
          name: 'readAllByQuery_project',
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
          name: 'readAll_project',
          text: `SELECT * FROM hiringus.db.tbl_project ORDER BY ${primaryKey} DESC`
        }
        query(prepare, resolve, reject)
      }
    })
  },
  updateById: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'updateById_project',
        text: `UPDATE hiringus.db.tbl_project
                SET name_project = $1,
                    description_project = $2, 
                    fee_project = $3, 
                    deadline_project = $4, 
                    updated_by = $5, 
                    updated_at = $6 
                WHERE ${primaryKey} = $7
                RETURNING *`,
        values: [
          req.body.name_project,
          req.body.description_project || null,
          req.body.fee_project || null,
          req.body.deadline_project || null,
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
        name: 'deleteById_project',
        text: `DELETE FROM hiringus.db.tbl_project WHERE ${primaryKey} = $1`,
        values: [
          req.params[primaryKey]
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  readAllProjectEngineer: (req) => {
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
                             FROM hiringus.db.vw_project_engineer
                             WHERE %(fieldname)s LIKE $1
                             ORDER BY $2 %(sort)s
                                 LIMIT $3
                                 OFFSET $4`, property)
        const prepare = {
          name: 'readAllProjectEngineer_project',
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
          name: 'readAllProjectEngineer_project',
          text: `SELECT * FROM hiringus.db.vw_project_engineer ORDER BY ${primaryKey} DESC`
        }
        query(prepare, resolve, reject)
      }
    })
  },
  readByIdProjectEngineer: (id) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'readByIdProjectEngineer_project',
        text: 'SELECT * FROM hiringus.db.vw_project_engineer WHERE id_project_engineer = $1 LIMIT 1',
        values: [
          id
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  readByIdProject: (id) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'readByIdProject_project',
        text: 'SELECT * FROM hiringus.db.vw_project_engineer WHERE id_project = $1',
        values: [
          id
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  readByIdUsersProjectEngineer: (id) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'readByIdUsersProjectEngineer_project',
        text: `SELECT id_project_engineer, id_project, id_users, id_engineer, name_project, status_project_engineer,deadline_project, fee_project, description_project FROM hiringus.db.vw_project_engineer WHERE id_users = $1  ORDER BY ${primaryKey} DESC`,
        values: [
          id
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  createProjectEngineer: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'createProjectEngineer_project',
        text: `INSERT INTO hiringus.db.tbl_project_engineer
                   (id_project, id_engineer, created_by)
               VALUES ($1, $2, $3)
               RETURNING *`,
        values: [
          req.body.id_project,
          req.body.id_engineer,
          req.body.created_by
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  updateByIdProjectEngineer: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'updateByIdProjectEngineer_project',
        text: `UPDATE hiringus.db.tbl_project_engineer
                SET status_project_engineer = $1, 
                    updated_by = $2, 
                    updated_at = $3 
                WHERE id_project_engineer = $4
                RETURNING *`,
        values: [
          req.body.status_project_engineer,
          req.body.updated_by,
          dateTimeNow(),
          req.params.id_project_engineer
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  deleteProjectEngineer: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'deleteProjectEngineer_project',
        text: 'DELETE FROM hiringus.db.tbl_project_engineer WHERE id_project_engineer = $1',
        values: [
          req.params.id_project_engineer
        ]
      }
      query(prepare, resolve, reject)
    })
  }

}
