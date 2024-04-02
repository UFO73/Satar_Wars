module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        neon: {
          from: {
            boxShadow: '0 0 1px rgb(255, 232, 31), 0 0 2px rgb(255, 232, 31), 0 0 3px rgb(255, 232, 31), 0 0 4px rgb(255, 232, 31), 0 0 5px rgb(255, 232, 31), 0 0 6px rgb(255, 232, 31), 0 0 7px rgb(255, 232, 31)',
          },
          to: {
            boxShadow: '0 0 1px rgb(255, 232, 31), 0 0 2px rgb(255, 232, 31), 0 0 3px rgb(255, 232, 31), 0 0 4px rgb(255, 232, 31), 0 0 5px rgb(255, 232, 31), 0 0 6px rgb(255, 232, 31), 0 0 7px rgb(255, 232, 31)',
          },
        },
      },
      animation: {
        neon: 'neon 1s infinite alternate',
      },
      colors: {
        yellow: {
          500: 'rgb(255, 232, 31)',
          '500-alpha': 'rgba(255, 232, 31, 0.5)',
        },
        gray: {
          800: 'rgb(40, 40, 40)',
          500: 'rgba(0, 0, 0, 0.8)',
          300: 'rgba(255, 255, 255, 0.3)',
        },
      },
    },
  },
  plugins: [],
};
