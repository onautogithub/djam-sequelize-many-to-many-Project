const lecturers = require('../models').lecturers
const courses = require('../models').courses

module.exports = {
  list (req, res) {
    return lecturers
      .findAll({
        include: [{
          model: courses,
          as: 'courses'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: courses, as: 'courses' }, 'createdAt', 'DESC']
        ]
      })
      .then((lecturers) => res.status(200).send(lecturers))
      .catch((error) => { res.status(400).send(error) })
  },

  getById (req, res) {
    return lecturers
      .findByPk(req.params.id, {
        include: [{
          model: courses,
          as: 'courses'
        }]
      })
      .then((lecturers) => {
        if (!lecturers) {
          return res.status(404).send({
            message: 'Lecturer Not Found'
          })
        }
        return res.status(200).send(lecturers)
      })
      .catch((error) => res.status(400).send(error))
  },

  add (req, res) {
    return lecturers
      .create({
        lecturer_name: req.body.lecturer_name
      })
      .then((lecturers) => res.status(201).send(lecturers))
      .catch((error) => res.status(400).send(error))
  },

  update (req, res) {
    return lecturers
      .findByPk(req.params.id, {
        include: [{
          model: courses,
          as: 'courses'
        }]
      })
      .then(lecturers => {
        if (!lecturers) {
          return res.status(404).send({
            message: 'lecturers Not Found'
          })
        }
        return lecturers
          .update({
            lecturer_name: req.body.lecturer_name || lecturers.lecturer_name
          })
          .then(() => res.status(200).send(lecturers))
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  delete (req, res) {
    return lecturers
      .findByPk(req.params.id)
      .then(lecturers => {
        if (!lecturers) {
          return res.status(400).send({
            message: 'lecturers Not Found'
          })
        }
        return lecturers
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },
  addWithcourse (req, res) {
    return lecturers
      .create({
        lecturer_name: req.body.lecturer_name,
        course_name: req.body.course_name
      }, {
        include: [{
          model: courses,
          as: 'courses'
        }]
      })
      .then((lecturers) => res.status(201).send(lecturers))
      .catch((error) => res.status(400).send(error))
  }
}
