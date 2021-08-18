const User = require('../modules/user');
const createError = require('http-errors');

exports.create = (req, res, next) => {
    User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    })
    .then((user) => {
    res.json(user);
    })
    .catch(next)
};

exports.list = (req, res, next) => {
    User.find()
    .then(users => {
        res.json(users);
    })
    .catch(next);
};

exports.show = (req, res, next) => {
    User.findById(req.params.id)
    .then((user) => {
        if(!user) throw createError(404, "there is no user ");
        res.json(user);
    })
    .catch(next);
};

exports.update = (req, res, next) => {
    let data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    User.findByIdAndUpdate(req.params.id, data)

    .then(updatedUser => {
        if(!updatedUser) throw createError(404, "there is no user ");
        res.json(updatedUser);
    })

    .catch(next);
};

exports.delete = (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
    .then(deleted => {
        if(!deleted) throw createError(404, "there is no user ");
        res.json({message: "user deleted"});
    })
    .catch(next);
};