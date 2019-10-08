import mongoose from 'mongoose';

const { Schema } = mongoose;

const teamScheme = new Schema({
    teamName: String,
    logoUrl: String,
    _match: { type: Schema.ObjectId , ref: 'Match'}
});




const Team = mongoose.model('Team', teamScheme);

export default Team;