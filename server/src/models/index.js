'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'

const configPath = path.join(__dirname, '../../', 'config', 'config.json')
const configObj = require(configPath)
const config = configObj[env]

const modelPath = path.join(__dirname)

// console.log('dirname: ', __dirname)
// console.log('configPath: ', configPath)
// console.log('configObj: ', configObj)
// console.log('modelPath: ', modelPath)
// console.log('config: ', config)
// console.log('env: ', env)

const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

fs
  .readdirSync(modelPath)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    const model = require(path.join(modelPath, file))(sequelize, Sequelize.DataTypes)
    // console.log(file)
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
