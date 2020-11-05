class CodeUtils {
  static pipe (...functions) {
    return x => {
      functions.reduce((arg, func) => func(arg), x)
    }
  }
}

module.exports = CodeUtils
