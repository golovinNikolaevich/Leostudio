var gulp 				= require('gulp'),
		sass 				= require('gulp-sass'),
    browserSync = require('browser-sync'),// Подключаем Browser Sync
    cssmin 			= require('gulp-cssmin');



gulp.task('sass', function(){
  return gulp.src('app/sass/**/*.sass') // Берем все sass файлы из папки sass и дочерних, если таковые будут
    .pipe(sass())
    .pipe(cssmin())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true})) // Обновляем css на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});


gulp.task('watch', ['browser-sync', 'sass'], function(){
	gulp.watch('app/sass/*sass', ['sass']); // Наблюдение за sass файлами
	gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
	// Наблюдение за другими фалйами
});