/** @type {import('tailwindcss').Config} */

module.exports = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './app/**/*.{js,jsx}',
        './src/**/*.{js,jsx}',
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        fontFamily: {
            quicksand: ['Quicksand', 'sans-serif'],
        },

        extend: {
            fontSize: {
                14: '14px',
                headingSize: '45px',
                'xs': ['0.75rem', { lineHeight: '1rem' }],
                'sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'base': ['1rem', { lineHeight: '1.5rem' }],
                'lg': ['1.125rem', { lineHeight: '1.75rem' }],
                'xl': ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
            },
            colors: {
                'validus-red': '#A3020C',
                'validus-sub-title': '#5B616F',
                'validus-blue': '#113293',
                'validus-grey': '#A0A7B0',
                'validus-bg': '#F7F8FA',
                'grey-border': '#e5e7eb',
                'validus-sidebar': '#1C2536',
                'sub-header': '#7F8797',
                'pending': '#C9B72F',
                'rejected': '#D55757',
                'processing': '#C9892F',
                'completed': '#13903D',
                'approved': '#2A8C0F',
                'title': '#969BA9',
                'otp-input': '#f3f3f3',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                }
            },
            backgroundColor: {
                'validus-red': '#A3020C',
                'validus-sub-title': '#5B616F',
                'validus-blue': '#113293',
                'validus-grey': '#A0A7B0',
                'validus-bg': '#F7F8FA',
                'validus-sidebar': '#1C2536',
                'main-bg': '#FAFBFB',
                'main-dark-bg': '#20232A',
                'secondary-dark-bg': '#33373E',
                'light-gray': '#F7F7F7',
                'half-transparent': 'rgba(0, 0, 0, 0.5)',
                'validus-blue-bg-1': '#002060',
                'validus-blue-bg-2': '#B3C6E7',
                'mid-blue': '#4e76e1',
                'highlight': '#fdff32',
                'excel-green': 'rgb(58,112,73)',
                'grey-border': '#e5e7eb',
                'sub-header': '#7F8797',
                'pending': '#C9B72F',
                'rejected': '#D55757',
                'processing': '#C9892F',
                'completed': '#13903D',
                'approved': '#2A8C0F',
                'title': '#969BA9',
            },
            scrollbarWidth: {
                'none': 'none',
                'thin': 'thin',
                'medium': 'medium',
                'thick': 'thick',
            },
            borderWidth: {
                1: '1px',
            },
            borderColor: {
                color: 'rgba(0, 0, 0, 0.1)',
            },
            width: {
                200: '200',
                400: '400px',
                500: '500px',
                760: '760px',
                780: '780px',
                800: '800px',
                1000: '1000px',
                1200: '1200px',
                1400: '1400px',
                '75p': '75%',
                '90p': '90%',
                '80p': '80%',
                '70p': '70%',
                '60p': '60%',
            },
            height: {
                80: '80px',
            },
            minHeight: {
                590: '590px',
            },
            backgroundImage: {
                'hero-pattern':
                    "url('https://demos.wrappixel.com/premium-admin-templates/react/flexy-react/main/static/media/welcome-bg-2x-svg.25338f53.svg')",
            },
            blur: {
                verySmall: '2px',
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
                modern: "6px",
            },
            screens: {
                sm: '640px',   // small
                md: '768px',   // medium
                lg: '1024px',  // large
                xl: '1280px',  // extra large
            },
            keyframes: {
                'accordion-down': {
                    from: {
                        height: '0'
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)'
                    }
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)'
                    },
                    to: {
                        height: '0'
                    }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            }
        },

    },
    plugins: [],
};
