export const buildWhatsAppLink = (name, items = [], phone = '') => {
  const header = `Hi, my name is ${name}. I'd like to order:\n`
  const lines = items.map(i => {
    const sz = i.size === 'NOT_SURE' ? 'Not sure' : i.size
    return `• ${i.title} x${i.qty} (Size: ${sz}) - ₦${(i.price*i.qty).toLocaleString()}`
  }).join('\n')
  const total = items.reduce((s,i)=>s+i.price*i.qty,0)
  const footer = `\nTotal: ₦${total.toLocaleString()}\n\nIf size is "Not sure", please help me pick the best fit.`
  const text = encodeURIComponent(header + lines + footer)
  const base = phone ? `https://wa.me/${phone}` : `https://wa.me/`
  return `${base}?text=${text}`
}

// Simple contact message (no cart information)
export const buildWhatsAppContactLink = (name = 'Customer', message = '', phone = '') => {
  const header = `Hi my name is ${name}.\n`
  const body = message ? `${message}` : ''
  const text = encodeURIComponent(`${header}${body}`)
  const base = phone ? `https://wa.me/${phone}` : `https://wa.me/`
  return `${base}?text=${text}`
}

// Simple payment intent message (no cart breakdown)
export const buildWhatsAppPaymentLink = (name = 'Customer', amount = 0, phone = '') => {
  const naira = `₦${Number(amount||0).toLocaleString()}`
  const msg = `Hi my name is ${name}. I want to make a payment of ${naira} for my order.`
  const text = encodeURIComponent(msg)
  const base = phone ? `https://wa.me/${phone}` : `https://wa.me/`
  return `${base}?text=${text}`
}
