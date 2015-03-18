var ejs = require("ejs");
var mysql = require('./mysql');
var common = require('./common');

var user=require('./user');
/**
 * New node file
 */
exports.signup = function(req, res) {
	res.render('signup', {
		title : 'Sign Up'
	});
};

exports.signin = function(req, res) {
	if (req.param("email")==null|| typeof(req.param("password"))=="undefined") {
		var data = {
				errorCode : 101,
				message : "Please enter a email address and password."
			};
			var responseString = JSON.stringify(data);
			res.send(responseString);
	}
	var getUser = "select * from user where username='" + req.param("email")
			+ "'" + " and password='" + req.param("password") + "'";

	// check using the database operations if it is correct
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results.length > 0) {
				console.log("valid Login");
				var loggedInUser = results[0];
				// on login success update the last login time as current time
				user.updateCurrentDateInLoggedInUser(req.param("email"));
				loggedInUser.lastlogin = common.FormatDate(
						loggedInUser.lastlogin, "%Y-%m-%d %H:%M:%S", false);
				var getQuery = "Select review,bid,bname,address,neiborhood from business_reviews JOIN bussiness on business_reviews.business=bussiness.bid where business_reviews.author="
						+ loggedInUser.id;
				mysql.fetchData(function(err, reviews) {
					if (err) {
						throw err;
					} else {

						loggedInUser.reviews = reviews;
						req.session.user = loggedInUser;
						ejs.renderFile('./views/home.ejs', loggedInUser,
								function(err, result) {
									// render on success
									if (!err) {
										res.end(result);
									}
									// render or error
									else {
										res.end('An error occurred');
										console.log(err);
									}
								});
					}

				}, getQuery);

			} else {

				console.log("Invalid Login");

				ejs.renderFile('./views/loginFailed.ejs',
						function(err, result) {
							// render on success
							if (!err) {
								res.end(result);
							}
							// render or error
							else {
								res.end('An error occurred');
								console.log(err);
							}
						});

			}
		}
	}, getUser);

}


