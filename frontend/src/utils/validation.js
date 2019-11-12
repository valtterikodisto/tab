import organizationService from '../services/organization'
import drinkService from '../services/drink'

/*
Return validation message if input is invalid.
Otherwise return an empty string.
*/

export const validateOrganizationName = async name => {
  if (name.length < 2) {
    return 'Nimen tulee olla vähintään 2 merkkiä'
  }

  try {
    const organization = await organizationService.findByName(name)
    if (organization) {
      return 'Nimi on jo käytössä'
    }
    return ''
  } catch (error) {
    console.log(error)
  }
}

export const validateEuro = euros => {
  const commaReplacedEuros = euros.replace(',', '.')
  const x = 0
  if (/^\d*(\.\d{0,2})?$/.test(commaReplacedEuros)) {
    return ''
  } else {
    return 'Virheellinen summa'
  }
}

export const validateDrinkName = async name => {
  const exists = await drinkService.checkIfExists(name)
  if (exists) {
    return 'Nimi on jo käytössä'
  } else if (name.length < 1) {
    return 'Nimen tulee olla vähintään 1 merkki'
  }
  return ''
}

export const validateEmail = email => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (email && !emailRegex.test(email)) {
    return 'Virheellinen sähköposti'
  }

  return ''
}
