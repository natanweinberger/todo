module.exports = {
    purge: ['./pages/**/*.{js}', './components/**/*.{js}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {
            visibility: ['group-hover'],
            cursor: ['hover']
        },
    },
    plugins: [],
};
