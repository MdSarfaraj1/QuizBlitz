/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html","./src/**/*.{html,jsx,js}"],
safelist: [
  {
    pattern: /(from|to)-(blue|green|pink|yellow|indigo|purple|teal|red|orange|cyan|lime|violet|emerald|sky|amber|slate|fuchsia|rose|gray)-(400|500|600|700)/,
  },
],

  theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
    extend: {
		fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
		colors:{
			'myColour':'#7552e0',
			    'quizDashboard-primary': '#8B5CF6',
				'quizDashboard-secondary': '#7E69AB',
				'quizDashboard-accent': '#F97316',
				'quizDashboard-neutral': '#8E9196',
				'quizDashboard-soft-bg': '#F1F0FB',
				'muted-foreground': '#6B7280',
		},
	},
  },
  plugins: [],
}

