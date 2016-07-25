const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// USERS
// ----------------------
const usersSchema = new Schema({
  // required for authentication: DO NOT TOUCH Or You May Get Punched
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x

   // example of optional fields
  name:      { type: String },
  createdAt: { type: Date, default: Date.now }

})


const dishSchema = new Schema({
    description: {type: String, required: true},
    rating: {type: Number, min:0, max:5, default: 0},
    likes: {type: [String], default: []},
    location: {type: String, required: true},
    title: {type: String, required: true},
    authorEmail: {type: String, required: true},

    authorId: {type: String, required: true},
    imageUrl: {type: String, required: true},
    tags: {type: [String]}


})


module.exports = {
  User: createModel('User', usersSchema),
  Dish: createModel('Dish', dishSchema)

}
