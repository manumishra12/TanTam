/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Crimson & Gold palettedeep festive red + antique gold, matched to
        // the TanTam logo. Warm cream for readable content sections.
        paper: '#F7F0E1', // warm cream content bg
        'paper-2': '#F1E7D2', // alt cream band
        'paper-3': '#EADFC6',
        card: '#FCF8EE',
        ink: '#2C1310', // deep oxblood near-black (text on cream)
        muted: '#7A5C50', // warm taupe
        line: '#E6D8BC', // gold-tinted hairline
        'line-2': '#D8C49C',
        // brand reds
        red: '#7E1D1A',
        'red-deep': '#571210',
        'red-soft': '#A8362C',
        // antique golds
        gold: '#C7A24E',
        'gold-light': '#DDBE74',
        'gold-deep': '#9E7C30',
        cream: '#F3E7C9', // text/lines on red
        // legacy aliases kept so existing classes recolour cleanly
        accent: '#A8362C',
        'accent-deep': '#7E1D1A',
        'accent-soft': '#F0E2C6',
        forest: '#3C4438',
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['"Hanken Grotesk"', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      boxShadow: {
        print: '0 24px 50px -20px rgba(60,40,25,.5), 0 0 0 1px rgba(0,0,0,.04)',
        card: '0 2px 6px rgba(60,40,25,.06)',
        lift: '0 28px 56px -26px rgba(60,40,25,.5)',
        wax: 'inset 0 2px 6px rgba(255,255,255,.18), inset 0 -3px 8px rgba(0,0,0,.4), 0 8px 18px -8px rgba(90,42,46,.6)',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(.22,1,.36,1)',
      },
      keyframes: {
        'scroll-x': { to: { transform: 'translateX(-50%)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        wiggle: { '0%,100%': { transform: 'rotate(-3deg)' }, '50%': { transform: 'rotate(3deg)' } },
      },
      animation: {
        'scroll-x': 'scroll-x 34s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
