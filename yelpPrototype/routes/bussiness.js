var ejs = require("ejs");
var mysql = require('./mysql');
var common = require('./common');
var user = require('./user');
/**
 * New node file
 */

exports.getBusinessListHTML = function(req, res) {
	var getQuery = "select *from bussiness";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {

			var businessObj = {
				businessArray : results
			};
			ejs.renderFile('./views/businessList.ejs', businessObj, function(
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
	}, getQuery);
}

exports.getBussinessListJSON = function(req, res) {
	var getQuery = "select *from bussiness";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			var responseString = JSON.stringify(results);
			res.send(responseString);

		}
	}, getQuery);

}

exports.getAddBusinessView = function(req, res) {
	
	var getQuery = "select *from categories";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {

			var categoryObj = {
					categories : results
			};
			ejs.renderFile('./views/addBusiness.ejs', categoryObj, function(
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
	}, getQuery);
}

exports.addBusiness = function(req, res) {
	var data;
	var responseString;
	var Bname = req.param("business-name");
	if(Bname==null || typeof(Bname)=='undefined')
	{
	data = {
			errorCode : 101,
			message : "Please enter a valid business name"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var Baddress = req.param("business-address");
	if(Baddress==null || typeof(Baddress)=='undefined')
	{
	data = {
			errorCode : 101,
			message : "To complete the process we need the location for this business."
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var nhood = req.param("business-neighbourhood");
	if(nhood==null || typeof(nhood)=='undefined')
	{
	data = {
			errorCode : 101,
			message : "Please specify the neighbourhood."
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var Bcategory = req.param("cid");
	if(Bcategory==null || typeof(Bcategory)=='undefined')
	{
	data = {
			errorCode : 101,
			message : "Please select a category for this business."
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var newBusiness = {
		bname : Bname,
		address : Baddress,
		neiborhood : nhood,
		category:Bcategory
	};
	mysql
			.insertData(
					function(err, results) {
						
						if (err) {
							data = {
								errorCode : 101,
								message : "Error occured on the server side.Please try again."
							};
							responseString = JSON.stringify(data);
							res.send(responseString);
						} else {
							console.log("new business added.")
							data = {
								errorCode : 100,
								message : "Business was recorded onto Yelp. Please click on the write a review tab to write a review for the business."
							};
							responseString = JSON.stringify(data);
							res.send(responseString);
						}

					}, newBusiness, "bussiness");

}
