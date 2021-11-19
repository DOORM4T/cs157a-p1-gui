import { Block } from 'baseui/block'
import { Button } from 'baseui/button'
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid'
import { DisplayMedium, Paragraph1 } from 'baseui/typography'
import { useDialogModal } from '../components/DialogModal'
import { ExitToTitleButton } from '../components/ExitToTitleButton'
import { AccountSummaryModal } from '../components/Modals/AccountSummaryModal'
import { ReportBModal } from '../components/Modals/ReportBModal'
import { useGetReportA } from '../hooks/useGetReportA'
import { useRedirectIfNotLoggedIn } from '../hooks/useRedirectIfNotLoggedIn'
import { btnStyles } from './CustomerPage'

const AdminPage = () => {
  useRedirectIfNotLoggedIn({ requireAdmin: true })

  return (
    <Block
      margin="2rem auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      $style={{ textAlign: 'center' }}
    >
      <DisplayMedium>Admin</DisplayMedium>
      <Paragraph1>Main Menu</Paragraph1>
      <AdminScreenModalManager />
    </Block>
  )
}

export default AdminPage

const AdminScreenModalManager = () => {
  const accountSummaryModal = useDialogModal()
  const getReportA = useGetReportA()
  const reportBModal = useDialogModal()

  return (
    <FlexGrid
      flexGridColumnCount={3}
      gridGap="1rem"
      gridColumnGap="1rem"
      width="50%"
      maxWidth="300px"
    >
      <FlexGridItem>
        <Button onClick={accountSummaryModal.open} $style={btnStyles}>
          Account Summary
        </Button>
      </FlexGridItem>
      <FlexGridItem>
        <Button onClick={getReportA} $style={btnStyles}>
          Report A
        </Button>
      </FlexGridItem>
      <FlexGridItem>
        <Button onClick={reportBModal.open} $style={btnStyles}>
          Report B
        </Button>
      </FlexGridItem>
      <FlexGridItem>
        <ExitToTitleButton $style={btnStyles} />
      </FlexGridItem>

      <AccountSummaryModal accountSummaryModal={accountSummaryModal} />
      <ReportBModal reportBModal={reportBModal} />
    </FlexGrid>
  )
}
