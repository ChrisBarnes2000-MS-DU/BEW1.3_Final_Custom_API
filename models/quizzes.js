const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },

    url: { type: String, required: true },

    title: { type: String, required: true },
    summary: { type: String, required: true },
    questions: [{type: Schema.Types.ObjectId, ref: 'Question' }],

})


QuizSchema.pre("save", (next) => {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;

    if (!this.createdAt) {
        this.createdAt = now;
    }

    next();
});

module.exports = mongoose.model('Quiz', QuizSchema);