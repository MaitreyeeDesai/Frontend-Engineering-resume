
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , loginModule=require('./routes/login')
  , commonjs=require('./routes/common')
  , review=require('./routes/reviews')
  , business=require('./routes/bussiness')
  ,category=require('./routes/category')
  ,sql=require('./routes/mysql')
  ,customConnectionPooling=require('./routes/customConnectionPooling')
  ;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
// configure the session for each request
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser());
app.use(express.session({secret: 'Ummmhmmmmm'})); 
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/**********************************************************************************/
// main login page
app.get('/', routes.index);
//registration page
app.get('/signup',loginModule.signup);
//forgot password link click
app.get('/forgot',user.forgotpassword);
// write a review page
app.get('/writeReview',review.writeReview);
// get the view for displaying the available and registered business 
app.get('/bussinessList',business.getBusinessListHTML);
// get the json list of the busienss
app.get('/getBList',business.getBussinessListJSON);
// get the add business view
app.get('/getAddBusinessView',business.getAddBusinessView);
// get the write review for a business page
app.get('/writeReviewView',review.writeReviewWithModel);
// get the category list display page
app.get('/getCategoryList',category.getCategoryListHTML);
// get the add category page
app.get('/addCategoryView',category.getaddCategoryView);
// get the edit category page
app.get('/editCategoryView',category.geteditCategoryView);
// get the list of categories in JSON
app.get('/getCList',category.getCategoryListJSON);
// delete a category
app.get('/deleteCategory',category.deleteCategory);
// get the dashboard page after tab change
app.get('/getDashboard',user.getDashboard);
// logout, and session clearing action
app.get('/logout',user.logout);
// sign-in action
app.post('/signin',loginModule.signin);
// registration action
app.post('/register',user.register);
// submit a review for the business
app.post('/submitReview',review.submitReview);
// submit the add business form
app.post('/addbusiness',business.addBusiness);
//submit the add category form
app.post('/addCategory',category.addCategory);
// submit edit category form
app.post('/editCategory',category.updateCategory);

/*********************************************************/

http.createServer(app).listen(app.get('port'), function(){
	// indicate the server being online
  console.log('Express server listening on port ' + app.get('port'));
  // initialize the pool for database connections: using mysql pool
  sql.initializeDatabaseConnectionPool();
  
  //initialize the pool for database connections: using custom connection pool: [UNCOMMENT WHEN TO TEST]
  //customConnectionPooling.initializeConnectionPool();
});
