import { useTranslation } from '../utils/useTranslation'

export default function Layout({ children }) {
  const { t } = useTranslation()
  
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="/">{t('common.home')}</a></li>
            <li><a href="/about">{t('common.about')}</a></li>
            <li><a href="/contact">{t('common.contact')}</a></li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>© 2024 Tüm hakları saklıdır.</p>
      </footer>
    </div>
  )
} 