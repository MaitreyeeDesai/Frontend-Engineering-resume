var ejs = require("ejs");
var mysql = require('./mysql');
var common = require('./common');


exports.forgotpassword = function(req, res) {
	ejs.renderFile('./views/forgotPassword.ejs', function(err, result) {
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
};

exports.getDashboard = function(req, res) {
	var user=req.session.user;
	ejs.renderFile('./views/dashboard.ejs',user, function(err, result) {
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
};

exports.logout=function(req,res){
	req.session.destroy();
	res.redirect("/")
	
}

exports.register = function(req, res) {
	var data;
	var responseString;
	var Fname = req.param("first_name");
	if(Fname==null || typeof(Fname)=='undefined')
	{
	data = {
			errorCode : 101,
			message : "First name requried for sucessful registration"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var Lname = req.param("last_name");
	if(Lname==null || typeof(Lname)=='undefined')
	{
	data = {
			errorCode : 101,
			message : "Last name requried for sucessful registration"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var Email = req.param("email");
	if(Email==null || typeof(Email)=='undefined')
	{
	data = {
			errorCode : 101,
			message : "Email requried for sucessful registration"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var Password = req.param("password");
	if(Password==null || typeof(Password)=='undefined')
	{
	data = {
			errorCode : 101,
			message : "Password requried for sucessful registration"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var todaysDate = common.FormatDate(new Date(), "%Y-%m-%d %H:%M:%S", true);
	var newUserData = {
		fname : Fname,
		lname : Lname,
		username : Email,
		password : Password,
		lastlogin : todaysDate
	};
	mysql.insertData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("new user registered.")
			res.redirect("/");
		}

	}, newUserData,"user");

};

exports.updateCurrentDateInLoggedInUser=function(username) {
	var currentDate = common.FormatDate(new Date(), "%Y-%m-%d %H:%M:%S", false);
	var updateTime = "Update user SET lastlogin='" + currentDate
			+ "' where username='" + username + "'";

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("last login time updated for the user.")
		}

	}, updateTime);
}
