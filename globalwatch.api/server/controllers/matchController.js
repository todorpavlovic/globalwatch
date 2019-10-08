import db from '../models';

const matchController = {};

matchController.post = (req, res) => {
    const { nameOfTheLeague, 
        matchDate, 
        imageUrl, 
        description, 
        links, 
        sportId,
        teams,
        slug  } = req.body

    db.Match.create({
        nameOfTheLeague,
        matchDate,
        imageUrl, 
        description,
        links, 
        teams,
        slug,
        _sport: sportId
    }).then(newMatch => {
        db.Sport.findByIdAndUpdate(
            sportId,
            { $push: {'matches': newMatch._id} }
        ).then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err))
    })
    
}

matchController.getAll = (req, res) => {
    db.Match.find({})
    .populate({
        path: 'teams',
        select: 'teamName logoUrl',
    })
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
}

matchController.getOne = (req, res) => {
    db.Match.findOne({slug: req.params.id})
    .populate({
        path: 'teams',
        select: 'teamName logoUrl'
    })
    .populate({
        path: '_sport',
        select: 'sportName -_id'
    })
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
}

matchController.update = (req, res) => {
    db.Match.findByIdAndUpdate({ _id: req.params.id },req.body)
    .then(() => {
        db.Match.findOne({_id: req.params.id})
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err))
    })
}

matchController.delete = (req, res) => {
    const sportId =  req.params.sportId;
    const matchId = req.params.id;


    db.Sport.findByIdAndUpdate(sportId, { $pull:  { 'matches': matchId } }, next => {
        res.status(200).send(next)
    }, err => {
        res.status(500).send(err);
    })
    db.Match.findByIdAndDelete({_id: req.params.id})
    .then(data => res.status(200).send(req.params))
    .catch(err => res.send(err))
}



export default matchController;