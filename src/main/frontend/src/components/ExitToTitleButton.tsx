import { Button, ButtonProps } from 'baseui/button'
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '../App'
import { LoginContext } from '../LoginContext'

export const ExitToTitleButton = (props: ButtonProps) => {
  const navigate = useNavigate()
  const { setCustomerId } = useContext(LoginContext)

  const exitToTitle = () => {
    setCustomerId && setCustomerId(null)
    navigate(ROUTES.title)
  }

  return (
    <Button onClick={exitToTitle} {...props}>
      Exit
    </Button>
  )
}
