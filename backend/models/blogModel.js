import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String, // Featured image path
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true,
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
