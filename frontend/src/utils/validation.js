import organizationService from '../services/organization'

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
