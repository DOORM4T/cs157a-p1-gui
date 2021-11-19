import { Block } from 'baseui/block'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import { Paragraph1 } from 'baseui/typography'
import { useState } from 'react'
import DialogModal, { IUseDialogModalReturnValue } from '../DialogModal'

const REPORT_B_ENDPOINT = '/api/reportB'
export const ReportBModal = (props: {
  reportBModal: IUseDialogModalReturnValue
}) => {
  const { reportBModal } = props
  const [minAge, setMinAge] = useState('')
  const [maxAge, setMaxAge] = useState('')

  const resetState = () => {
    setMinAge('')
    setMaxAge('')
  }

  const handleSubmit = async () => {
    const endpoint = `${REPORT_B_ENDPOINT}?minAge=${minAge}&maxAge=${maxAge}`

    try {
      const response = await fetch(endpoint)
      const reportBText = await response.text()

      alert(reportBText)
      reportBModal.close()
      resetState()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DialogModal
      isOpen={reportBModal.isOpen}
      handleClose={() => {
        reportBModal.close()
        resetState()
      }}
      handleConfirm={handleSubmit}
      text={{ headerText: 'Report B', confirmText: 'View' }}
      modalContent={
        <Block minWidth="128px" maxWidth="750px">
          <form>
            <Paragraph1>Find the Average Balance Between Age Groups</Paragraph1>
            <form>
              <FormControl label={() => 'Min Age'}>
                <Input
                  clearable
                  onChange={(e) => setMinAge(e.currentTarget.value)}
                  value={minAge}
                />
              </FormControl>
              <FormControl label={() => 'Max Age'}>
                <Input
                  clearable
                  onChange={(e) => setMaxAge(e.currentTarget.value)}
                  value={maxAge}
                />
              </FormControl>
            </form>
          </form>
        </Block>
      }
    />
  )
}
