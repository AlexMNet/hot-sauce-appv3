const Sauce = require('../models/sauceModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//Middleware
exports.aliasTopSauces = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-rating';
  req.query.fields = 'name';
  next();
};

exports.getStats = catchAsync(async (req, res, next) => {
  const stats = await Sauce.aggregate([
    {
      $group: {
        _id: '$rating',
        totalSauces: { $sum: '$bottles' },
        avgRating: { $avg: '$rating' },
        minRating: { $min: '$rating' },
        maxRating: { $max: '$rating' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

exports.getAllSauces = catchAsync(async (req, res, next) => {
  //After methods have been chained! Execute query and await its results!
  const features = new APIFeatures(Sauce.find(), req.query)
    .filter()
    .sort()
    .paginate()
    .limitFields();
  const sauces = await features.query;

  res.status(200).json({
    status: 'successful',
    results: sauces.length,
    data: {
      sauces,
    },
  });
});

exports.createSauce = catchAsync(async (req, res, next) => {
  const newSauce = await Sauce.create(req.body);

  res.status(201).json({
    status: 'successful',
    data: {
      sauce: newSauce,
    },
  });
});

exports.getSauce = catchAsync(async (req, res, next) => {
  const sauce = await Sauce.findById(req.params.id);

  //Generate a 404 error for documents not found by ID
  if (!sauce) {
    return next(new AppError('No sauce found with that ID', 404));
  }

  res.status(200).json({
    status: 'Successful',
    data: {
      sauce,
    },
  });
});

exports.updateSauce = catchAsync(async (req, res, next) => {
  const sauce = await Sauce.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!sauce) {
    return next(new AppError('No sauce can be found with that ID', 404));
  }

  res.status(200).json({
    status: 'Successful',
    data: {
      sauce,
    },
  });
});

exports.deleteSauce = catchAsync(async (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const sauce = await Sauce.findByIdAndDelete(req.params.id);

  if (!sauce) {
    return next(new AppError('No sauce can be found with that ID', 404));
  }

  res.status(204).json({
    status: 'successs',
    data: null,
  });
});
