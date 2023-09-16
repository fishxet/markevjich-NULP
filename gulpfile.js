// Підключаємо gulp
var gulp = require("gulp");

// Створюємо текстовий таск
gulp.task('testTask', function() { console.log('This is a test task') });

// Запуск тасків за змовчуванням 

var sass = require("gulp-sass"), // конвертує SASS в CSS
    cssnano = require("gulp-cssnano"), // мінімізація CSS
    autoprefixier = require('gulp-autoprefixier'),
    imagemin = require('gulp-imagemin'),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename");

gulp.task("html", function() {
    return gulp.src("src / *.html").pipe(gulp.dest("dist"));
});

gulp.task("saas", function() {
    return gulp.src("src/sass/*. sass")
        .pipe(concat('styles.sass'))
        .pipe(sass())
        .pipe(autoprefixier({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("dist/css"));
});

gulp.task("scripts", function() {
    return gulp.src("src/js/*.js")
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("dist / js"));
})

gulp.task('imgs', function() {
    return gulp.src("src / images /*. + (jpg | jpeg | png | gif)")
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true
        }))
        .pipe(gulp.dest("dist/images"))
});

gulp.task("watch", function() {
    gulp.watch("src/*.html", ["html"]);
    gulp.watch("src/js/*.js", ["scripts"]);
    gulp.watch("src/sass/*.sass", ["sass"]);
    gulp.watch("src/images/*.+ (jpg | jpeg | png | gif", ["imgs"]);


});

gulp.task("default", ["html", "sass", "scripts", "imgs", "watch"]);