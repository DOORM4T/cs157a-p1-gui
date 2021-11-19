import { Block } from 'baseui/block'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import { useContext, useState } from 'react'
import { LoginContext } from '../../LoginContext'
import DialogModal, { IUseDialogModalReturnValue } from '../DialogModal'

const TRANSFER_ENDPOINT = '/api/transfer'
export const TransferModal = (props: {
  transferModal: IUseDialogModalReturnValue
}) => {
  const { transferModal } = props
  // We'll pass customer ID automatically to check if the src account belongs to the customer
  const { customerId } = useContext(LoginContext)

  const [srcAccNum, setSrcAccNum] = useState('')
  const [destAccNum, setDestAccNum] = useState('')
  const [amount, setAmount] = useState('')

  const clear = () => {
    setSrcAccNum('')
    setDestAccNum('')
    setAmount('')
  }

  const handleSubmit = async () => {
    if (!customerId) throw new Error('Invalid customer ID')
    const endpoint = `${TRANSFER_ENDPOINT}?srcAccNum=${srcAccNum}&destAccNum=${destAccNum}&amount=${amount}&cusID=${customerId}`

    try {
      const response = await fetch(endpoint)
      const transferResponse = await response.text()
      alert(transferResponse)
      transferModal.close()
      clear()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DialogModal
      isOpen={transferModal.isOpen}
      handleClose={() => {
        transferModal.close()
        clear()
      }}
      handleConfirm={handleSubmit}
      text={{ headerText: 'Transfer' }}
      modalContent={
        <Block minWidth="128px" maxWidth="750px">
          <form>
            <FormControl label={() => 'Source Account Number'}>
              <Input
                clearable
                onChange={(e) => setSrcAccNum(e.currentTarget.value)}
                value={srcAccNum}
              />
            </FormControl>
            <FormControl label={() => 'Destination Account Number'}>
              <Input
                clearable
                onChange={(e) => setDestAccNum(e.currentTarget.value)}
                value={destAccNum}
              />
            </FormControl>
            <FormControl label={() => 'Amount'}>
              <Input
                clearable
                onChange={(e) => setAmount(e.currentTarget.value)}
                value={amount}
              />
            </FormControl>
          </form>
        </Block>
      }
    />
  )
}
