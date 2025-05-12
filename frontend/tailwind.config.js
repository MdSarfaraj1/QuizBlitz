/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html","./src/**/*.{html,jsx,js}"],
  theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
    extend: {
		colors:{
			'myColour':'#7552e0'
		}
	},
  },
  plugins: [],
}

