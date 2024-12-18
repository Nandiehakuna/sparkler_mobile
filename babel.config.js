module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module:react-native-dotenv',
            {
                moduleName: '@env',
                path: '.env',
                blocklist: null,
                allowlist: null,
                safe: false,
                allowUndefined: true,
            },
        ],
        [
            '@babel/plugin-transform-class-properties',
            {
                loose: true,
            },
        ],
        [
            '@babel/plugin-transform-private-methods',
            {
                loose: true,
            },
        ],
        [
            '@babel/plugin-transform-private-property-in-object',
            {
                loose: true,
            },
        ],
        [
            'module-resolver',
            {
                extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', '.svg'],
            },
        ],
        'react-native-reanimated/plugin', // has to be listed last
    ],
};
