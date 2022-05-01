var express = require('express')
var router = express.Router()
var path = require('path')
const controllerPath = path.join(__dirname, '../../', 'controllers')

// console.log('controllerPath: ', controllerPath)

const classroomsController = require(controllerPath).classroom
const studentsController = require(controllerPath).student
const lecturersController = require(controllerPath).lecturer
const coursesController = require(controllerPath).course

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/api/classrooms', classroomsController.list)
router.get('/api/classrooms/:id', classroomsController.getById)
router.post('/api/classrooms', classroomsController.add)
router.put('/api/classrooms/:id', classroomsController.update)
router.delete('/api/classrooms/:id', classroomsController.delete)
router.post('/api/classrooms/add_with_students', classroomsController.addWithstudent)

router.get('/api/students', studentsController.list)
router.get('/api/students/:id', studentsController.getById)
router.post('/api/students', studentsController.add)
router.put('/api/students/:id', studentsController.update)
router.delete('/api/students/:id', studentsController.delete)
router.post('/api/students/add_courses', studentsController.addcourse)

router.get('/api/lecturers', lecturersController.list)
router.get('/api/lecturers/:id', lecturersController.getById)
router.post('/api/lecturers', lecturersController.add)
router.put('/api/lecturers/:id', lecturersController.update)
router.delete('/api/lecturers/:id', lecturersController.delete)
router.post('/api/lecturers/add_with_courses', lecturersController.addWithcourse)

router.get('/api/courses', coursesController.list)
router.get('/api/courses/:id', coursesController.getById)
router.post('/api/courses', coursesController.add)
router.put('/api/courses/:id', coursesController.update)
router.delete('/api/courses/:id', coursesController.delete)

module.exports = router
