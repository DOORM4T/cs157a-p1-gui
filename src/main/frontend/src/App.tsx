import { Block } from 'baseui/block'
import { Button } from 'baseui/button'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import { ALIGN, Radio, RadioGroup } from 'baseui/radio'
import { DisplayMedium, ParagraphMedium } from 'baseui/typography'
import { useState } from 'react'
import DialogModal, {
  IUseDialogModalReturnValue,
  useDialogModal
} from './components/DialogModal'

const App = () => {
  const [values, setValues] = useState(['', '', '', ''])
  const newCustomerModal = useDialogModal()
  const loginModal = useDialogModal()

  return (
    <Block
      maxWidth="100vw"
      height="100vh"
      overflow="hidden"
      backgroundColor="#141414"
    >
      <Block
        margin="2rem auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
        $style={{ textAlign: 'center' }}
      >
        {/* TODO: TEST DB CONNECTION. Show refresh otherwise. */}

        <DisplayMedium>Banking System</DisplayMedium>
        <ParagraphMedium>By Matthew Seto | CS 157A Project 1</ParagraphMedium>
        <Block
          display="flex"
          flexDirection={['column', 'column', 'row']}
          width="50%"
          maxWidth="750px"
        >
          <Block
            width="100%"
            marginRight={[0, 0, '1rem']}
            marginBottom={['1rem', '1rem', 0]}
          >
            <Button
              onClick={newCustomerModal.open}
              $style={{
                width: '100%',
              }}
            >
              New Customer
            </Button>
          </Block>
          <Block width="100%">
            <Button onClick={loginModal.open} $style={{ width: '100%' }}>
              Login
            </Button>
          </Block>
        </Block>
      </Block>

      <NewCustomerModal newCustomerModal={newCustomerModal} />
      <LoginModal loginModal={loginModal} />
    </Block>
  )
}

export default App

const LoginModal = (props: { loginModal: IUseDialogModalReturnValue }) => {
  const { loginModal } = props
  const [id, setId] = useState('')
  const [pin, setPin] = useState('')

  return (
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
        <Block minWidth="128px" maxWidth="750px">
          <form>
            <FormControl label={() => 'Customer ID'}>
              <Input
                clearable
                onChange={(e) => setId(e.currentTarget.value)}
                value={id}
              />
            </FormControl>
            <FormControl label={() => 'Customer PIN'}>
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

type Gender = 'M' | 'F' | null

const NewCustomerModal = (props: {
  newCustomerModal: IUseDialogModalReturnValue
}) => {
  const { newCustomerModal } = props
  const [name, setName] = useState('')
  const [gender, setGender] = useState<Gender | null>(null)
  const [pin, setPin] = useState('')
  const [age, setAge] = useState('')

  return (
    <DialogModal
      isOpen={newCustomerModal.isOpen}
      handleClose={() => {
        newCustomerModal.close()
      }}
      handleConfirm={() => {
        newCustomerModal.close()
      }}
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
                <Radio value="M" >
                  Male
                </Radio>
                <Radio value="F" >
                  Female
                </Radio>
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
