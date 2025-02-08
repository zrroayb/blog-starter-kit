import { useTranslation } from '../utils/useTranslation'

export default function Home() {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t('home.welcome')}</h1>
      <p>{t('home.description')}</p>
    </div>
  )
} 