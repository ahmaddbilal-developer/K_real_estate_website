/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0F2A44',
                secondary: '#C9A24D',
                background: '#F8F9FA',
            },
            fontFamily: {
                heading: ['Poppins', 'Montserrat', 'sans-serif'],
                body: ['Inter', 'Roboto', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
