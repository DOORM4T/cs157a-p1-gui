import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '../App'
import { LoginContext } from '../LoginContext'

export const useRedirectIfNotLoggedIn = (params?: {
  requireAdmin?: boolean
}) => {
  const { customerId } = useContext(LoginContext)
  const navigate = useNavigate()

  const redirect = () => navigate(ROUTES.title)

  useEffect(() => {
    if (params?.requireAdmin && customerId !== '0') {
      // Admin required? Prevent non-admin logins
      redirect()
      return
    }

    // Otherwise, prevent access to clients without a customer ID
    const isLoggedIn = customerId === null
    if (isLoggedIn) redirect()
  }, [customerId])
}
