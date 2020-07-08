// Initialize modules
const { src, dest, watch, series, parallel } = require('gulp');

// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const replace = require('gulp-replace');
const browserSync   = require('browser-sync').create();
const rename = require("gulp-rename");
const babel = require('gulp-babel');
const image = require('gulp-image');

// File paths
const files = {
  scssPath: 'app/scss/**/*.scss',
  jsPath: 'app/js/**/*.js',
  imgPath: 'app/images/**/*',
  fontsPath: 'app/fonts/**/*'
};

// Sass task: compiles the style.scss file into style.css
function scssTask(){
  return src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    //.pipe(dest('dist/css'))
    .pipe(postcss([ autoprefixer(), cssnano() ]))
    .pipe(dest('dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask(){
  return src(files.jsPath)
    .pipe(sourcemaps.init())
    .pipe(babel( {
      "presets": ["@babel/env"]}))
    .pipe(concat('script.js'))
    .pipe(dest('dist/js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('maps'))
    .pipe(dest('dist/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
}

function imgTask() {
  return src(files.imgPath)
    .pipe(image({
      optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
      pngquant: ['--speed=1', '--force', 256],
      zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
      jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
      mozjpeg: ['-optimize', '-progressive'],
      gifsicle: ['--optimize'],
      svgo: ['--enable', 'cleanupIDs', '--disable', 'convertColors']
    }))
    .pipe(dest('dist/images'))
}

function fontsTask() {
  return src(files.fontsPath)
    .pipe(dest('dist/fonts'))
}


// Cachebust
function cacheBustTask(){
  let cbString = new Date().getTime();
  return src(['index.html'])
    .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
    .pipe(dest('.'));
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask(){
  browserSync.init({
    server: {
      baseDir: './'
    }
  }),
  watch([files.scssPath, files.jsPath],
    series(
      parallel(scssTask, jsTask),
      cacheBustTask
    )
  );
}

// Export the default Gulp task so it can be run
// Runs the scss, js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
  parallel(scssTask, jsTask),
  cacheBustTask,
  watchTask
);

exports.imgTask = imgTask;
exports.fontsTask = fontsTask;