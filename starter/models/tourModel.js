const mongoose = require('mongoose');
const slugify = require('slugify');

const TourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: [true, 'Name should be unique'],
      trim: true,
      maxLength: [40, 'Name should be max of 40 characters'],
      minLength: [10, 'Name should be min of 10 characters'],
    },
    slug: String,
    secretTour: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a max group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: ease, medium or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Possible min rating is 1.0'],
      max: [5, 'Possible max rating is 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message:
          'Value of price discount ({VALUE}) should be less than a price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

TourSchema.virtual('durationInWeeks').get(function () {
  return this.duration / 7;
});

TourSchema.pre('save', function (next) {
  this.slug = slugify(this.name);
  next();
});

TourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.startTime = Date.now();
  next();
});

TourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.startTime}`);
  next();
});

const Tour = mongoose.model('Tour', TourSchema);

module.exports = Tour;
