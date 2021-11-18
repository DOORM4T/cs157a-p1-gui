import { KIND as ButtonKind } from 'baseui/button'
import {
  Modal,
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
  ROLE,
  SIZE,
} from 'baseui/modal'
import { useState } from 'react'

interface IProps {
  isOpen: boolean
  handleConfirm: () => void
  handleClose: () => void
  modalContent?: React.ReactNode
  text?: {
    headerText?: React.ReactNode
    cancelText?: React.ReactNode
    confirmText?: React.ReactNode
  }
}
const DialogModal = (props: IProps) => {
  const { isOpen, handleConfirm, handleClose, modalContent, text } = props

  return (
    <Modal
      onClose={handleClose}
      closeable={false}
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.auto}
      role={ROLE.dialog}
    >
      {text?.headerText && <ModalHeader>{text.headerText}</ModalHeader>}
      <ModalBody>{modalContent}</ModalBody>
      <ModalFooter>
        <ModalButton kind={ButtonKind.tertiary} onClick={handleClose}>
          {text?.cancelText || 'Cancel'}
        </ModalButton>
        <ModalButton onClick={handleConfirm}>
          {text?.confirmText || 'Confirm'}
        </ModalButton>
      </ModalFooter>
    </Modal>
  )
}

export default DialogModal

export const useDialogModal = (): IUseDialogModalReturnValue => {
  const [isOpen, setIsOpen] = useState(false)

  const close = () => setIsOpen(false)

  const open = () => setIsOpen(true)

  return { isOpen, open, close }
}

export interface IUseDialogModalReturnValue {
  isOpen: boolean
  open: () => void
  close: () => void
}
