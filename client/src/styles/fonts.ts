import localFont from 'next/font/local'

const ubuntu = localFont({
  src: [
    {
      path: './UbuntuSans-Variable.woff2',
      style: 'normal',
    },
    {
      path: './UbuntuSans-Italic-Variable.woff2',
      style: 'italic',
    },
  ],
})

export { ubuntu }
