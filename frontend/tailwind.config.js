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

