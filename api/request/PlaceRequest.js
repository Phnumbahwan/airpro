const { body } = require('express-validator');

const PlaceRequest = [
    body('owner').optional().isInt({ min: 1 }).withMessage('Owner must be an integer greater than or equal to 1'),
    body('title').notEmpty().withMessage('Title is required'),
    body('addedPhotos').notEmpty().withMessage('AddedPhotos is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('perks').notEmpty().withMessage('Perks is required'),
    body('extraInfo').notEmpty().withMessage('ExtraInfo is required'),
    body('checkIn').notEmpty().withMessage('CheckIn is required'),
    body('checkOut').notEmpty().withMessage('CheckOut is required'),
    body('maxGuests').notEmpty().withMessage('MaxGuests is required'),
];

module.exports = PlaceRequest;