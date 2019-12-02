const { schema, query, pool } = require('../../../helper/db')
const { hash } = require('../../../helper/bcrypt')
const { dateTimeNow } = require('../../../helper/date')
const primaryKey = 'id_users'
const table = {
  users: schema('tbl_users'),
  root: schema('tbl_root'),
  engineer: schema('tbl_engineer'),
  partner: schema('tbl_partner'),
}
const view = {
  root: schema('vw_root'),
  engineer: schema('vw_engineer'),
  partner: schema('vw_partner')
}

module.exports = {

  createData: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'createData',
        text: `INSERT INTO ${table.users} 
                (name_users, username_users, password_users, email_users, role_users) 
                VALUES 
                ($1, $2, $3, $4, $5) 
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
        text: `SELECT ${primaryKey}, role_users FROM ${table.users} WHERE ${primaryKey} = $1 LIMIT 1`,
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
          text: `SELECT * FROM ${view.root} WHERE ${primaryKey} = $1 LIMIT 1`,
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
          text: `SELECT * FROM ${view.engineer} WHERE ${primaryKey} = $1 LIMIT 1`,
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
          text: `SELECT * FROM ${view.root} WHERE ${primaryKey} = $1 LIMIT 1`,
          values: [
            id
          ]
        }
        query(prepare, resolve, reject)
      })
    }
  },
  readAll: () => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'readAll',
        text: `SELECT * FROM ${table.users}`
      }
      query(prepare, resolve, reject)
    })
  },
  readAllRoot: () => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'readAllRoot',
        text: `SELECT * FROM ${view.root}`
      }
      query(prepare, resolve, reject)
    })
  },
  readAllEngineer: () => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'readAllEngineer',
        text: `SELECT * FROM ${view.engineer}`
      }
      query(prepare, resolve, reject)
    })
  },
  readAllPartner: () => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'readAllPartner',
        text: `SELECT * FROM ${view.partner}`
      }
      query(prepare, resolve, reject)
    })
  },
  updateById: (req) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'updateById',
        text: `UPDATE ${table.users} 
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
  updateByIdRoot: (req, fileName = null) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'updateByIdRoot',
        text: `UPDATE ${table.root} 
                SET description_root = $1, 
                    position_root = $2, 
                    address_root = $3, 
                    city_root = $4, 
                    province_root = $5, 
                    nation_root = $6, 
                    photo_root = $7, 
                    updated_by = $8, 
                    updated_at = $9 
                WHERE ${primaryKey} = $10
                RETURNING *`,
        values: [
          req.body.description_root,
          req.body.position_root,
          req.body.address_root,
          req.body.city_root,
          req.body.province_root,
          req.body.nation_root,
          fileName,
          field.updated_by,
          dateTimeNow(),
          req.params[primaryKey]
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  updateByIdEngineer: (req, field, fileName = null) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'updateByIdEngineer',
        text: `UPDATE ${table.engineer} 
                SET description_engineer = $1,
                    focus_engineer = $2,
                    dbo_engineer = $3,
                    photo_engineer = $4,
                    github_engineer = $5,
                    linkedin_engineer = $6,
                    portofolio_engineer = $7,
                    address_engineer = $8,
                    city_engineer = $9,
                    province_engineer = $10,
                    nation_engineer = $11, 
                    updated_by = $12, 
                    updated_at = $13 
                WHERE ${primaryKey} = $14
                RETURNING *`,
        values: [
          field.description_engineer,
          field.focus_engineer,
          field.dbo_engineer,
          fileName,
          field.github_engineer,
          field.linkedin_engineer,
          field.portofolio_engineer,
          field.address_engineer,
          field.city_engineer,
          field.province_engineer,
          field.nation_engineer,
          field.updated_by,
          dateTimeNow(),
          req.params[primaryKey],
        ]
      }
      query(prepare, resolve, reject)
    })
  },
  updateByIdPartner: (req, field, fileName = null) => {
    return new Promise((resolve, reject) => {
      const prepare = {
        name: 'updateByIdPartner',
        text: `UPDATE ${table.partner} 
                SET description_partner = $1, 
                    photo_partner = $2, 
                    position_partner = $3, 
                    address_partner = $4, 
                    province_partner = $5, 
                    city_partner = $6, 
                    nation_partner = $7, 
                    updated_by = $8, 
                    updated_at = $9 
                WHERE ${primaryKey} = $10
                RETURNING *`,
        values: [
          field.description_partner,
          fileName,
          field.position_partner,
          field.address_partner,
          field.province_partner,
          field.city_partner,
          field.nation_partner,
          field.updated_by,
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
        text: `DELETE FROM ${table.users} WHERE ${primaryKey} = $1`,
        values: [
          req.params[primaryKey]
        ]
      }
      query(prepare, resolve, reject)
    })
  }

}
