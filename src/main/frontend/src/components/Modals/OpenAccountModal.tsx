import { Block } from 'baseui/block'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import { ALIGN, Radio, RadioGroup } from 'baseui/radio'
import { useContext, useState } from 'react'
import { LoginContext } from '../../LoginContext'
import DialogModal, { IUseDialogModalReturnValue } from '../DialogModal'

type AccountType = 'C' | 'S' | null
const NEW_CUSTOMER_ENDPOINT = '/api/openAccount'
export const OpenAccountModal = (props: {
  openAccountModal: IUseDialogModalReturnValue
}) => {
  // Initial customer ID field will pre-fill w/ the logged in customer's ID...
  // BUT customers can open accounts for other customers
  const { customerId } = useContext(LoginContext)
  const { openAccountModal } = props
  const [cusID, setCusID] = useState(customerId || '')

  const [accountType, setAccountType] = useState<AccountType | null>(null)
  const [initialDeposit, setInitialDeposit] = useState('')

  const resetState = () => {
    setCusID(customerId || '')
    setAccountType(null)
    setInitialDeposit('')
  }

  const handleSubmit = async () => {
    const endpoint = `${NEW_CUSTOMER_ENDPOINT}?cusID=${cusID}&type=${accountType}&amount=${initialDeposit}`

    try {
      const response = await fetch(endpoint)
      const newAccountId = Number(await response.text())

      if (newAccountId === -1) throw new Error('Failed to open new account')
      alert(`Customer ${cusID}'s new Account Number is: ${newAccountId}`)
      openAccountModal.close()
      resetState()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DialogModal
      isOpen={openAccountModal.isOpen}
      handleClose={() => {
        openAccountModal.close()
        resetState()
      }}
      handleConfirm={handleSubmit}
      text={{ headerText: 'Open Account', confirmText: 'Confirm' }}
      modalContent={
        <Block minWidth="128px" maxWidth="750px">
          <form>
            <FormControl label={() => 'Customer ID'}>
              <Input
                clearable
                onChange={(e) => setCusID(e.currentTarget.value)}
                value={cusID}
              />
            </FormControl>
            <FormControl label={() => 'Account Type'}>
              <RadioGroup
                value={accountType || undefined}
                onChange={(e) => {
                  let result: string | null = e.currentTarget.value
                  if (result !== 'C' && result !== 'S') result = null
                  setAccountType(result)
                }}
                align={ALIGN.horizontal}
              >
                <Radio value="C">Checking</Radio>
                <Radio value="S">Savings</Radio>
              </RadioGroup>
            </FormControl>
            <FormControl label={() => 'Initial Deposit'}>
              <Input
                clearable
                onChange={(e) => setInitialDeposit(e.currentTarget.value)}
                value={initialDeposit}
              />
            </FormControl>
          </form>
        </Block>
      }
    />
  )
}
