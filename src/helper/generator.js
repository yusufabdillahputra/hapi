module.exports = {

  searchGenerator: (req, like = true) => {
    const prop = {
      column: req.query.column || null,
      columnField: req.query.columnField || null,
      limit: req.query.limit || null,
      offset: req.query.offset || null,
      sort: req.query.sort || null,
      sortOption: req.query.sortOption || null
    }
    if (prop.column !== null) {
      if (prop.columnField !== null) {
        if (prop.sort !== null) {
          if (prop.sortOption !== null) {
            if (prop.limit !== null) {
              if (prop.offset !== null) {
                if (like === true) {
                  return ` WHERE ${prop.column} LIKE '%${prop.columnField}%' ORDER BY ${prop.sort} ${prop.sortOption} LIMIT ${prop.limit} OFFSET ${prop.offset}`
                }
                if (like === false) {
                  return ` WHERE ${prop.column} = '${prop.columnField}' ORDER BY ${prop.sort} ${prop.sortOption} LIMIT ${prop.limit} OFFSET ${prop.offset}`
                }
              }
              if (prop.offset === null) {
                if (like === true) {
                  return ` WHERE ${prop.column} LIKE '%${prop.columnField}%' ORDER BY ${prop.sort} ${prop.sortOption} LIMIT ${prop.limit}`
                }
                if (like === false) {
                  return ` WHERE ${prop.column} = '${prop.columnField}' ORDER BY ${prop.sort} ${prop.sortOption} LIMIT ${prop.limit}`
                }
              }
            }
            if (prop.limit === null) {
              if (like === true) {
                return ` WHERE ${prop.column} LIKE '%${prop.columnField}%' ORDER BY ${prop.sort} ${prop.sortOption}`
              }
              if (like === false) {
                return ` WHERE ${prop.column} = '${prop.columnField}' ORDER BY ${prop.sort} ${prop.sortOption}`
              }
            }
          }
          if (prop.sortOption === null) {
            if (like === true) {
              return ` WHERE ${prop.column} LIKE '%${prop.columnField}%' ORDER BY ${prop.sort}`
            }
            if (like === false) {
              return ` WHERE ${prop.column} = '${prop.columnField}' ORDER BY ${prop.sort}`
            }
          }
        }
        if (prop.sort === null) {
          if (like === true) {
            return ` WHERE ${prop.column} LIKE '%${prop.columnField}%'`
          }
          if (like === false) {
            return ` WHERE ${prop.column} = '${prop.columnField}'`
          }
        }
      }
      if (prop.columnField === null) {
        return null
      }
    }
    if (prop.column === null) {
      if (prop.columnField !== null) {
        return null
      }
      if (prop.sort !== null) {
        if (prop.limit !== null) {
          if (prop.offset !== null) {
            return `ORDER BY ${prop.sort} LIMIT ${prop.limit} OFFSET ${prop.offset}`
          }
          if (prop.offset === null) {
            return `ORDER BY ${prop.sort} LIMIT ${prop.limit}`
          }
        }
        if (prop.limit === null) {
          return null
        }
      }
      if (prop.sort === null) {
        if (prop.limit !== null) {
          if (prop.offset !== null) {
            return `LIMIT ${prop.limit} OFFSET ${prop.offset}`
          }
          if (prop.offset === null) {
            return `LIMIT ${prop.limit}`
          }
        }
        if (prop.limit === null) {
          return null
        }
      }
    }
  },
  randomString: (length) => {
    let result = ''
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result;
  },
  getFilesExtension: (file) => {
    return `.`+file.split('/')[1]
  }

}