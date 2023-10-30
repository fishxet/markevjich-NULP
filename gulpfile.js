const {series,src,dest,parallel,watch} = require("gulp");

// Створюємо текстовий таск

// Запуск тасків за змовчуванням

var sass = require('gulp-sass')(require('sass')), // конвертує SASS в CSS
    cssnano = require("gulp-cssnano"), // мінімізація CSS
    autoprefixer = require("gulp-autoprefixer"),
    imagemin = require("gulp-imagemin"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename");

const html_task = () => src('app/*.html')
    .pipe(dest('dist'));

const css_task = () => src('app/css/*.css')
    .pipe(dest('dist/css'));
const scss_task = () => src('app/scss/*.scss')
    .pipe(concat('index.scss'))
    .pipe(sass())
    .pipe(cssnano())
    .pipe(rename({suffix:'.min'}))
    .pipe(dest('dist/css'))
const scripts_task = () =>src('app/js/*.js')
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(dest('dist/js'))
const img_task = () => src('app/img/*.+(jpg|png|jpeg|gif)')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        interlaced: true
    }))
    .pipe(dest('dist/img'))
const watch_task = () => {
    watch('app/*.html', parallel(html_task));
    watch('app/scss/*.scss', parallel(scss_task));
    watch('app/js/*.js', parallel(scripts_task));
    watch('app/img/*.+(jpg|png|jpeg|gif)', parallel(img_task));
}

exports.default = series(html_task,scss_task,scripts_task,css_task,img_task, watch_task);