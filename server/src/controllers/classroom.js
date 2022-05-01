const classrooms = require('../models').classrooms
const students = require('../models').students

module.exports = {
  list (req, res) {
    return classrooms
      .findAll({
        include: [{
          model: students,
          as: 'students'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: students, as: 'students' }, 'createdAt', 'DESC']
        ]
      })
      .then((classrooms) => res.status(200).send(classrooms))
      .catch((error) => { res.status(400).send(error) })
  },

  getById (req, res) {
    return classrooms
      .findByPk(req.params.id, {
        include: [{
          model: students,
          as: 'students'
        }]
      })
      .then((classrooms) => {
        if (!classrooms) {
          return res.status(404).send({
            message: 'classrooms Not Found'
          })
        }
        return res.status(200).send(classrooms)
      })
      .catch((error) => {
        console.log(error)
        res.status(400).send(error)
      })
  },

  add (req, res) {
    return classrooms
      .create({
        class_name: req.body.class_name
      })
      .then((classrooms) => res.status(201).send(classrooms))
      .catch((error) => res.status(400).send(error))
  },

  update (req, res) {
    return classrooms
      .findByPk(req.params.id, {
        include: [{
          model: students,
          as: 'students'
        }]
      })
      .then(classrooms => {
        if (!classrooms) {
          return res.status(404).send({
            message: 'classrooms Not Found'
          })
        }
        return classrooms
          .update({
            class_name: req.body.class_name || classrooms.class_name
          })
          .then(() => res.status(200).send(classrooms))
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  delete (req, res) {
    return classrooms
      .findByPk(req.params.id)
      .then(classrooms => {
        if (!classrooms) {
          return res.status(400).send({
            message: 'Classroom Not Found'
          })
        }
        return classrooms
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  addWithstudent (req, res) {
    return classrooms
      .create({
        class_name: req.body.class_name,
        student_name: req.body.student_name
      },
      {
        include: [{
          model: students,
          as: 'students'
        }]
      })
      .then((classrooms) => res.status(201).send(classrooms))
      .catch((error) => res.status(400).send(error))
  }
}
