export const EXAMPLE_PATH = 'blog-starter'
export const CMS_NAME = 'Markdown'
export const HOME_OG_IMAGE_URL =
  'https://og-image.vercel.app/Next.js%20Blog%20Starter%20Example.png'

// Base URL'yi ortama göre ayarla
export const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://blog-starter-kit-two-gold.vercel.app'  // Vercel'deki domain adınızı buraya yazın
  : 'http://localhost:3000'
