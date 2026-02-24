const defaultApi = (import.meta.env?.VITE_API_URL || '').replace(/\/$/, '')

const getWhatsAppRedirectBase = () => defaultApi

export const buildWhatsAppRedirect = (text = '', phone = '') => {
  const base = getWhatsAppRedirectBase()
  const query = new URLSearchParams()
  if (text) query.set('text', text)
  if (phone) query.set('to', String(phone))
  const qs = query.toString()
  return `${base}/whatsapp${qs ? `?${qs}` : ''}`
}

export const buildWhatsAppLink = (name, items = [], phone = '') => {
  const header = `Hi, my name is ${name}. I'd like to order:\n`
  const lines = items.map(i => {
    const sz = i.size === 'NOT_SURE' ? 'Not sure' : i.size
    return `• ${i.title} x${i.qty} (Size: ${sz}) - ₦${(i.price*i.qty).toLocaleString()}`
  }).join('\n')
  const total = items.reduce((s,i)=>s+i.price*i.qty,0)
  const footer = `\nTotal: ₦${total.toLocaleString()}\n\nIf size is "Not sure", please help me pick the best fit.`
  const text = header + lines + footer
  return buildWhatsAppRedirect(text, phone)
}

// Simple contact message (no cart information)
export const buildWhatsAppContactLink = (name = 'Customer', message = '', phone = '') => {
  const header = `Hi my name is ${name}.\n`
  const body = message ? `${message}` : ''
  const text = `${header}${body}`
  return buildWhatsAppRedirect(text, phone)
}

// Simple payment intent message (no cart breakdown)
export const buildWhatsAppPaymentLink = (name = 'Customer', amount = 0, phone = '') => {
  const naira = `₦${Number(amount||0).toLocaleString()}`
  const msg = `Hi my name is ${name}. I want to make a payment of ${naira} for my order.`
  return buildWhatsAppRedirect(msg, phone)
}
