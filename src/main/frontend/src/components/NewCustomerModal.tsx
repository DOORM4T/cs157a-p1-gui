import { Block } from 'baseui/block'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import { ALIGN, Radio, RadioGroup } from 'baseui/radio'
import { useState } from 'react'
import DialogModal, { IUseDialogModalReturnValue } from './DialogModal'

type Gender = 'M' | 'F' | null
const NEW_CUSTOMER_ENDPOINT = '/api/newCustomer'
export const NewCustomerModal = (props: {
  newCustomerModal: IUseDialogModalReturnValue
}) => {
  const { newCustomerModal } = props
  const [name, setName] = useState('')
  const [gender, setGender] = useState<Gender | null>(null)
  const [age, setAge] = useState('')
  const [pin, setPin] = useState('')

  const clear = () => {
    setName('')
    setGender(null)
    setAge('')
    setPin('')
  }

  const handleSubmit = async () => {
    const endpoint = `${NEW_CUSTOMER_ENDPOINT}?name=${name}&gender=${gender}&age=${age}&pin=${pin}`

    try {
      const response = await fetch(endpoint)
      const newCustomerId = Number(await response.text())

      if (newCustomerId === -1) throw new Error('Failed to create new customer')
      alert(`Your customer ID is: ${newCustomerId}`)
      newCustomerModal.close()
      clear()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DialogModal
      isOpen={newCustomerModal.isOpen}
      handleClose={() => {
        newCustomerModal.close()
        clear()
      }}
      handleConfirm={handleSubmit}
      text={{ headerText: 'Customer Login', confirmText: 'Create' }}
      modalContent={
        <Block minWidth="128px" maxWidth="750px">
          <form>
            <FormControl label={() => 'Name'}>
              <Input
                clearable
                onChange={(e) => setName(e.currentTarget.value)}
                value={name}
              />
            </FormControl>
            <FormControl label={() => 'Gender'}>
              <RadioGroup
                value={gender || undefined}
                onChange={(e) => {
                  let result: string | null = e.currentTarget.value
                  if (result !== 'M' && result !== 'F') result = null
                  setGender(result)
                }}
                align={ALIGN.horizontal}
              >
                <Radio value="M">Male</Radio>
                <Radio value="F">Female</Radio>
              </RadioGroup>
            </FormControl>
            <FormControl label={() => 'Age'}>
              <Input
                type="number"
                clearable
                onChange={(e) => setAge(e.currentTarget.value)}
                value={age}
              />
            </FormControl>
            <FormControl label={() => 'PIN'}>
              <Input
                type="password"
                clearable
                onChange={(e) => setPin(e.currentTarget.value)}
                value={pin}
              />
            </FormControl>
          </form>
        </Block>
      }
    />
  )
}
