var gulp = require('gulp');
var stubby = require('gulp-stubby-server');

gulp.task('stubby', function(cb) {
    var options = {
        stubs: 3000,
        tls: 8443,
        admin: 8010,
        mute: false,
        location: '0.0.0.0',
        files: ['mocks/**/*.{json,yaml,js}']
    };
    stubby(options, cb);
});