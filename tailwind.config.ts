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
    },
  },

  plugins: [],
}
export default config
