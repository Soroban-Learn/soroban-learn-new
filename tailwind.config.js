/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-linear':
          'linear-gradient(150deg, #474747 18.38%, #0F0F0F 136.27%)',
      },
      colors: {
        primary: '#5546FF',
        gray: '#282828',
        'gray-primary': '#7D7D81',
        'dark-gray': '#232323',
        'dark-gray/50': '#23232380',
        'dark-black': '#34324E',
        'light-gray': '#5F5F5F',
        'light-gray2': '#D9D9D9',
        'light-gray3': '#474747',
        'light-gray4': '#C4C4C4',
        'light-gray5': '#757575',
        'black-btn': '#1D1D1D',
        black2: '#0A0A0A',
        black3: '#0F0F0F',
        black4: '#1B1B1B',
        'modal-title': '#262626',
        'border-btn':'#0D1022',

        error: '#c94545',
      },
      height: {
        header: '80px',
        main: 'calc(100vh - 128px)',
      },
      gridTemplateColumns: {
        input: '60px 1fr',
      },
      keyframes: {
        'pop-up': {
          '0%': {
            top: '48%',
            opacity: '0',
          },
          '100%': {
            top: '50%',
            opacity: '1',
          },
        },
      },
      animation: {
        'pop-up': 'pop-up 500ms ease-out forwards',
      },
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1240px',
        '2xl': '1280px',
      },
    },
  },
  plugins: [],
};
