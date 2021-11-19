import { Block } from 'baseui/block'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import { useContext, useState } from 'react'
import { LoginContext } from '../../LoginContext'
import DialogModal, { IUseDialogModalReturnValue } from '../DialogModal'

const ACCOUNT_SUMMARY_ENDPOINT = '/api/accountSummary'
export const AccountSummaryModal = (props: {
  accountSummaryModal: IUseDialogModalReturnValue
}) => {
  const { accountSummaryModal } = props

  // By default, customer ID input is the logged in customer's ID. Can view other customer summaries as desired.
  const { customerId } = useContext(LoginContext)
  const [cusID, setCusID] = useState(customerId || '')

  const resetState = () => {
    setCusID(customerId || '')
  }

  const handleSubmit = async () => {
    const endpoint = `${ACCOUNT_SUMMARY_ENDPOINT}?cusID=${cusID}`

    try {
      const response = await fetch(endpoint)
      const accountSummaryText = await response.text()

      alert(accountSummaryText)
      accountSummaryModal.close()
      resetState()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DialogModal
      isOpen={accountSummaryModal.isOpen}
      handleClose={() => {
        accountSummaryModal.close()
        resetState()
      }}
      handleConfirm={handleSubmit}
      text={{ headerText: 'Account Summary', confirmText: 'View' }}
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
          </form>
        </Block>
      }
    />
  )
}
