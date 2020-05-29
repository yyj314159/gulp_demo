var gulp = require('gulp')
var uglify = require('gulp-uglify')
var revCollector = require('gulp-rev-collector')
var rev = require('gulp-rev')
var htmlmin = require('gulp-htmlmin')
var del = require('del')
//js压缩
gulp.task('js', function () {
  return gulp
    .src('./src/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./build'))
    .pipe(rev.manifest('rev-js-manifest.json'))
    .pipe(gulp.dest('./buils'))
})

//css压缩
var autoprefix = require('gulp-autoprefixer') //兼容处理
var minifyCss = require('gulp-minify-css') //压缩
gulp.task('style', function () {
  return gulp
    .src('./src/*.css')
    .pipe(
      autoprefix({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false,
      })
    )
    .pipe(minifyCss())
    .pipe(rev())
    .pipe(gulp.dest('./build'))
    .pipe(rev.manifest('rev-css-manifest.json'))
    .pipe(gulp.dest('./buils'))
})
//img
gulp.task('images', function () {
  return gulp
    .src('./src/img/*.png')
    .pipe(rev())
    .pipe(gulp.dest('./build/img'))
    .pipe(rev.manifest('rev-images-manifest.json'))
    .pipe(gulp.dest('./buils/img'))
})
//html
gulp.task('revHtml', function () {
  var options = {
    removeComments: true, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
    collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
    minifyJS: true, //压缩页面JS
    babel: true,
    minifyCSS: true, //压缩页面CSS
  }
  return gulp
    .src('./src/*.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest('./build'))
})

gulp.task('revimg', function () {
  //css，主要是针对img替换
  return gulp
    .src(['./build/**/rev-images-manifest.json', './build/*.css'])
    .pipe(
      revCollector({
        replaceReved: true,
      })
    )
    .pipe(gulp.dest('./build'))
})
gulp.task('revjs', function () {
  //css，主要是针对img替换
  return gulp
    .src(['./build/**/rev-images-manifest.json', './build/*.js'])
    .pipe(
      revCollector({
        replaceReved: true,
        dirReplacements: {
          './img': './build/img',
        },
      })
    )
    .pipe(gulp.dest('./build'))
})

//使用rev替换成md5文件名，这里包括html和css的资源文件也一起
gulp.task('rev', function () {
  //html，针对js,css,img
  return gulp
    .src(['./build/**/*.json', './*.html'])
    .pipe(
      revCollector({
        replaceReved: true,
      })
    )
    .pipe(gulp.dest('./build'))
})

//删除Build文件
gulp.task('clean:Build', function () {
  return del(['./build/**/'])
})
gulp.task(
  'default',
  gulp.series(
    'clean:Build',
    gulp.parallel('js', 'images', 'style'),
    'revimg',
    'revjs',
    'rev',
    function (done) {
      done()
    }
  )
)
