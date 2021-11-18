import { Block } from 'baseui/block'
import { Button } from 'baseui/button'
import { DisplayMedium, ParagraphMedium } from 'baseui/typography'
import { useDialogModal } from '../components/DialogModal'
import { LoginModal } from '../components/LoginModal'
import { NewCustomerModal } from '../components/NewCustomerModal'

const CustomerPage = () => {
  return (
    <Block
      margin="2rem auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      $style={{ textAlign: 'center' }}
    >
      <DisplayMedium>Customer</DisplayMedium>
      {/* <TitleScreenModalManager /> */}
    </Block>
  )
}

export default CustomerPage

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
