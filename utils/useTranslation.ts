import { useRouter } from 'next/router'
import tr from '../public/locales/tr.json'

export function useTranslation() {
  const translations = {
    tr
  }

  const router = useRouter()
  const locale = router.locale || 'tr'
  
  const t = (key: string) => {
    const keys = key.split('.')
    let value = translations[locale]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  return { t }
} 