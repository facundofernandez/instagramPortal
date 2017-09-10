var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    rename        = require('gulp-rename');
    browserSync   = require('browser-sync').create(),
    reload        = browserSync.reload;

gulp.task('server', function(){
    browserSync.init({
      server: "./",
      port: 3000
    });

    gulp.watch("*.html").on('change', reload);
    gulp.watch("**/*.js").on('change', reload);
    gulp.watch('sass/*.*',['sass']);
});

/* Tarea html */
gulp.task('html',function(){
    var stream = gulp.src([ '*.html'])
    .pipe(gulp.dest( 'dist' ))
    .pipe(browserSync.stream());

    return stream;
});

gulp.task('sass',function(){
    let stream = gulp.src('sass/main.scss')
        .pipe( sass().on('error', sass.logError ) )
        .pipe( autoprefixer( 'last 2 version' ) )
        .pipe(rename('style.css'))
        .pipe(gulp.dest('.'))
        .pipe(browserSync.stream());

    return stream;
})

gulp.task('default', ['sass','server']);
