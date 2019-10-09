const getHeader = () => {
  const tabListUserJSON = window.localStorage.getItem('tabListUser')

  if (tabListUserJSON) {
    const user = JSON.parse(tabListUserJSON)
    return {
      headers: { Authorization: `Bearer ${user.token}` }
    }
  }

  return null
}

export default getHeader
