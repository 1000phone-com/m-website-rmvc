const { src, dest, series, parallel, task } = require('gulp');
const webServer = require('gulp-webserver');
const webpackStream = require('webpack-stream')
const sass = require("gulp-sass");
const clean = require("gulp-clean");
const watch = require('gulp-watch');
var path = require('path');


//拷贝html
function copyHtml() {
  return src("./src/*.html")
    .pipe(dest('./dev/'))
}

// function copyJs() {
//   return src("./src/js/*.js")
//     .pipe(dest('./dev/js/'))
// }

function gulpServer() {
  return src('./dev/')
    .pipe(webServer({
      livereload: true,
      // directoryListing: true,
      open: true
    }))
}

function cleanFile(target) {
  return src(target)
    .pipe(clean({ force: true }));
}

function compileCSS() {
  return src('./src/style/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./dev/css/'))
}

function compileJs() {
  return src('./src/js/app.js')
    .pipe(webpackStream({
      mode: 'development',
      entry: {
        app: './src/js/app.js'
      },
      output: {
        filename: "[name].js",
        path: path.resolve(__dirname, './dev/js/')
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/transform-runtime']
              }
            }
          }
        ]
      }

    }))
    .pipe(dest('./dev/js/'));
}

function watchFill() {
  watch(['./src/*.html'], function () {
    copyHtml();
    console.log('copy html')
  })

  watch('./src/style/app.scss', {}, function () {
    console.log('compile css')
    cleanFile('./dev/css/');
    compileCSS();
  })

  watch(['./src/js/*js', './src/js/**/*.js'], function () {
    compileJs();
    console.log('compile js')
  })

}


exports.default = series(parallel([copyHtml, compileJs, compileCSS]), gulpServer, watchFill);