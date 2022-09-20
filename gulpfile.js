const {src, dest,series, watch, parallel} = require("gulp");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const connect = require("gulp-connect");
const cssmin = require("gulp-cssmin");
const htmlmin = require("gulp-htmlmin");


const appPath = {
    css: './app/css/style.css',
    js: './app/js/*.js',
    img: [
        './app/img/**/*.jpg',
        './app/img/**/*.png',
        './app/img/**/*.svg',
    ]
};

const destPath = {
    root: "./dist",
    css: "./dist/css/",
    js: "./dist/js/",
    img: "./dist/img/"
};

const jsPath = [
    "./node_modules/jquery/dist/jquery.min.js",
    "./node_modules/jquery-validation/dist/jquery.validate.min.js",
    "./app/js/script.js"
];

function cssMin() {
    return src(appPath.css)
        .pipe(cssmin())
        .pipe(dest(destPath.css))
        .pipe(connect.reload())
};

function htmlMin() {
    return src("./app/*.html")
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(dest(destPath.root))
        .pipe(connect.reload())
};

function jsMin(){
    return src(jsPath)
        .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest(destPath.js))
        .pipe(connect.reload());
}
function server() {
    connect.server({
        name: "test form",
        root: "dist",
        port: "8080",
        livereload: "true"
    })
}

function watchCode() {
    watch('app/**/*.html', htmlMin);
    watch('app/css/*.css', cssMin);
    watch(appPath.js, jsMin);
}


exports.build = series(htmlMin, cssMin, jsMin)
exports.default = series(htmlMin, cssMin, jsMin, parallel(server, watchCode))
