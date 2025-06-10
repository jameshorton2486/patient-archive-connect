
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        /* Healthcare Design System Colors */
        
        /* Core Brand Colors */
        'medical-charcoal': 'hsl(var(--medical-charcoal))',
        'pure-white': 'hsl(var(--pure-white))',
        'healthcare-blue': 'hsl(var(--healthcare-blue))',
        'medical-sage': 'hsl(var(--medical-sage))',
        'clinical-gray': 'hsl(var(--clinical-gray))',
        'light-canvas': 'hsl(var(--light-canvas))',
        
        /* Semantic Colors */
        success: {
          DEFAULT: 'hsl(var(--success-primary))',
          hover: 'hsl(var(--success-hover))',
          background: 'hsl(var(--success-background))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning-primary))',
          hover: 'hsl(var(--warning-hover))',
          background: 'hsl(var(--warning-background))',
        },
        error: {
          DEFAULT: 'hsl(var(--error-primary))',
          hover: 'hsl(var(--error-hover))',
          background: 'hsl(var(--error-background))',
        },
        info: {
          DEFAULT: 'hsl(var(--info-primary))',
          hover: 'hsl(var(--info-hover))',
          background: 'hsl(var(--info-background))',
        },
        
        /* Neutral Gradient System */
        neutral: {
          50: 'hsl(var(--neutral-50))',
          100: 'hsl(var(--neutral-100))',
          200: 'hsl(var(--neutral-200))',
          300: 'hsl(var(--neutral-300))',
          400: 'hsl(var(--neutral-400))',
          500: 'hsl(var(--neutral-500))',
          600: 'hsl(var(--neutral-600))',
          700: 'hsl(var(--neutral-700))',
          800: 'hsl(var(--neutral-800))',
          900: 'hsl(var(--neutral-900))',
        },

        /* Existing Shadcn/UI colors mapped to healthcare system */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
