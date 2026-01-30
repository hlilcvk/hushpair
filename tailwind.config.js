module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B0D10',
        surface: '#11151B',
        primaryText: '#EAF0F7',
        secondaryText: '#A9B4C2',
        accentPurple: '#6B5CFF',
        accentMint: '#00E5A8'
      },
      fontFamily: {
        heading: ['Space Grotesk','ui-sans-serif','system-ui'],
        body: ['Inter','ui-sans-serif','system-ui']
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '220': '220ms'
      }
    }
  },
  plugins: []
}
