import mongoose from 'mongoose';

const propertySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Buy', 'Rent'],
        required: true,
    },
    images: [{
        type: String, // Array of image filenames/paths
    }],
    featured: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true,
});

const Property = mongoose.model('Property', propertySchema);
export default Property;
