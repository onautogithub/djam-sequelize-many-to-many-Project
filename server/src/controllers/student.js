const students = require('../models').students
const classrooms = require('../models').classrooms
const courses = require('../models').courses

module.exports = {
  list (req, res) {
    return students
      .findAll({
        include: [{
          model: classrooms,
          as: 'classrooms'
        }, {
          model: courses,
          as: 'courses'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: courses, as: 'courses' }, 'createdAt', 'DESC']
        ]
      })
      .then((students) => res.status(200).send(students))
      .catch((error) => { res.status(400).send(error) })
  },

  getById (req, res) {
    return students
      .findByPk(req.params.id, {
        include: [{
          model: classrooms,
          as: 'classrooms'
        }, {
          model: courses,
          as: 'courses'
        }]
      })
      .then((students) => {
        if (!students) {
          return res.status(404).send({
            message: 'students Not Found'
          })
        }
        return res.status(200).send(students)
      })
      .catch((error) => res.status(400).send(error))
  },

  add (req, res) {
    return students
      .create({
        classroom_id: req.body.classroom_id,
        student_name: req.body.student_name
      })
      .then((students) => res.status(201).send(students))
      .catch((error) => res.status(400).send(error))
  },

  update (req, res) {
    return students
      .findByPk(req.params.id, {
        include: [{
          model: classrooms,
          as: 'classrooms'
        }, {
          model: courses,
          as: 'courses'
        }]
      })
      .then(students => {
        if (!students) {
          return res.status(404).send({
            message: 'Student Not Found'
          })
        }
        return students
          .update({
            student_name: req.body.student_name || students.student_name
          })
          .then(() => res.status(200).send(students))
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  delete (req, res) {
    return students
      .findByPk(req.params.id)
      .then(students => {
        if (!students) {
          return res.status(400).send({
            message: 'students Not Found'
          })
        }
        return students
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },
  addcourse (req, res) {
    return students
      .findByPk(req.body.student_id, {
        include: [{
          model: classrooms,
          as: 'classrooms'
        }, {
          model: courses,
          as: 'courses'
        }]
      })
      .then((students) => {
        if (!students) {
          return res.status(404).send({
            message: 'students Not Found'
          })
        }
        courses.findByPk(req.body.courses_id).then((courses) => {
          if (!courses) {
            return res.status(404).send({
              message: 'courses Not Found'
            })
          }
          students.addcourses(courses)
          return res.status(200).send(students)
        })
      })
      .catch((error) => res.status(400).send(error))
  }
}
