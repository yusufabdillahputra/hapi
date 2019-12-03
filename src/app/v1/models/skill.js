const sprintf = require('sprintf-js').sprintf
const { query } = require('../../../helper/db')
const { dateTimeNow } = require('../../../helper/date')
const primaryKey = 'id_skill'

module.exports = {

  createData: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'createData_skill',
        text: `INSERT INTO hiringus.db.tbl_skill
                   (name_skill, created_by)
               VALUES ($1, $2)
               RETURNING *`,
        values: [
          req.body.name_skill,
          req.body.created_by
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  readById: (id) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'readById_skill',
        text: `SELECT * FROM hiringus.db.tbl_skill WHERE ${primaryKey} = $1 LIMIT 1`,
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
          fieldname: req.query.fn || 'name_skill',
          sort: req.query.sort || 'ASC',
        }
        const sql = sprintf(`SELECT *
                             FROM hiringus.db.tbl_skill
                             WHERE %(fieldname)s LIKE $1
                             ORDER BY $2 %(sort)s
                                 LIMIT $3
                                 OFFSET $4`, property)
        const prepare = {
          name: 'readAllByQuery_skill',
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
          name: 'readAll_skill',
          text: `SELECT * FROM hiringus.db.tbl_skill`
        }
        query(prepare, resolve, reject)
      }
    })
  },
  updateById: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'updateById_skill',
        text: `UPDATE hiringus.db.tbl_skill
                SET name_skill = $1, 
                    updated_by = $2, 
                    updated_at = $3 
                WHERE ${primaryKey} = $4
                RETURNING *`,
        values: [
          req.body.name_skill,
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
        name: 'deleteById_skill',
        text: `DELETE FROM hiringus.db.tbl_skill WHERE ${primaryKey} = $1`,
        values: [
          req.params[primaryKey]
        ]
      }
      query(prepare, resolve, reject)
    })
  },


  readAllSkillEngineer: (req) => {
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
                             FROM hiringus.db.vw_skill_engineer
                             WHERE %(fieldname)s LIKE $1
                             ORDER BY $2 %(sort)s
                                 LIMIT $3
                                 OFFSET $4`, property)
        const prepare = {
          name: 'readAllSkillEngineer_skill',
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
          name: 'readAllSkillEngineer_skill',
          text: `SELECT * FROM hiringus.db.vw_skill_engineer`
        }
        query(prepare, resolve, reject)
      }
    })
  },
  readByIdSkillEngineer: (id) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'readByIdSkillEngineer_skill',
        text: `SELECT * FROM hiringus.db.vw_skill_engineer WHERE id_skill_engineer = $1 LIMIT 1`,
        values: [
          id
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  createSkillEngineer: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'createSkillEngineer_skill',
        text: `INSERT INTO hiringus.db.tbl_skill_engineer
                   (id_skill, id_engineer, level_skill_engineer, created_by)
               VALUES ($1, $2, $3, $4)
               RETURNING *`,
        values: [
          req.body.id_skill,
          req.body.id_engineer,
          req.body.level_skill_engineer || null,
          req.body.created_by
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  updateByIdSkillEngineer: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'updateByIdSkillEngineer_skill',
        text: `UPDATE hiringus.db.tbl_skill_engineer
                SET level_skill_engineer = $1, 
                    updated_by = $2, 
                    updated_at = $3 
                WHERE id_skill_engineer = $4
                RETURNING *`,
        values: [
          req.body.level_skill_engineer,
          req.body.updated_by,
          dateTimeNow(),
          req.params.id_skill_engineer
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  deleteSkillEngineer: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'deleteSkillEngineer_skill',
        text: `DELETE FROM hiringus.db.tbl_skill_engineer WHERE id_skill_engineer = $1`,
        values: [
          req.params.id_skill_engineer
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  

}