import formPlugin from '@tailwindcss/forms'
import typographyPlugin from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
  content: ['./src/**/*.{jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        // 定义主题色
        primary: colors.pink[500],
      },

      width: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },

  plugins: [formPlugin({ strategy: 'class' }), typographyPlugin({ target: 'legacy' })],
}
export default config
