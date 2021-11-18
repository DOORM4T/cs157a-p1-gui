import { Block } from 'baseui/block'
import { Button } from 'baseui/button'
import { DisplayMedium } from 'baseui/typography'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '../App'
import { useDialogModal } from '../components/DialogModal'
import { LoginModal } from '../components/LoginModal'
import { NewCustomerModal } from '../components/NewCustomerModal'
import { LoginContext } from '../LoginContext'

const CustomerPage = () => {
  useRedirectIfNotLoggedIn()

  // Hide this page if the user isn't logged in
  const { customerId } = useContext(LoginContext)
  if (customerId === null) return null

  return (
    <Block
      margin="2rem auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      $style={{ textAlign: 'center' }}
    >
      <DisplayMedium>Customer</DisplayMedium>
      {/* TODO: SHOW OPTIONS */}
      {/* <TitleScreenModalManager /> */}
    </Block>
  )
}

export default CustomerPage

const useRedirectIfNotLoggedIn = () => {
  const { customerId } = useContext(LoginContext)
  const navigate = useNavigate()

  useEffect(() => {
    const isLoggedIn = customerId === null
    if (isLoggedIn) navigate(ROUTES.title)
  }, [customerId])
}

const TitleScreenModalManager = () => {
  const newCustomerModal = useDialogModal()
  const loginModal = useDialogModal()

  return (
    <Block
      display="flex"
      flexDirection={['column', 'column', 'row']}
      width="50%"
      maxWidth="750px"
    >
      <Block
        width="100%"
        marginRight={[0, 0, '1rem']}
        marginBottom={['1rem', '1rem', 0]}
      >
        <Button
          onClick={newCustomerModal.open}
          $style={{
            width: '100%',
          }}
        >
          New Customer
        </Button>
      </Block>
      <Block width="100%">
        <Button onClick={loginModal.open} $style={{ width: '100%' }}>
          Login
        </Button>
      </Block>
      <NewCustomerModal newCustomerModal={newCustomerModal} />
      <LoginModal loginModal={loginModal} />
    </Block>
  )
}