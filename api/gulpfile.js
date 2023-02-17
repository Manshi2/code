const { src, dest, series, parallel, task } = require('gulp');
const fs   = require('fs');
const zip = require('gulp-zip');
const log = require('fancy-log');
const webpack_stream = require('webpack-stream');
const webpack_config = require('./webpack.config.js');
const { setEnvironmentData } = require('worker_threads');
var exec = require('child_process').exec;
const generateSitemap = require("./scripts/sitemap-builder.js")
// const {deleteSync} = require('del')

const p = {
  "name": "carenest",
  "version": "1.0.0",
  "description": "Carenest",
  "main": "./api/api.bundle.js",
  "scripts": {
    "start": "./api/api.bundle.js"
  },
  "type": "commonjs",
  "author": "siddiquiaffan",
  "license": "ISC",
  "dependencies": { },
  "devDependencies": { }
}

const zipped_file_name = process.argv[2] || 'carenest-0.0.5.zip'

const paths = {
  prod_build: '../carenest-production',
  server_file_name: 'api.bundle.js',
  react_src: '../frontend/build/**/*',
  react_dist: '../carenest-production/frontend/build',
  zipped_file_name
};

async function clean()  {
  log('removing the old files in the directory')
  const {deleteSync} = await import ('del');
  return deleteSync(['../carenest-production/api', '../carenest-production/frontend', '../carenest-production/*.zip'], {force:true});
}

function generateSitemapTask() {
  return generateSitemap()  
}

function createProdBuildFolder() {

  const dir = paths.prod_build;
  log(`Creating the folder if not exist  ${dir}`)
  if(!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    log('📁  folder created:', dir);
  }

  // log('Creating package.json file')
  // fs.writeFileSync(paths.prod_build + '/package.json', JSON.stringify(p))

  return Promise.resolve('');
  // src(`./credentials/**`)
  //       .pipe(dest(`${paths.prod_build}/credentials`));
}

function buildReactCodeTask(cb) {
  log('building React code into the directory')
  return exec('cd ../frontend && npm run build', function (err, stdout, stderr) {
    log(stdout);
    log(stderr);
    cb(err);
  })
}

function copyReactCodeTask() {
  log('copying React code into the directory')
  return src(`${paths.react_src}`)
        .pipe(dest(`${paths.react_dist}`));
}

function buildNodeJSCodeTask(cb){
  log('building nodejs code into the directory')
  if(fs.existsSync('./dist/api.bundle.js')){
    fs.unlinkSync('./dist/api.bundle.js')
  }

  return exec('npm run build', function (err, stdout, stderr) {
    log(stdout);
    log(stderr);
    cb(err);
  })
}

function copyNodeJSCodeTask() {
  log('copying server code into the directory')
  return src(`./dist/api.bundle.js`)
  .pipe(dest(`${paths.prod_build}/api`));
}

function createProcfileTask() {
  log('Creating procfile...');
  fs.writeFileSync(`./Procfile`, 'web: node api/api.bundle.js')
  return src(`./Procfile`)
  .pipe(dest(`${paths.prod_build}`));
}

function zippingTask() {
  log('zipping the code ')
  let zipFileName = 'carenest-production.zip'
  let i = process.argv.indexOf(process.argv.filter(x => x == '--fname')[0])
  if(i != -1 && process.argv[i+1]) zipFileName = process.argv[i+1]

  return src(`${paths.prod_build}/**`)
      .pipe(zip(`${zipFileName}`))
      .pipe(dest(`${paths.prod_build}`))
}

exports.default = series(
  clean,
  generateSitemapTask,
  createProdBuildFolder,
  parallel(buildReactCodeTask, buildNodeJSCodeTask),
  parallel(copyReactCodeTask, copyNodeJSCodeTask),
  createProcfileTask,
  zippingTask
);