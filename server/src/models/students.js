'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      students.belongsTo(models.classrooms, {
        foreignKey: 'classroom_id',
        as: 'classroom'
      })
      students.belongsToMany(models.courses, {
        through: 'studentcourse',
        as: 'courses',
        foreignKey: 'student_id'
      })
    }
  }
  students.init({
    classroom_id: DataTypes.INTEGER,
    student_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'students'
  })
  return students
}
