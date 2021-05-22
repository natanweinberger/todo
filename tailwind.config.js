module.exports = {
    purge: ['./pages/**/*.{js}', './components/**/*.{js}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                amber: '#5f27cd',
            },
        },
    },
    variants: {
        extend: {
            visibility: ['group-hover'],
            cursor: ['hover'],
            fill: ['hover'],
            backgroundColor: ['active'],
        },
    },
    plugins: [],
}
