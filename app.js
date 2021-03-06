var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sassMiddleware = require("node-sass-middleware");
const expressLayouts = require("express-ejs-layouts");
const constants = require(path.join(__dirname, "routes", "constants"));

// master router
var masterRouter = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.set("layout", "layouts/default");
app.use(expressLayouts);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    sassMiddleware({
        src: path.join(__dirname, "public", "scss"),
        dest: path.join(__dirname, "public", "stylesheets"),
        indentedSyntax: false, // true = .sass and false = .scss
        sourceMap: true,
        prefix: "/stylesheets",
        outputStyle: "compressed",
    })
);
app.use(express.static(path.join(__dirname, "public")));

app.locals = constants;

app.use("/", masterRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
