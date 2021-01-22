class BitField {
  constructor (bits) {
    this.bits = bits
  }

  has (...bits) {
    const checkBit = () => (bit) => (this.bits & bit) === bit

    return bits.every(checkBit())
  }

  add (...bits) {
    const setBit = () => (bit) => (this.bits |= bit)
    bits.forEach(setBit())

    return this
  }

  remove (...bits) {
    const removeBit = () => (bit) => (this.bits ^= bit)
    bits.forEach(removeBit())

    return this
  }
}

module.exports = BitField
