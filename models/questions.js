const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Populate = require("../utils/autopopulate");

const QuestionSchema = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    // author: { type: Schema.Types.ObjectId, ref: "User", required: true },

    question: { type: String, required: true },
    answers: [{type: String, required: true }],
    answers_given: [{ type: String}],
    correts: [{ type: String, required: true }],
})

// Always populate the author field
QuestionSchema
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'))

QuestionSchema.pre("save", (next) => {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;

    if (!this.createdAt) {
        this.createdAt = now;
    }

    next();
});

module.exports = mongoose.model('Question', QuestionSchema);