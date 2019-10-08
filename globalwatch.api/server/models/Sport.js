import mongoose from 'mongoose';

const { Schema } = mongoose;

const sportSchema = new Schema({
    sportName: String,
    imageUrl: String,
    altTag: String,
    description: String,
    matches: [{ type: Schema.ObjectId, ref: 'Match' }]
}, {strict: false})


const Sport = mongoose.model('Sport', sportSchema);

export default Sport;