import { Block } from 'baseui/block'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import { Paragraph1 } from 'baseui/typography'
import { useState } from 'react'
import DialogModal, { IUseDialogModalReturnValue } from '../DialogModal'

const ADD_INTEREST_ENDPOINT = '/api/addInterest'
export const AddInterestModal = (props: {
  addInterestModal: IUseDialogModalReturnValue
}) => {
  const { addInterestModal } = props
  const [savingsRate, setSavingsRate] = useState('')
  const [checkingRate, setCheckingRate] = useState('')

  const resetState = () => {
    setSavingsRate('')
    setCheckingRate('')
  }

  const handleSubmit = async () => {
    const endpoint = `${ADD_INTEREST_ENDPOINT}?savingsRate=${savingsRate}&checkingRate=${checkingRate}`

    try {
      const response = await fetch(endpoint)
      const addInterestText = await response.text()

      alert(addInterestText)
      addInterestModal.close()
      resetState()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DialogModal
      isOpen={addInterestModal.isOpen}
      handleClose={() => {
        addInterestModal.close()
        resetState()
      }}
      handleConfirm={handleSubmit}
      text={{ headerText: 'Add Interest', confirmText: 'Confirm' }}
      modalContent={
        <Block minWidth="128px" maxWidth="750px">
          <form>
            <Paragraph1>Add interest to all active accounts</Paragraph1>
            <form>
              <FormControl label={() => 'Savings Rate'}>
                <Input
                  clearable
                  onChange={(e) => setSavingsRate(e.currentTarget.value)}
                  value={savingsRate}
                />
              </FormControl>
              <FormControl label={() => 'Checking Rate'}>
                <Input
                  clearable
                  onChange={(e) => setCheckingRate(e.currentTarget.value)}
                  value={checkingRate}
                />
              </FormControl>
            </form>
          </form>
        </Block>
      }
    />
  )
}
