/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        adred:'#b91c1c'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

