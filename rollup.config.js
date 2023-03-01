import terser from '@rollup/plugin-terser';

/**@type{import(./node_modules/rollup/)} */
export default {
    input: 'src/pages/home.js',
    output: [
        {
            file: 'hidden-src/pages/home.min.js',
            format: 'iife',
            name: 'version',
            plugins: [terser()],
        },
    ],
};
