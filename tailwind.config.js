/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Marble brand colors
        marble: {
          blue: '#144C82',
          'blue-light': '#1a5a99',
          'blue-dark': '#0f3d6a',
        },
        // Text colors
        text: {
          primary: '#141E24',
          secondary: '#5A6872',
          muted: '#8A9BA8',
        },
        // Background colors
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#F8FAFB',
          tertiary: '#F0F4F7',
        },
        // Border colors
        border: {
          DEFAULT: '#E5EAEE',
          light: '#F0F4F7',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['var(--font-crimson)', 'Crimson Text', 'Georgia', 'serif'],
      },
      fontSize: {
        'display': ['7rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-sm': ['5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(20, 30, 36, 0.04), 0 4px 12px rgba(20, 30, 36, 0.04)',
        'card-hover': '0 2px 8px rgba(20, 30, 36, 0.06), 0 8px 24px rgba(20, 30, 36, 0.06)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at top, var(--tw-gradient-stops))',
        'marble-gradient': 'linear-gradient(135deg, rgba(132, 114, 105, 0.05) 0%, rgba(40, 47, 90, 0.05) 100%)',
      },
    },
  },
  plugins: [],
}
