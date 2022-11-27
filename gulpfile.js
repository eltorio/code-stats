const licenseMini = `© 2022 Ronan LE MEILLAT for Internal use`;
const licenseTxt = `=========================================================
* ${licenseMini}
=========================================================
This is based on an original idea of:
- https://github.com/cb372/line-count (public domain)`;

const licenseJS = `/*!
${licenseTxt}
*/`;
const licenseHTML = `<!--
${licenseTxt}
-->`;

import gulp from "gulp";
import gap from "gulp-append-prepend";
import noop from "gulp-noop";
import gulpif from "gulp-if";

const conditionAlreadyHaveLicense = function (file) {
  // here file is a vinyl file
  const match = file.contents.toString().match(licenseMini);
  let ret = true
  if (match !== null) {
    //console.log(`Exclude ${file.path} ${match[0] === licenseMini}`)
    return match[0] === licenseMini;
  } else {
    console.log(`No license in ${file.path}`)
    return false;
  }
};

gulp.task("licensesSrc", async function () {
  // this is to add Copyright ifor the source js
  gulp
    .src(
      [
        "*.cjs",
        "*.js",
        "*.ts",
        "src/**/*.js",
        "functions/**/*.js",
        "functions/**/*.ts",
        "src/**/*.ts",
      ],
      { base: "./" }
    )
    .pipe(gulpif(conditionAlreadyHaveLicense,noop(),gap.prependText(licenseJS)))
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Copyright for the source html
  gulp.src("src/**/*.vue", { base: "./" })
  .pipe(gulpif(conditionAlreadyHaveLicense,noop(),gap.prependText(licenseHTML)))
  .pipe(gulp.dest("./", { overwrite: true }));
});

gulp.task("licenses", async function () {
  // this is to add Copyright in the production mode for the minified js
  gulp
    .src("dist/**/*.js", { base: "./" })
    .pipe(gap.prependText(licenseJS))
    .pipe(gulp.dest("./", { overwrite: true }));
  // this is to add Copyright in the production mode for the minified html
  gulp
    .src("dist/index.html", { base: "./" })
    .pipe(gap.prependText(licenseHTML))
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Copyright in the production mode for the minified css
  gulp
    .src("dist/css/*.css", { base: "./" })
    .pipe(gap.prependText(licenseJS))
    .pipe(gulp.dest("./", { overwrite: true }));
  return;
});
