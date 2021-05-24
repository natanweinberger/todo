module.exports = {
    purge: ['./pages/**/*.{js}', './components/**/*.{js}'],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                antique: '#FBFBFB',
                umber: '#7C6354',
            },
        },
    },
    variants: {
        extend: {
            visibility: ['group-hover'],
            cursor: ['hover'],
            fill: ['hover'],
            backgroundColor: ['active'],
            opacity: ['active'],
        },
    },
    plugins: [],
}
