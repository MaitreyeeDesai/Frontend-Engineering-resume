var ejs = require("ejs");
var mysql = require('./mysql');
var common = require('./common');
var user = require('./user');

/**
 * New node file
 */

exports.getCategoryListJSON = function(req, res) {
	var getQuery = "select *from categories";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log(results);
			var responseString = JSON.stringify(results);
			res.send(responseString);

		}
	}, getQuery);

}

exports.getCategoryListHTML = function(req, res) {

	var getQuery = "select *from categories";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {

			var categoryObj = {
				category : results
			};
			ejs.renderFile('./views/categoryList.ejs', categoryObj, function(
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

exports.getaddCategoryView = function(req, res) {
	res.render('addCategory');
}

exports.geteditCategoryView = function(req, res) {
	var cid = req.param("cid");
	if (typeof (cid) != 'undefined' && cid != null) {
		var getQ = "select *from categories where id=" + cid;
		mysql.fetchData(function(err, results) {
			if (err) {
				throw err;
			} else {
				var category = results[0];
				ejs.renderFile('./views/editCategory.ejs', category, function(
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

	} else {

		var data = {
			errorCode : 101,
			message : "Bad request. Please try again."
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}

}

exports.addCategory = function(req, res) {
	var Cname = req.param("Cname");
	var data;
	var responseString;
	if (Cname == null || typeof (Cname) == "undefined") {
		data = {
				errorCode : 101,
				message : "Enter a valid category name."
			};
		responseString = JSON.stringify(data);
		res.send(responseString);
	} else {
		var newCategory = {
			name : Cname,
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
								data = {
									errorCode : 100,
									message : "Category recorded succesfully."
								};
								responseString = JSON.stringify(data);
								res.send(responseString);
							}

						}, newCategory, "categories");

	}

}

exports.deleteCategory = function(req, res) {
	var Cid = req.param("cid");
	var data;
	var responseString;
	if (Cid == null || typeof (Cid) == "undefined") {
		data = {
			errorCode : 101,
			message : "Please select a category to delete."
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	} else {
		var deleteQuery = "Delete from categories where id=" + Cid;
		mysql
				.fetchData(
						function(err, results) {
							if (err) {
								data = {
									errorCode : 101,
									message : "Error occured on the server side.Please try again."
								};
								responseString = JSON.stringify(data);
								res.send(responseString);
							} else {

								data = {
									errorCode : 100,
									message : "Category deleted succesfully."
								};
								responseString = JSON.stringify(data);
								res.send(responseString);
							}
						}, deleteQuery);

	}
}

exports.updateCategory = function(req, res) {
	var Cid = req.param("Cid");
	var Cname = req.param("Cname");
	var data;
	var responseString;
	if (Cname == null || typeof (Cname) == "undefined") {
		 data={errorCode:101, message:"Please enter a valid category name."};
		 responseString = JSON.stringify(data);
		res.send(responseString);
	} else {
		var deleteQuery = "Update categories Set name='" + Cname
				+ "' where id=" + Cid;
		mysql
				.fetchData(
						function(err, results) {
							
							if (err) {
								data = {
									errorCode : 101,
									message : "Error occured on the server side.Please try again."
								};
								responseString = JSON.stringify(data);
								res.send(responseString);
							} else {

								console.log("Category updated.");
								data = {
									errorCode : 100,
									message : "The selected category name updated.Please have a look at the list of categories for updated list."
								};
								responseString = JSON.stringify(data);
								res.send(responseString);
							}
						}, deleteQuery);

	}
}
