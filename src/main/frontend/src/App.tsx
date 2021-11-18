import { Block } from 'baseui/block'
import { Button } from 'baseui/button'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import { PinCode } from 'baseui/pin-code'
import { DisplayMedium, DisplayXSmall } from 'baseui/typography'
import { useState } from 'react'
import DialogModal, { useDialogModal } from './components/DialogModal'

const App = () => {
  const [values, setValues] = useState(['', '', '', ''])
  const newCustomerModal = useDialogModal()
  const loginModal = useDialogModal()

  return (
    <div
      style={{
        maxWidth: '100vw',
        height: '100vh',
        padding: '1rem',
        backgroundColor: '#141414',
      }}
    >
      {' '}
      <Block>
        <Block
          margin="0 auto"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <DisplayMedium>Banking System</DisplayMedium>
          <Block display="flex" flexDirection="row" marginTop="1rem">
            <Button
              onClick={newCustomerModal.open}
              $style={{ marginRight: '1rem' }}
            >
              New Customer
            </Button>
            <Button onClick={loginModal.open}>Login</Button>
          </Block>
        </Block>

        <DialogModal
          isOpen={newCustomerModal.isOpen}
          handleClose={() => {
            newCustomerModal.close()
          }}
          handleConfirm={() => {
            newCustomerModal.close()
          }}
          text={{ headerText: 'New Customer', confirmText: 'Create' }}
          modalContent={
            <Block>
              <FormControl label={() => 'Name'} caption={() => 'caption'}>
                <Input />
              </FormControl>
            </Block>
          }
        />

        <DialogModal
          isOpen={loginModal.isOpen}
          handleClose={() => {
            loginModal.close()
          }}
          handleConfirm={() => {
            loginModal.close()
          }}
          text={{ headerText: 'Customer Login', confirmText: 'Create' }}
          modalContent={
            <Block>
              <PinCode
                values={values}
                onChange={({ values }) => setValues(values)}
              />

              <FormControl label={() => 'Name'} caption={() => 'caption'}>
                <Input type="number" />
              </FormControl>

              <DisplayXSmall>
                {`Your pin is: ${values[0]} ${values[1]} ${values[2]} ${values[3]}`}
              </DisplayXSmall>
            </Block>
          }
        />
      </Block>
    </div>
  )
}

export default App
