const courses = require('../models').courses
const students = require('../models').students
const lecturers = require('../models').lecturers

module.exports = {
  list (req, res) {
    return courses
      .findAll({
        include: [{
          model: students,
          as: 'students'
        }, {
          model: lecturers,
          as: 'lecturers'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: students, as: 'students' }, 'createdAt', 'DESC']
        ]
      })
      .then((courses) => res.status(200).send(courses))
      .catch((error) => { res.status(400).send(error) })
  },

  getById (req, res) {
    return courses
      .findByPk(req.params.id, {
        include: [{
          model: courses,
          as: 'courses'
        }]
      })
      .then((courses) => {
        if (!courses) {
          return res.status(404).send({
            message: 'Course Not Found'
          })
        }
        return res.status(200).send(courses)
      })
      .catch((error) => res.status(400).send(error))
  },

  add (req, res) {
    return courses
      .create({
        course_name: req.body.course_name
      })
      .then((courses) => res.status(201).send(courses))
      .catch((error) => res.status(400).send(error))
  },

  update (req, res) {
    return courses
      .findByPk(req.params.id, {
        include: [{
          model: courses,
          as: 'courses'
        }]
      })
      .then(courses => {
        if (!courses) {
          return res.status(404).send({
            message: 'Course Not Found'
          })
        }
        return courses
          .update({
            course_name: req.body.course_name || courses.course_name
          })
          .then(() => res.status(200).send(courses))
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  delete (req, res) {
    return courses
      .findByPk(req.params.id)
      .then(courses => {
        if (!courses) {
          return res.status(400).send({
            message: 'courses Not Found'
          })
        }
        return courses
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  }
}
