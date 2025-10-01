// Build delivery URL from publicId with optional width/height
export const buildCloudinaryUrl = (publicId, { w, h, q='auto', f='auto' } = {}) => {
  if (!publicId) return ''
  const cloudName = (import.meta.env.VITE_CLOUD_NAME) || '' // optional if you want unsigned
  // If your backend returns full secure_url, just use it.
  if (publicId.startsWith('http')) return publicId
  const parts = ['https://res.cloudinary.com', cloudName || 'dnitzkowt', 'image', 'upload']
  const trans = []
  if (w) trans.push(`w_${w}`)
  if (h) trans.push(`h_${h}`)
  if (q) trans.push(`q_${q}`)
  if (f) trans.push(`f_${f}`)
  return `${parts.join('/')}/${trans.length?trans.join(',')+'/':''}${publicId}.jpg`
}

// Build Cloudinary video delivery URL
export const buildCloudinaryVideoUrl = (publicId, { w, h, q='auto', f='auto', format='mp4' } = {}) => {
  if (!publicId) return ''
  const cloudName = (import.meta.env.VITE_CLOUD_NAME) || ''
  if (publicId.startsWith('http')) return publicId
  const parts = ['https://res.cloudinary.com', cloudName || 'dnitzkowt', 'video', 'upload']
  const trans = []
  if (w) trans.push(`w_${w}`)
  if (h) trans.push(`h_${h}`)
  if (q) trans.push(`q_${q}`)
  if (f) trans.push(`f_${f}`)
  const ext = format?.replace(/^\./,'') || 'mp4'
  return `${parts.join('/')}/${trans.length?trans.join(',')+'/':''}${publicId}.${ext}`
}

// Extract a video poster (jpg) at a specific second offset
export const buildCloudinaryVideoPoster = (publicId, { sec=1, w, h, q='auto' } = {}) => {
  if (!publicId) return ''
  const cloudName = (import.meta.env.VITE_CLOUD_NAME) || ''
  if (publicId.startsWith('http')) return publicId
  const parts = ['https://res.cloudinary.com', cloudName || 'dnitzkowt', 'video', 'upload']
  const trans = []
  if (w) trans.push(`w_${w}`)
  if (h) trans.push(`h_${h}`)
  if (q) trans.push(`q_${q}`)
  // so_: start offset in seconds to grab thumbnail frame
  if (sec) trans.push(`so_${sec}`)
  return `${parts.join('/')}/${trans.length?trans.join(',')+'/':''}${publicId}.jpg`
}
