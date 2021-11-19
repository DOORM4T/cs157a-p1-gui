import { Block } from 'baseui/block'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import { useState } from 'react'
import DialogModal, { IUseDialogModalReturnValue } from '../DialogModal'

const WITHDRAW_ENDPOINT = '/api/withdraw'
export const WithdrawModal = (props: {
  withdrawModal: IUseDialogModalReturnValue
}) => {
  const { withdrawModal } = props
  const [accNum, setAccNum] = useState('')
  const [amount, setAmount] = useState('')

  const clear = () => {
    setAccNum('')
    setAmount('')
  }

  const handleSubmit = async () => {
    const endpoint = `${WITHDRAW_ENDPOINT}?accNum=${accNum}&amount=${amount}`

    try {
      const response = await fetch(endpoint)
      const depositResponse = await response.text()
      alert(depositResponse)
      withdrawModal.close()
      clear()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DialogModal
      isOpen={withdrawModal.isOpen}
      handleClose={() => {
        withdrawModal.close()
        clear()
      }}
      handleConfirm={handleSubmit}
      text={{ headerText: 'Withdraw' }}
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
