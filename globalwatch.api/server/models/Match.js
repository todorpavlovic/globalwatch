import mongoose from 'mongoose';

const { Schema } = mongoose;

const matchSchema = new Schema({
    nameOfTheLeague: String,
    matchDate: Date,
    slug: String,
    imageUrl: String,
    createdAt: { type: Date, default: Date.now },
    description: String,
    links: [{ type: String }],
    teams: [{ type: Schema.ObjectId, ref: 'Team' }],
    _sport: { type: Schema.ObjectId , ref: 'Sport'}
}, { strict: false });




const Match = mongoose.model('Match', matchSchema);

export default Match;