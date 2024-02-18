/**
 * @name NextProgressBar
 * @description
 * @author darcrand
 */

'use client'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import colors from 'tailwindcss/colors'

export default function NextProgressBar() {
  return <ProgressBar height='4px' color={colors.pink[500]} options={{ showSpinner: false }} shallowRouting />
}
