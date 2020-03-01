const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Populate = require("../utils/autopopulate");

const TopicSchema = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },

    // url: { type: String, required: true },

    title: { type: String, required: true },
    // summary: { type: String, required: true },
    quizzes: [{type: Schema.Types.ObjectId, ref: 'Quizzes' }],
})

// Always populate the author field
TopicSchema
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'))

TopicSchema.pre("save", (next) => {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;

    if (!this.createdAt) {
        this.createdAt = now;
    }

    next();
});

module.exports = mongoose.model('Topic', TopicSchema);