const gulp=require('gulp');
const watch=require('gulp-watch');
const minihtml=require('gulp-minify-html');
const  minicss=require('gulp-minify-css');
const  uglify=require('gulp-uglify');
const  babel=require('gulp-babel');
const  es2005=require('babel-preset-es2015');



gulp.task('simplifyhtml',()=>{
    return gulp.src('src/*.html')
    .pipe(minihtml())
    .pipe(gulp.dest('dist/'));
})

gulp.task('simplifycss',()=>{
    return gulp.src('src/css/*.css')
    .pipe(minicss())
    .pipe(gulp.dest('dist/css/'));
})

gulp.task('minijs',()=>{
    return gulp.src('src/script/js/*.js')
    .pipe(babel({
        presets:['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
})
// gulp.task('babeljs', () => {
//     return gulp.src('src/script/js/*.js')//引入文件
//         .pipe(babel({
//             presets: ['es2015']
//         }))//执行压缩插件
//         .pipe(gulp.dest('dist/js'));//输出
// });