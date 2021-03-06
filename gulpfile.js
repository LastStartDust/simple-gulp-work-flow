// 引入gulp插件
const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const changed = require('gulp-changed');
const autoprefixer = require('autoprefixer');
const pxtorpx = require('postcss-px2units');
const clean = require('gulp-clean');
const runSequence = require('run-sequence')

// 编译样式
gulp.task('compile:style',function(){
  gulp
    .src(['src/**/**/*.scss'], { base: 'src' })
    .pipe(replace(/\@(import\s[^@;]*)+(;import |\bimport |;|\b)?/g, ($1) => {
      let isMixin = config.filter(item => $1.indexof(item) > -1);
      if (isMixin.length == 0) {
        return `\/*T${$1}T*\/`
      } else {
        return $1
      }
    }))
    .pipe(sass()
      .on('error', sass.logError))
    .pipe(postcss([ autoprefixer(), pxtorpx()]))
    .pipe(
      rename(function(path){
        path.extname = '.wxss';
      })
    )
    .pipe(changed('dist'))
    .pipe(replace(/.scss/g, '.wxss'))
    .pipe(replace(/\/\*T(@import\s[^@;]*;)?(T\*\/)/g, '$1'))
    .pipe(gulp.dest('dist'));
});

// 拷贝页面 
gulp.task('compile:pages', function(){
  gulp
  .src(
    [
      'src/**',
      '!src/**/**/**/*.scss'
    ],
    { base: 'src'}
  )
  .pipe(changed('dist'))
  .pipe(gulp.dest('dist'));
});

// 实时监测
gulp.task('watch',function(){
  gulp.watch('src/**', ['compile:style','compile:pages']);
});

// clean 任务, 情况dist目录下的内容，不删该目录
gulp.task("clean", function () {
  return gulp.src('./dist/*', {
      read: false
  })
  .pipe(clean({force: true}));
})

// 微信小程序编译
gulp.task('default', ['clean'], function () {
  runSequence('watch', 'compile:style', 'compile:pages')
});

