/**
 * Created by iulian on 24/07/16.
 */
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var gulpMocha = require('gulp-mocha');
var env = require('gulp-env');
var supertest = require('supertest');
var apidoc = require('gulp-apidoc');


gulp.task('default', function(){
   nodemon({
       script: 'app.js',
       ext: '*.js',
       env: {
           PORT: 8000,
       },
       ignore:["./node_modules/**", "./documentation/**"]
   }).on('restart', function(){
        console.log('Restarting');
    });
});

gulp.task('test', function(){
    env({vars:{
        ENV: 'Test'
    }});
    gulp.src('tests/*.js', {read:false})
        .pipe(gulpMocha({reporter: 'nyan'}))
});

gulp.task('apidoc', function(done){
          apidoc({
            src: "./controllers",
            dest: "./documentation",
            options: {
              excludeFilters: [ "node_modules" ]
            },
            debug:false
          },done);
});
