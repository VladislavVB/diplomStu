const {src, dest, watch, series}  = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const minifyJs = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
var tinypng = require('gulp-tinypng-compress');

// Static server
function bs() {
   serveSass();
   browserSync.init({
    server: {
      baseDir: "./src"
    }
  });
  watch("./*.html").on('change', browserSync.reload);
  watch("./src/sass/**/*.sass", serveSass);
  watch("./src/sass/**/*.scss", serveSass);
  watch("./js/*.js").on('change', browserSync.reload);
};

function serveSass() {
  return src("src/sass/**/*.sass", "src/sass/**/*.scss")
    .pipe(sass())
    .pipe(autoprefixer({
            cascade: false
        }))
    .pipe(dest("src/css"))
    .pipe(browserSync.stream());
};



function css(done) {
  src("src/css/*.css")
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(dest("dist/css"));
  done();
};

function js(done) {
   src(["src/js/**.js","!src/js/**.min.js"])
    .pipe(minifyJs({
        ext: { min:'.js'},
        noSource: true
      }))
    .pipe(dest("dist/js"));
  src("src/js/**.min.js")
    .pipe(dest("dist/js"));
  done();
};

function html(done) {
   src("src/**.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("dist/"));
  done();
};

function php(done) {
   src("src/**.php")
    .pipe(dest("dist/"));
  src("src/phpmailer/**/**")
   .pipe(dest("dist/phpmailer"));
  done();
};

function fonts(done) {
   src('src/fonts/**/**')
    .pipe(dest("dist/fonts"));
  done();
};

function img(done) {
   src('src/img/**/**')
     .pipe(tinypng({
        key: 'bn8fQLyknl9qfhQV3Hz8fRlljk2LgNnw'
      }))
    .pipe(dest('dist/img'));
   src('src/img/**/*.svg')
    .pipe(dest('dist/img'));
  done();
};

exports.serve = bs;
exports.build =  series(serveSass, css, js, html, php, fonts, img); 