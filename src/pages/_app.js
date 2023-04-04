// Fonts
import { Urbanist } from 'next/font/google'

const urbanist = Urbanist({
  weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin']
})

// Styles
import '@/styles/globals.scss'

export default function App({ Component, pageProps }) {
  return (
    <main className={urbanist.className}>
      <Component {...pageProps} />
    </main>
  )
}
