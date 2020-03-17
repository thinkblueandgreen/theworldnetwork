const router = require("express").Router();
const pollsController = require("../controllers/pollController")
const db = require("../models");
const passport = require('../passport')

router.get("/polls/:category", (req, res) => {
  console.log('route hit')
  
db.Categories.find(req.params)
.then(category => {
  
  return res.json(category[0]);
  
}).catch(err => {
  console.log('Error occured')
  console.log(err);
});
});

router.get("/news", (req, res) => {
  // Use a regular expression to search titles for req.query.q
  // using case insensitive match. https://docs.mongodb.com/manual/reference/operator/query/regex/index.html
  db.News.find({
    title: { $regex: new RegExp(req.query.q, 'i')}
  })
    .then(recipes => res.json(recipes))
    .catch(err => res.status(422).end());
});


router.post('/signup', (req, res) => {
  console.log("=================>"+req.body)
	const { username, password } = req.body
	// ADD VALIDATION
	db.User.findOne({ 'local.username': username }, (err, userMatch) => {
		if (userMatch) {
			return res.json({
				error: `Sorry, already a user with the username: ${username}`
			})
		}
		const newUser = new db.User({
			'local.username': username,
			'local.password': password
		})
		newUser.save((err, savedUser) => {
			if (err) return res.json(err)
			return res.json(savedUser)
		})
	})
})

router.post(
	'/login',
	function(req, res, next) {
		console.log(req.body)
		console.log('================')
		next()
	},
	passport.authenticate('local'),
	(req, res) => {
		console.log('POST to /login')
		const user = JSON.parse(JSON.stringify(req.user)) // hack
		const cleanUser = Object.assign({}, user)
		if (cleanUser.local) {
			console.log(`Deleting ${cleanUser.local.password}`)
			delete cleanUser.local.password
		}
		res.json({ user: cleanUser })
	}
)

function refreshPage() {
    window.location.reload(false);
  }

router.get('/logout', function(req,res){
	console.log("logged out.......");
	//passport.logout().then(response=>console.log(response))

  req.logout();
  res.redirect('/');
	///res.redirect('/'); //Can fire before session is destroyed?

})

module.exports = router;
