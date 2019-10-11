import React, { useState, useEffect } from 'react'
import organizationService from '../services/organization'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import TemplatePage from './TemplatePage'
import ModalCard from '../components/ModalCard'
import OrganizationForm from '../components/OrganizationForm'
import OrganizationBox from '../components/OrganizationBox'
import Button from '../components/Button'

const OrganizationPage = ({ setNotification }) => {
  const [organizations, setOrganizations] = useState()
  const [organizationFormVisible, setOrganizationFormVisible] = useState(false)
  const [activeOrganization, setActiveOrganization] = useState(null)

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

    console.log(organization)

    if (organization.id) {
      updateOrganization(organization)
    } else {
      addOrganization(organization)
    }
  }

  const addOrganization = organization => {
    const { name, maxTab } = organization

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
          setNotification(`Järjestön nimi '${name}' on jo käytössä`, 'is-warning')
        } else {
          setNotification(`Järjestön ${name} lisääminen ei onnistunut`, 'is-danger')
        }

        console.log(error)
      })
  }

  const updateOrganization = organization => {
    organizationService
      .update(organization.id, organization)
      .then(updatedOrganization => {
        setOrganizations(
          organizations.map(o => (o.id === organization.id ? updatedOrganization : o))
        )
        handleOrganizationFormClose()
        setNotification(`${organization.name} päivitettiin onnistuneesti!`, 'is-primary')
      })
      .catch(error => {
        setNotification(`Järjestön ${organization.name} päivittäminen ei onnistunut`, 'is-danger')
        console.log(error)
      })
  }

  const handleOrganizationFormClose = () => {
    setOrganizationFormVisible(false)
    setActiveOrganization(null)
  }

  const handleEdit = organization => {
    setActiveOrganization(organization)
    setOrganizationFormVisible(true)
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
          organization={activeOrganization}
        />
      </ModalCard>
      <div className="container">
        <h1 className="title">Järjestöt</h1>
        <div>
          <Button text="Lisää järjestö" onClick={() => handleEdit(null)} />
        </div>
        {organizations
          ? organizations.map(o => (
              <OrganizationBox organization={o} key={o.id} handleEdit={handleEdit} />
            ))
          : null}
      </div>
    </TemplatePage>
  )
}

export default connect(
  null,
  { setNotification }
)(OrganizationPage)
