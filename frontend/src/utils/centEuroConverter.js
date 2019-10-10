// Balance is in cents in DB
export const centToEuro = cents => {
  const decimal = cents / 100
  return decimal.toFixed(2)
}

// User gives input as String (euro)
export const euroToCent = euros => {
  if (typeof euros === 'number') {
    return Math.ceil(euros * 100)
  }

  const cents = Math.round(parseFloat(euros.replace(',', '.')) * 100)
  if (Number.isNaN(cents)) {
    return null
  }

  return cents
}

export const validateEuro = euros => {
  return !Number.isNaN(parseFloat(euros.replace(',', '.')))
}
