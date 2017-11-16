// Modules
let gulp = require('gulp');
let sass = require('gulp-sass');
let babel = require('gulp-babel');
let handlebars = require('gulp-compile-handlebars');
let concat = require('gulp-concat');
let htmlmin = require('gulp-htmlmin');
let fs = require('fs');

// Instellingen
let sourceDir = 'src';
let buildDir = 'dist';

let styleBundle = 'bundle.css';
let scriptBundle = 'bundle.js';

gulp.task('styles', () => {
    return gulp.src(sourceDir + '/styles/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(concat(styleBundle))
        .pipe(gulp.dest(buildDir + '/css/'));
});

gulp.task('scripts', () => {
    return gulp.src(sourceDir + '/scripts/**/*.js')
        .pipe(babel({
            presets: ['es2015'],
            compact: true
        }))
        .pipe(concat(scriptBundle))
        .pipe(gulp.dest(buildDir + '/js/'));
});

gulp.task('index', () => {
    let data = JSON.parse(fs.readFileSync('info.json'));
    data['styleBundle'] = styleBundle + '?v=' + Date.now();
    data['scriptBundle'] = scriptBundle + '?v=' + Date.now();

    return gulp.src(sourceDir + '/templates/index.handlebars')
        .pipe(handlebars(data, {
            ignorePartials: true,
            batch: sourceDir + '/templates/partials/',
        }))
        .pipe(concat('index.html'))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(buildDir + '/'));
});

gulp.task('colors', () => {
    let ct = new colorThief();
    let colors = ct.getPalette(sourceDir + '/assets/header.jpg', 2, 9);
    console.log(colors);
});

gulp.task('assets', () => {
    return gulp.src(sourceDir + '/assets/**/*')
        .pipe(gulp.dest(buildDir + '/assets/'));
});

gulp.task('watch', () => {
    gulp.watch(sourceDir + '/styles/**/*.scss', ['styles']);
    gulp.watch(sourceDir + '/scripts/**/*.js', ['scripts']);
    gulp.watch(sourceDir + '/templates/**/*.handlebars', ['index']);
    gulp.watch(sourceDir + '/assets/**/*', ['assets']);
});

gulp.task('default', ['index', 'styles', 'scripts', 'assets'], () => {});