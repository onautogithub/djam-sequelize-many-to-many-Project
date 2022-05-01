'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class lecturers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      lecturers.hasOne(models.courses, {
        foreignKey: 'lecturer_id',
        as: 'course'
      })
    }
  }
  lecturers.init({
    lecturer_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'lecturers'
  })
  return lecturers
}
