const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    entry: {
        app: ['./static/base/js/base.js', './static/base/js/Utils.ts'],
        base: ['./static/base/js/base.js'],
        home: ['./static/home/js/home.js', './static/schedule/js/Clock.ts'],
        resume: ['./static/resume/js/resume.ts'],
        allergies: ['./static/allergies/js/allergies.js'],
        blog: ['./static/blog/js/blog.js'],
        post_detail: ['./static/blog/js/blog.js'],
        jwst: ['./static/jwst/js/jwst.js'],
        mtg: ['./static/mtg/js/mtg.js'],
        plot: ['./static/orbiter/js/orbiter.js'],
        schedule: ['./static/schedule/js/scheduler.js', './static/schedule/js/Clock.ts', './static/schedule/js/Schedule.ts', './static/schedule/js/Period.ts'],
        iss: ['./static/iss/js/iss.js'],
        weather: [
            './static/weather/js/ElementTile.ts',
            './static/weather/js/Elements.ts',
            './static/weather/js/Celestial.ts',
            './static/weather/js/Current.ts',
            './static/weather/js/Daily.ts',
            './static/weather/js/Hourly.ts',
            './static/weather/js/Weather.ts',
            './static/weather/js/weather_home.js',
            './static/weather/js/WMap.ts',
            './static/weather/js/AQI.ts',
            './static/weather/js/Clouds.ts',
            './static/weather/js/Sun.ts',
            './static/weather/js/Moon.ts',
            './static/weather/js/Precipitation.ts',
            './static/weather/js/Wind.ts',
            './static/weather/js/Humidity.ts',
            './static/weather/js/Barometer.ts',
        ],
        wedding: ['./static/wedding/js/wedding_home.js'],
        wedding_base: ['./static/wedding/js/wedding_base.js'],
        our_story: ['./static/wedding/js/ourstory.js'],
        webgl: ['./static/webgl/js/WebGL.ts', './static/webgl/js/webbers.js', './static/webgl/js/init-buffers.js', './static/webgl/js/draw-scene.js'],
        ai: ['./static/ai/js/chat.js'],
        cookbook: ['./static/cookbook/js/cooky.ts', './static/cookbook/js/cookbook.ts', './static/cookbook/js/Recipe.ts'],
        sports: ['./static/sports/js/sports.ts', './static/sports/js/SportsWidgets.ts', './static/sports/js/team.ts'],
    },
    mode: 'development',
    cache: false,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: ['node_modules'],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './static/dist'),
        clean: true,
    },
    plugins: [
        new BundleTracker({
            path: __dirname,
            filename: 'webpack-stats.tson'
        }),
    ],
    externals: {
        'leaflet': 'L',
    },
};