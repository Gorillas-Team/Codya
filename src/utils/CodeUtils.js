class CodeUtils {
  static pipe (...functions) {
    return x => {
      return functions.reduce((arg, f) => f(arg), x)
    }
  }
}

module.exports = CodeUtils
