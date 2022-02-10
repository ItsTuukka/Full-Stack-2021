const info = (...args) => {
    console.log(...args)
}

const error = (...params) => {
    console.error(...params)
  }
  
module.exports = {
    info, error
  }