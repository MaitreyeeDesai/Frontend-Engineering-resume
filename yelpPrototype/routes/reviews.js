var ejs = require("ejs");
var mysql = require('./mysql');
var common = require('./common');
/**
 * New node file
 */
exports.writeReview = function(req, res) {
	// render the write a review page: ajax req from client
	res.render('writeReview');

};

exports.writeReviewWithModel = function(req, res) {
	var bid = req.param("bid");
	if(bid==null || typeof(bid)=='undefined')
	{
	data = {
			errorCode : 101,
			message : "Error occured on the server side.Please try again."
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var getQ = "select *from bussiness where bid=" + bid;
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			var business = results[0];
			ejs.renderFile('./views/reviewWithModel.ejs', business, function(
					err, result) {
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
	}, getQ);

}

exports.submitReview = function(req, res) {
	// get the session user object
	var responseString;
	var data;
	var userObject = req.session.user;
	// access the user id
	var authorID = userObject.id;
	if(authorID==null || typeof(authorID)=='undefined')
		{
		data = {
				errorCode : 101,
				message : "Error occured on the server side.Please try again."
			};
			responseString = JSON.stringify(data);
			res.send(responseString);
		}
	// get the params: bid,review,rating
	var Bname = req.param("bid");
	if(Bname==null || typeof(Bname)=='undefined')
	{
	data = {
			errorCode : 101,
			message : "Please select a business to write review for."
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var Breview = req.param("review");
	if(Breview==null || typeof(Breview)=='undefined')
	{
	data = {
			errorCode : 101,
			message : "Please write a review to post it."
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var Brating = req.param("rating");
	if(Brating==null || typeof(Brating)=='undefined')
	{
	data = {
			errorCode : 101,
			message : "Please rate the business and then post the review."
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	// create the data object
	var newReview = {
		author : authorID,
		business : Bname,
		review : Breview,
		rating : Brating
	};
	// enter a new entry in the business_review table using the generalized
	// function from mysql.js to insert
	mysql
			.insertData(
					function(err, results) {
						var data;
						if (err) {
							data = {
								errorCode : 101,
								message : "Error occured on the server side.Please try again."
							};
							responseString = JSON.stringify(data);
							res.send(responseString);
						} else {
							console.log("new business added.");
							data = {
								errorCode : 100,
								message : "Your review has for this business has been recorded."
							};
							responseString = JSON.stringify(data);
							res.send(responseString);
						}

					}, newReview, "business_reviews");

};