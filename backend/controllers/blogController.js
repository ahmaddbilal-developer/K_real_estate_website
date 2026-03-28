import asyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';

// @desc    Fetch all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
});

// @desc    Fetch single blog
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
        res.json(blog);
    } else {
        res.status(404);
        throw new Error('Blog not found');
    }
});

// @desc    Fetch single blog by slug
// @route   GET /api/blogs/slug/:slug
// @access  Public
const getBlogBySlug = asyncHandler(async (req, res) => {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (blog) {
        res.json(blog);
    } else {
        res.status(404);
        throw new Error('Blog not found');
    }
});

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
    const { title, slug, image, content } = req.body;

    const blog = new Blog({
        title,
        slug,
        image,
        content,
        user: req.user._id,
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
});

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
    const { title, slug, image, content } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (blog) {
        blog.title = title || blog.title;
        blog.slug = slug || blog.slug;
        blog.image = image || blog.image;
        blog.content = content || blog.content;

        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } else {
        res.status(404);
        throw new Error('Blog not found');
    }
});

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
        await Blog.deleteOne({ _id: blog._id });
        res.json({ message: 'Blog removed' });
    } else {
        res.status(404);
        throw new Error('Blog not found');
    }
});

export {
    getBlogs,
    getBlogById,
    getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog,
};
