module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: '#twRoot',
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif']
    },
    fontSize: {
      xxs: ['0.75rem', { lineHeight: '1rem' }],
      xs: ['0.875rem', { lineHeight: '1.125rem' }],
      s: ['0.938rem', { lineHeight: '1.25rem' }],
      m: ['1rem', { lineHeight: '1.313rem' }],
      l: ['1.125rem', { lineHeight: '1.438rem' }],
      xl: ['1.25rem', { lineHeight: '1.625rem' }],
      xxl: ['1.5rem', { lineHeight: '1.938rem' }],
      xxxl: ['1.75rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }]
    },
    extend: {
      colors: {
        gray: {
          25: '#f9fcff',
          50: '#f9fafb',
          100: '#f2f4f7',
          200: '#eaecf0',
          300: '#d0d5dd',
          400: '#98a2b3',
          500: '#667085',
          600: '#475467',
          700: '#344054',
          800: '#1d2939',
          900: '#101828',
          950: '#0f1828'
        },
        red: {
          25: '#fffbfa',
          50: '#fef3f2',
          100: '#fee4e2',
          200: '#fecdca',
          300: '#fda29b',
          400: '#f97066',
          500: '#f04438',
          600: '#d92d20',
          700: '#b42318',
          800: '#912018',
          900: '#7a271a'
        },
        orange: {
          25: '#fffcf5',
          50: '#fffaeb',
          100: '#fef0c7',
          200: '#fedf89',
          300: '#f9cc58',
          400: '#f3ba1e',
          500: '#f5a406',
          600: '#dc6803',
          700: '#b54708',
          800: '#93379d',
          900: '#7a2e0e'
        },
        green: {
          25: '#f6fef9',
          50: '#ecfdf9',
          100: '#d1fadf',
          200: '#a6f4c5',
          300: '#6ce9a6',
          400: '#32d583',
          500: '#12b76a',
          600: '#039855',
          700: '#027a48',
          800: '#05603a',
          900: '#054f31'
        },
        rose: {
          25: '#fef6fb',
          50: '#fdf2fa',
          100: '#fce7f6',
          200: '#fcceee',
          300: '#faa7e0',
          400: '#f670c7',
          500: '#ee46bc',
          600: '#dd2590',
          700: '#c11574',
          800: '#9e165f',
          900: '#851651'
        },
        blue: {
          25: '#f5fbff',
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9e6fe',
          300: '#7cd4fd',
          400: '#36bffa',
          500: '#0ba5ec',
          600: '#0086c9',
          700: '#026aa2',
          800: '#065986',
          900: '#0b4a6f'
        },
        purple: {
          25: '#fafaff',
          50: '#f4f3ff',
          100: '#ebe9fe',
          200: '#d9d6fe',
          300: '#bdb4fe',
          400: '#9b8afb',
          500: '#7a5af8',
          600: '#6939ef',
          700: '#5925dc',
          800: '#4a1fb8',
          900: '#3e1c96'
        }
      },
      boxShadow: {
        1: '0px -1px 8px rgba(90, 84, 84, 0.05), -2px 100px 100px -70px rgba(88, 92, 98, 0.15)',
        card: '-2px 20px 50px -10px rgba(88, 92, 98, 0.12)',
        tabs: '0px 2px 6px rgba(36, 51, 47, 0.11)',
        btn: '0px 5px 8px rgba(120, 176, 163, 0.25)',
        sidebar: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)'
      },
      borderRadius: {
        circle: '50%'
      },
      lineHeight: {
        zero: '0'
      }
    }
  }
};
