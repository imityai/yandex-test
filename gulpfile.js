const gulp = require('gulp');
const { src, dest } = require('gulp');
const sharp = require('gulp-sharp-responsive');

//Tasks

require('./gulp/dev.js');
require('./gulp/docs.js');

gulp.task('default', gulp.series(
	'clean:dev',
	gulp.parallel('html:dev', 'sass:dev', 'images:dev', 'copyFonts:dev', 'copyFiles:dev', 'js:dev'),
	gulp.parallel('server:dev', 'watch:dev')
));

gulp.task('docs', gulp.series(
	'clean:docs',
	gulp.parallel('html:docs', 'sass:docs', 'images:docs', 'copyFonts:docs', 'copyFiles:docs', 'js:docs'),
	gulp.parallel('server:docs')
));


const optimizeRaster = () => {
	
  function createOptionsFormat() {
    const formats = [];

    for (const format of [undefined, 'webp']) {
      for (let density = 2; density > 0; density--) {
        formats.push(
          {
            format,
            rename: { suffix: `@${density}x` },
            width: ({ width }) => Math.ceil(width * density / 2),
            jpegOptions: { progressive: true },
          },
        );
      }
    }

    return { formats };
  }

  return src(`./raw/img/**/*.{png,jpg,jpeg}`)
    .pipe(sharp(createOptionsFormat()))
    .pipe(dest(`./src/img`));
}
exports.optimizeRaster = optimizeRaster;