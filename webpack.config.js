const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    entry: {
        app: ['./static/base/js/base.js'],
        base: ['./static/base/js/base.js'],
        home: ['./static/webgl/js/WebGL.ts','./static/home/js/home.js'],
        resume: ['./static/resume/js/resume.ts'],
        allergies: ['./static/allergies/js/allergies.js'],
        blog: ['./static/blog/js/blog.js'],
        post_detail: ['./static/blog/js/blog.js'],
        jwst: ['./static/jwst/js/jwst.js'],
        mtg: ['./static/mtg/js/mtg.js'],
        plot: ['./static/orbiter/js/orbiter.js'],
        schedule: ['./static/schedule/js/scheduler.js'],
        iss: ['./static/iss/js/iss.js'],
        weather: ['./static/weather/js/weather_home.js',],
        wedding: ['./static/wedding/js/wedding_home.js'],
        wedding_base: ['./static/wedding/js/wedding_base.js'],
        our_story: ['./static/wedding/js/ourstory.js'],
        webgl: ['./static/webgl/js/webgl-tutorial.js'],
        ai: ['./static/ai/js/chat_main.ts'],
        cookbook: ['./static/cookbook/js/cooky.ts'],
        sports: [
            './static/sports/js/sports.ts',
            './static/sports/js/team.ts',
        ],
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