import { Block } from 'baseui/block'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import { useContext, useState } from 'react'
import { LoginContext } from '../../LoginContext'
import DialogModal, { IUseDialogModalReturnValue } from '../DialogModal'

const CLOSE_ACCOUNT_ENDPOINT = '/api/closeAccount'
export const CloseAccountModal = (props: {
  closeAccountModal: IUseDialogModalReturnValue
}) => {
  const { closeAccountModal } = props

  // Initial customer ID field will pre-fill w/ the logged in customer's ID...
  // BUT customers can open accounts for other customers
  const { customerId } = useContext(LoginContext)
  const [accNum, setAccNum] = useState('')

  const resetState = () => {
    setAccNum('')
  }

  const handleSubmit = async () => {
    if (!customerId) throw new Error('Invalid customer ID')
    const endpoint = `${CLOSE_ACCOUNT_ENDPOINT}?cusID=${customerId}&accNum=${accNum}`

    try {
      const response = await fetch(endpoint)
      const resultText = await response.text()
      window.alert(resultText)
      closeAccountModal.close()
      resetState()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DialogModal
      isOpen={closeAccountModal.isOpen}
      handleClose={() => {
        closeAccountModal.close()
        resetState()
      }}
      handleConfirm={handleSubmit}
      text={{
        headerText: 'Close Account',
      }}
      modalContent={
        <Block minWidth="128px" maxWidth="750px">
          <form>
            <FormControl label={() => 'Account Number'}>
              <Input
                clearable
                onChange={(e) => setAccNum(e.currentTarget.value)}
                value={accNum}
              />
            </FormControl>
          </form>
        </Block>
      }
    />
  )
}
