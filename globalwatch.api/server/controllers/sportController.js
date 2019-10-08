import db from '../models';

const sportController = {};

sportController.getSportsOnly = (req, res) => {
    db.Sport.find({})
    .then(data => {
        return res.send(data)
    }).catch(err => res.send(err))
}

sportController.getAll = (req, res) => {
    db.Sport.find({})
    .populate({
        path: 'matches'
    })
    .then(data => {
       return res.send(data)
    }).catch(err => res.send(err))
}

sportController.getOne = (req, res) => {
    db.Sport.findOne({sportName: req.params.id})
    .populate({
        path: 'matches',
        populate: {
            path: 'teams _sport',
            select: 'teamName logoUrl sportName -_id',
        },

    })
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
}

sportController.post = (req, res) => {
    const { sportName, imageUrl } = req.body;

    db.Sport.create({
        sportName,
        imageUrl
    }).then(data => res.send(data))
    .catch(err => res.send(err))
}

sportController.delete = (req, res) => {
    db.Sport.findByIdAndDelete({_id: req.params.id})
    .then(data => res.status(200).send(data))
    .catch(err => res.send(err))
}

sportController.update = (req, res) => {
    db.Sport.findByIdAndUpdate({ _id: req.params.id },req.body)
    .then(() => {
        db.Sport.findOne({_id: req.params.id})
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err))
    })
}

export default sportController;