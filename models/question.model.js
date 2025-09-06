const {Schema, model} = require('mongoose')

const Question = model('Question', new Schema({ 
    name: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images:{
        type: [String],
        required: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
        enum: [General, programming, logicalreasoning, mathmetical],
        default: General
    },
    proglangId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    featured: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
})
)

module.exports = Question