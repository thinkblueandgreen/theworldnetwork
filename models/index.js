//Bashar's code for polling


const Categories = require("./category")
const Polls = require("./polls")
const News = require("./news")
const User = require('./user')


module.exports = {Categories: Categories, Polls: Polls, News: News,
User: User};

//sary's addition down below

// module.exports = {
//     News: require("./news"),
//     User: require('./user'),
//     Categories : require('./category')
//   };


