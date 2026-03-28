import asyncHandler from 'express-async-handler';
import Property from '../models/propertyModel.js';

// @desc    Fetch all properties
// @route   GET /api/properties
// @access  Public
const getProperties = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: 'i',
        },
    } : {};

    const properties = await Property.find({ ...keyword });
    res.json(properties);
});

// @desc    Fetch single property
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);

    if (property) {
        res.json(property);
    } else {
        res.status(404);
        throw new Error('Property not found');
    }
});

// @desc    Create a property
// @route   POST /api/properties
// @access  Private/Admin
const createProperty = asyncHandler(async (req, res) => {
    const { title, description, price, location, type, images, featured } = req.body;

    const property = new Property({
        title,
        description,
        price,
        location,
        type,
        images,
        featured,
        user: req.user._id,
    });

    const createdProperty = await property.save();
    res.status(201).json(createdProperty);
});

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private/Admin
const updateProperty = asyncHandler(async (req, res) => {
    const { title, description, price, location, type, images, featured } = req.body;

    const property = await Property.findById(req.params.id);

    if (property) {
        property.title = title || property.title;
        property.description = description || property.description;
        property.price = price || property.price;
        property.location = location || property.location;
        property.type = type || property.type;
        property.images = images || property.images;
        property.featured = featured !== undefined ? featured : property.featured;

        const updatedProperty = await property.save();
        res.json(updatedProperty);
    } else {
        res.status(404);
        throw new Error('Property not found');
    }
});

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private/Admin
const deleteProperty = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);

    if (property) {
        await Property.deleteOne({ _id: property._id });
        res.json({ message: 'Property removed' });
    } else {
        res.status(404);
        throw new Error('Property not found');
    }
});

export {
    getProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
};
