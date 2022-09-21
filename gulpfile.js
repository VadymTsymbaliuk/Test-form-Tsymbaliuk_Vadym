const {src, dest, series, watch, parallel} = require("gulp");
// const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const connect = require("gulp-connect");
const stylus = require("gulp-stylus");
// const cssmin = require("gulp-cssmin");
const pug = require("gulp-pug");



const appPath = {
    styl: './app/styl/style.styl',
    pug:'./app/index.pug',
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
    html:"./dist",
    js: "./dist/js/",
    img: "./dist/img/"
};

const jsPath = [
    "./node_modules/jquery/dist/jquery.min.js",
    "./node_modules/jquery-validation/dist/jquery.validate.min.js",
    "./app/js/exchangeRate.js",
    "./app/js/script.js"
];


function buildHtml(){
    return src(appPath.pug)
        .pipe(pug({
            preaty:false
        }))
        .pipe(dest(destPath.html))
        .pipe(connect.reload())
};

function buildCss(){
    return src(appPath.styl)
        .pipe(stylus({
            compress:true
        }))
        .pipe(dest(destPath.css))
};

// function cssMin() {
//     return src(appPath.css)
//         .pipe(cssmin())
//         .pipe(dest(destPath.css))
//         .pipe(connect.reload())
// };




function jsMin() {
    return src(jsPath)
        .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        // .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest(destPath.js))
        .pipe(connect.reload());
}

function imageCopy() {
    return src(appPath.img)
        .pipe(dest(destPath.img))
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
    watch(appPath.pug, buildHtml);
    watch(appPath.styl, buildCss);
    watch(appPath.js, jsMin);
    watch(appPath.img, imageCopy);
}


exports.build = series(buildHtml, buildCss, jsMin, imageCopy);
exports.default = series(buildHtml, buildCss, jsMin, imageCopy, parallel(server, watchCode));
