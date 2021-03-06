var gulp = require('gulp'),
    concat = require('gulp-concat'), // 合并文件
    uglify = require('gulp-uglify'), // 压缩JS文件
    rename = require('gulp-rename'), // 重命名文件
    less = require('gulp-less'), // 转换less文件到css
    LessAutoprefix = require('less-plugin-autoprefix'); // 自动添加多浏览器后缀
    autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
    cssmini= require('gulp-minify-css'),
    rev = require('gulp-rev'), // 给文件添加hash后缀
    revcollector = require('gulp-rev-collector'), // 替换带版本号的文件
    htmlminify = require('gulp-html-minify'), // 压缩html
    autoprefixer = require('gulp-autoprefixer'), // 自动添加html5 CSS后缀
    imagemin = require('gulp-imagemin'), // 图片压缩
    pngquant = require('imagemin-pngquant'), //png图片压缩插件
    browserSync = require('browser-sync').create(); //多终端同步刷新

var DEST = 'dest/';

gulp.task('scripts', function() {
    return gulp.src([
        // 'src/js/helpers/*.js',
        'src/js/**/*.js',
      ])
    //   .pipe(concat('custom.js')) // 合并js文件
    //   .pipe(gulp.dest(DEST+'/js'))
    //   .pipe(rename({suffix: '.min'}))
    //   .pipe(uglify()) // JS压缩
      .pipe(gulp.dest(DEST+'/js'))
      .pipe(browserSync.stream());
});

gulp.task('compontents', function() {
    return gulp.src([
        // 'src/js/helpers/*.js',
        'src/compontents/**/*.js',
      ])
    //   .pipe(concat('custom.js')) // 合并js文件
    //   .pipe(gulp.dest(DEST+'/compontents'))
    //   .pipe(rename({suffix: '.min'}))
    //   .pipe(uglify()) // JS压缩
      .pipe(gulp.dest(DEST+'/compontents'))
      .pipe(browserSync.stream());
});

gulp.task('demodata', function() {
    return gulp.src([
        // 'src/js/helpers/*.js',
        'src/compontents/demodata/**/*.json',
      ])
    //   .pipe(concat('custom.js')) // 合并js文件
    //   .pipe(gulp.dest(DEST+'/compontents'))
    //   .pipe(rename({suffix: '.min'}))
    //   .pipe(uglify()) // JS压缩
      .pipe(gulp.dest(DEST+'/compontents/demodata/'))
      .pipe(browserSync.stream());
});

// 压缩html静态文件
gulp.task('html-minify', function() {
    return gulp.src('src/**/*.html')
        //   .pipe(htmlminify())  // html压缩
          .pipe(gulp.dest(DEST))
});

// 合并图标文件
gulp.task('icon', function() {
    return gulp.src('src/icon/*.*')
          .pipe(gulp.dest('dest/css/'))
});

// 合并依赖
gulp.task('lib', function() {
    return gulp.src('lib/**/*.*')
          .pipe(gulp.dest('dest/lib/'))
});

gulp.task('css', function() {
    return gulp.src('src/css/**/*.css')
        //   .pipe(concat('style.css'))
        //   .pipe(less({   // less 编译
        //     plugins: [autoprefix]
        //   }))
          .pipe(gulp.dest('src/css'))
          .pipe(rename({suffix: '.min'}))
        //   .pipe(cssmini())  //CSS压缩
          .pipe(gulp.dest(DEST+'/css'))
          .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './dest/'
        },
        startPath: 'login.html',
        port: 8000
    });
});

gulp.task('imagemin', function () {
    return gulp.src('src/images/**/*')
        // .pipe(imagemin({
        //     progressive: true,
        //     use: [pngquant()] //使用pngquant来压缩png图片
        // }))
        .pipe(gulp.dest(DEST+'/images'));
});

gulp.task('watching', function() {
  // Watch .html files
  gulp.watch('src/**/*.html', ['html-minify'], browserSync.reload);
  // Watch .js files
  gulp.watch('src/**/*.js', ['scripts']);
  gulp.watch('src/compontents/**/*.js', ['compontents']);
  gulp.watch('src/compontents/demodata/**/*.json', ['demodata']);
  // Watch .scss files
  gulp.watch('src/css/**/*.css', ['css']);
  // 图片压缩
  gulp.watch('src/images/**/*.*', ['imagemin']);
});

// Default Task
gulp.task('default', ['imagemin', 'html-minify', 'scripts', 'compontents', 'demodata', 'css', 'icon', 'lib']);

// watch Task
gulp.task('watch', ['browser-sync','watching']);
// gulp.task('watch', ['browser-sync', 'imagemin', 'html-minify', 'scripts', 'compontents', 'demodata', 'css','watch']);