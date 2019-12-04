module.exports = {

  dateTimeNow: (separator = '-') => {
    const dateNow = new Date()
    const date = dateNow.getDate()
    const month = dateNow.getMonth() + 1
    const year = dateNow.getFullYear()
    const hours = dateNow.getHours()
    const minutes = dateNow.getMinutes()
    const seconds = dateNow.getSeconds()

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date} ${hours}:${minutes}:${seconds}`
  }

}
