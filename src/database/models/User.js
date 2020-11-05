const { DataTypes } = require('sequelize')

module.exports = {
  name: 'users',
  attributes: {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    xp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    blacklist: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
    // rpg: {/* flushed */}
  },
  options: {
    timestamps: false
  }
}
