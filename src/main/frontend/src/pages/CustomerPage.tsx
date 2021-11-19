import { Block } from 'baseui/block'
import { Button, ButtonProps } from 'baseui/button'
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid'
import { DisplayMedium, Paragraph1 } from 'baseui/typography'
import { useContext } from 'react'
import { $StyleProp } from 'styletron-react'
import { useDialogModal } from '../components/DialogModal'
import { ExitToTitleButton } from '../components/ExitToTitleButton'
import { AccountSummaryModal } from '../components/Modals/AccountSummaryModal'
import { CloseAccountModal } from '../components/Modals/CloseAccountModal'
import { DepositModal } from '../components/Modals/DepositModal'
import { OpenAccountModal } from '../components/Modals/OpenAccountModal'
import { TransferModal } from '../components/Modals/TransferModal'
import { WithdrawModal } from '../components/Modals/WithdrawModal'
import { useRedirectIfNotLoggedIn } from '../hooks/useRedirectIfNotLoggedIn'
import { LoginContext } from '../LoginContext'

const CustomerPage = () => {
  useRedirectIfNotLoggedIn()

  // Hide this page if the user isn't logged in
  const { customerId } = useContext(LoginContext)
  if (customerId === null) return null

  return (
    <Block
      margin="2rem auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      $style={{ textAlign: 'center' }}
    >
      <DisplayMedium>Customer</DisplayMedium>
      <Paragraph1>Main Menu | ID: {customerId}</Paragraph1>
      <CustomerScreenModalManager />
    </Block>
  )
}

export default CustomerPage

export const btnStyles: $StyleProp<ButtonProps> = {
  width: '100%',
  height: '100%',
}
const CustomerScreenModalManager = () => {
  const openAccountModal = useDialogModal()
  const closeAccountModal = useDialogModal()
  const depositModal = useDialogModal()
  const withdrawModal = useDialogModal()
  const transferModal = useDialogModal()
  const accountSummaryModal = useDialogModal()

  return (
    <FlexGrid
      flexGridColumnCount={3}
      gridGap="1rem"
      gridColumnGap="1rem"
      width="50%"
      maxWidth="300px"
    >
      <FlexGridItem>
        <Button onClick={openAccountModal.open} $style={btnStyles}>
          Open Account
        </Button>
      </FlexGridItem>
      <FlexGridItem>
        <Button onClick={closeAccountModal.open} $style={btnStyles}>
          Close Account
        </Button>
      </FlexGridItem>
      <FlexGridItem>
        <Button onClick={depositModal.open} $style={btnStyles}>
          Deposit
        </Button>
      </FlexGridItem>
      <FlexGridItem>
        <Button onClick={withdrawModal.open} $style={btnStyles}>
          Withdraw
        </Button>
      </FlexGridItem>
      <FlexGridItem>
        <Button onClick={transferModal.open} $style={btnStyles}>
          Transfer
        </Button>
      </FlexGridItem>
      <FlexGridItem>
        <Button onClick={accountSummaryModal.open} $style={btnStyles}>
          Account Summary
        </Button>
      </FlexGridItem>
      <FlexGridItem>
        <ExitToTitleButton $style={btnStyles} />
      </FlexGridItem>

      <OpenAccountModal openAccountModal={openAccountModal} />
      <CloseAccountModal closeAccountModal={closeAccountModal} />
      <DepositModal depositModal={depositModal} />
      <WithdrawModal withdrawModal={withdrawModal} />
      <TransferModal transferModal={transferModal} />
      <AccountSummaryModal accountSummaryModal={accountSummaryModal} />
    </FlexGrid>
  )
}
