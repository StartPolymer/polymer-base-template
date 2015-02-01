/*global -$ */
'use strict';

// GitHub Pages
var ghPagesOrigin = 'origin';
var ghPagesBranch = 'gh-pages';

// PageSpeed Insights
var pageSpeedSite = 'https://startpolymer.org'; // change it
var pageSpeedStrategy = 'mobile'; // desktop
var pageSpeedKey = ''; // nokey is true

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var pageSpeed = require('psi');

gulp.task('styles', function () {
  //return gulp.src([
  //    'app/styles/main.scss',
  //    'app/elements/**/*.scss'
  //  ])
    /*.pipe($.sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: ['.'],
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.rubySass({
    style: 'expanded',
    precision: 10,
    loadPath: ['.'],
      sourcemapPath: '.'
    }))*/
    return $.rubySass('app/styles/main.scss', {
      style: 'expanded',
      precision: 10,
      loadPath: ['.']
      //sourcemap: true
    })
    .on('error', function (err) { console.log(err.message); })
    //.pipe(sourcemaps.write())
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 2 versions']})
    ]))
    .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('html', ['styles'], function () {
  var assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

  return gulp.src('app/*.html')
    .pipe($.htmlReplace({
      vulcanized: {
        src: 'elements/elements.vulcanized.html',
        tpl: '<link rel="import" href="%s">'
      }
    }))
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    //.pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('vulcanize', function () {
  return gulp.src('app/elements/elements.html')
    .pipe($.vulcanize({
      dest: 'dist',
      strip: true
    }))
    .pipe($.rename("elements/elements.vulcanized.html"))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'fonts'], function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  // watch for changes
  gulp.watch([
    'app/*.html',
    'app/elements/**/*.html',
    '.tmp/styles/**/*.css',
    '.tmp/elements/**/*.css',
    'app/scripts/**/*.js',
    'app/elements/**/*.js',
    'app/images/**/*'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.scss', ['styles', reload]);
  gulp.watch('app/elements/**/*.scss', ['styles', reload]);
  gulp.watch('bower.json', ['wiredep', 'fonts', reload]);
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});


// Deploy to GitHub Pages
gulp.task('deploy', function () {
    return gulp.src('dist/**/*')
        .pipe($.ghPages({
          origin: ghPagesOrigin,
          branch: ghPagesBranch
        }));
});


// Run PageSpeed Insights
// Please feel free to use the `nokey` option to try out PageSpeed
// Insights as part of your build process. For more frequent use,
// we recommend registering for your own API key. For more info:
// https://developers.google.com/speed/docs/insights/v1/getting_started
gulp.task('pagespeed', function () {
  return pageSpeed(pageSpeedSite, {
    nokey: 'true',
    // key: pageSpeedKey,
    strategy: pageSpeedStrategy
  }, function (err, data) {
    console.log('Site: ' + pageSpeedSite);
    console.log('Strategy: ' + pageSpeedStrategy);
    if (err) {
      console.log(err);
    } else {
      console.log('Score: ' + data.score);
      console.log(data.pageStats);
    }
  });
});


gulp.task('build', ['jshint', 'html', 'vulcanize', 'images', 'fonts', 'extras'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
