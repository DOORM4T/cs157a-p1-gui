import { Block } from 'baseui/block'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import { useState } from 'react'
import DialogModal, { IUseDialogModalReturnValue } from '../DialogModal'

const DEPOSIT_ENDPOINT = '/api/deposit'
export const DepositModal = (props: {
  depositModal: IUseDialogModalReturnValue
}) => {
  const { depositModal } = props
  const [accNum, setAccNum] = useState('')
  const [amount, setAmount] = useState('')

  const clear = () => {
    setAccNum('')
    setAmount('')
  }

  const handleSubmit = async () => {
    const endpoint = `${DEPOSIT_ENDPOINT}?accNum=${accNum}&amount=${amount}`

    try {
      const response = await fetch(endpoint)
      const depositResponse = await response.text()
      alert(depositResponse)
      depositModal.close()
      clear()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DialogModal
      isOpen={depositModal.isOpen}
      handleClose={() => {
        depositModal.close()
        clear()
      }}
      handleConfirm={handleSubmit}
      text={{ headerText: 'Deposit' }}
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
