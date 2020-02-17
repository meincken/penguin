var gulp = require("gulp"),
  sass = require("gulp-sass"),
  reload = require("browser-sync").reload(),
  browserSync = require("browser-sync").create();

sass.compiler = require("node-sass");

gulp.task("sass", function() {
  return gulp
    .src("./src/assets/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./src/assets/css"));
});

gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "./src/"
    }
  });

  browserSync.watch("./src/").on("change", browserSync.reload);
});

gulp.task("run", gulp.parallel("browserSync", gulp.series("sass")));

gulp.task("watch", function() {
  gulp.watch("./src/assets/scss/*.scss", gulp.series("sass"));
});

gulp.task("default", gulp.parallel("watch", "run"));
