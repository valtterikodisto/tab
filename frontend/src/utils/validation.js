import organizationService from '../services/organization'
import drinkService from '../services/drink'

/*
Return validation message if input is invalid.
Otherwise return an empty string.
*/

export const validateOrganizationName = async name => {
  if (name.length < 3) {
    return 'Nimen tulee olla vähintään 3 merkkiä'
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
  const invalid = Number.isNaN(parseFloat(euros.replace(',', '.')))
  if (invalid) {
    return 'Virheellinen summa'
  }
  return ''
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
