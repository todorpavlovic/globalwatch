import db from '../models';

const teamController = {};

teamController.post = (req, res) => {
    const { logoUrl, teamName, matchId } = req.body;

    db.Team.create({
        logoUrl,
        teamName,
        _match: matchId
    }).then(newTeam => {
        db.Match.findByIdAndUpdate(
            matchId,
            { $push: { 'teams': newTeam._id } }
        ).then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err))
    })
}

teamController.getAll = (req, res) => {
    db.Team.find({})
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
}

teamController.delete = (req, res) => {
    db.Team.findByIdAndDelete({_id: req.params.id})
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
}

export default teamController;