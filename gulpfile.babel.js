import gulp from 'gulp';
import autoprefixer from 'autoprefixer';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import rimraf from 'rimraf';
import notify from 'gulp-notify';
import browserSync, { reload } from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import nested from 'postcss-nested';
import vars from 'postcss-simple-vars';
import extend from 'postcss-simple-extend';
import cssnano from 'cssnano';
import htmlReplace from 'gulp-html-replace';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import runSequence from 'run-sequence';
import ghPages from 'gulp-gh-pages';
import less from 'gulp-less';

const paths = {
  bundle: 'app.js',
  srcJsx: 'src/Index.js',
  srcCss: 'src/styles/**/*.scss',
  srcImg: 'src/images/**',
  srcLint: ['src/**/*.js', 'test/**/*.js'],
  srcBower: ['src/bower_components/**/*.min.js', 'src/bower_components/**/*-min.js', 'src/bower_components/**/*.map'],
  dist: 'dist',
  distJs: 'dist/js',
  distImg: 'dist/images',
  distCss: 'dist/styles',
  distBower: 'dist/bower_components',
  distDeploy: './dist/**/*'
};

const customOpts = {
  entries: [paths.srcJsx],
  debug: true,
  notify: false
};

const opts = Object.assign({}, watchify.args, customOpts);

gulp.task('clean', cb => {
  rimraf('dist', cb);
});

gulp.task('browserSync', () => {
  browserSync({
    server: {
      baseDir: ["src", "dist"]
    }
  });
});

gulp.task('watchify', () => {
  let bundler = watchify(browserify(opts));

  function rebundle() {
    return bundler.bundle()
      .on('error', notify.onError())
      .pipe(source(paths.bundle))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.distJs))
      .pipe(reload({stream: true}));
  }

  bundler.transform(babelify)
  .on('update', rebundle);
  return rebundle();
});

gulp.task('browserify', () => {
  browserify(paths.srcJsx, {debug: true})
  .transform(babelify)
  .bundle()
  .pipe(source(paths.bundle))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(uglify())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.distJs));
});

gulp.task('styles', () => {
  gulp.src(paths.srcCss)
  .pipe(rename({extname: ".css"}))
  .pipe(sourcemaps.init())
  .pipe(postcss([vars, extend, nested, autoprefixer, cssnano]))
  .on('error', notify.onError())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.distCss))
  .pipe(reload({stream: true}));
});

// function handleError(err) {
//   console.log(err.toString());
//   this.emit('end');
// }

gulp.task('htmlReplace', () => {
  gulp.src('src/index.html')
  .pipe(htmlReplace({css: 'styles/main.css', js: 'js/app.js'}))
  .pipe(gulp.dest(paths.dist));
});

gulp.task('images', () => {
  gulp.src(paths.srcImg)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(paths.distImg));
});

gulp.task('bower', () => {
  gulp.src(paths.srcBower,
    {
      base: 'src/bower_components'
    })
    .pipe(gulp.dest(paths.distBower));
});

gulp.task('lint', () => {
  gulp.src(paths.srcLint)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watchTask', () => {
  gulp.watch(paths.srcCss, ['styles']);
  gulp.watch(paths.srcJsx, ['lint']);
  gulp.watch('./src/styles/**/*.less', ['less']);
});

gulp.task('less', function(){
  return gulp.src('./src/styles/bootstrap-config.less')
    .pipe(less())
    .pipe(rename({ basename: "bootstrap", extname: ".min.css" }))
    .pipe(sourcemaps.init())
    .pipe(postcss([cssnano]))
    .on('error', notify.onError())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('deploy', function() {
  return gulp.src(paths.distDeploy)
    .pipe(ghPages());
});

gulp.task('watch', cb => {
  runSequence('clean', ['browserSync', 'watchTask', 'watchify', 'styles', 'less', 'images', 'lint'], cb);
});

gulp.task('build', cb => {
  process.env.NODE_ENV = 'production';
  runSequence('clean', ['browserify', 'styles', 'less', 'htmlReplace', 'bower', 'images'], cb);
});
