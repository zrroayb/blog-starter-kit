import { useTranslation } from '../utils/useTranslation'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>Türkçe Site İsmi</title>
        <meta name="description" content="Türkçe site açıklaması" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp 