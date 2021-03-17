const mongoose = require('mongoose');
const slugify = require('slugify');

// CONNECTION TO DB FOR SEEDING PURPOSES
// mongoose
//   .connect(process.env.MONGO_DB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     console.log('Local DB Connection Successful');
//   })
//   .catch((err) => {
//     console.log('MONGO CONNECTION ERROR!!!!');
//     console.log(err);
//   });

const sauceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Sauce must have a name'],
      trim: true,
      unique: true,
    },
    slug: String,
    brand: {
      type: String,
      required: [true, 'Sauce must have a brand'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Must submit quantity'],
    },
    price: {
      type: Number,
      required: [true, 'Must submit a price'],
    },
    rating: {
      type: Number,
      required: [true, 'Must have a rating'],
      min: [1, 'Rating must be equal to or greater than 1'],
      max: [5, 'Rating must be equal to or less than 5'],
    },
    heat: {
      type: String,
      required: [true, 'Sauce must have a heat level'],
      trim: true,
      enum: {
        values: ['mild', 'medium', 'hot', 'extra hot'],
        message: 'Heat mush be mild, medium, hot or extra hot',
      },
    },
    description: {
      type: String,
      required: [true, 'Must provide a description'],
      trim: true,
      unique: true,
    },
    ingredients: {
      type: String,
      required: [true, 'Must provide ingredients'],
      trim: true,
    },

    size: {
      type: String,
      required: [true, 'Please Enter Bottle Size'],
    },

    isEmpty: {
      type: Boolean,
      default: false,
    },

    onHotOnes: {
      type: Boolean,
      default: false,
    },
    //  image: {
    //    url: String,
    //    filename: String,
    //  },
  },
  { timestamps: true }
);

sauceSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Sauce', sauceSchema);

// SEED

// const Sauce = mongoose.model('Sauce', sauceSchema);

// const hotSauce = new Sauce({
//   name: 'Tabasco',
//   brand: 'Tabasco',
//   bottles: 1,
//   rating: 4,
//   heat: 'medium',
//   description: 'Louisiana Style Hot Sauce at its best!!',
//   ingredients: 'Tabasco peppers!',
//   sizes: ['5oz'],
//   isEmpty: false,
//   onHotOnes: false,
// });

// hotSauce.save();
