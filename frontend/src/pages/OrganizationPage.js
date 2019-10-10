import React, { useState, useEffect } from 'react'
import organizationService from '../services/organization'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import TemplatePage from './TemplatePage'
import ModalCard from '../components/ModalCard'
import OrganizationForm from '../components/OrganizationForm'

const OrganizationPage = ({ setNotification }) => {
  const [organizations, setOrganizations] = useState()
  const [organizationFormVisible, setOrganizationFormVisible] = useState(true)

  useEffect(() => {
    organizationService
      .getAll()
      .then(o => {
        setOrganizations(o)
      })
      .catch(e => console.log(e))
  }, [])

  const handleOrganizationFormSubmit = async organization => {
    const { name, maxTab } = organization
    if (!name || name.length < 3 || maxTab === null) {
      return
    }
    organizationService
      .add(name, maxTab)
      .then(o => {
        setOrganizations(organizations.concat(o))
        handleOrganizationFormClose()
        setNotification(`${o.name} lisättiin onnistuneesti!`, 'is-primary')
      })
      .catch(error => {
        handleOrganizationFormClose()
        if (error.response.status === 409) {
          setNotification(`Järjestön nimi '${organization.name}' on jo käytössä`, 'is-warning')
        } else {
          setNotification(`Järjestön ${organization.name} lisääminen ei onnistunut`, 'is-danger')
        }

        console.log(error)
      })
  }

  const handleOrganizationFormClose = () => {
    setOrganizationFormVisible(false)
  }

  return (
    <TemplatePage>
      <ModalCard
        visible={organizationFormVisible}
        footerVisible={false}
        title="Järjestön lisäys"
        handleClose={handleOrganizationFormClose}
      >
        <OrganizationForm
          handleSubmit={handleOrganizationFormSubmit}
          handleClose={handleOrganizationFormClose}
        />
      </ModalCard>
    </TemplatePage>
  )
}

export default connect(
  null,
  { setNotification }
)(OrganizationPage)
