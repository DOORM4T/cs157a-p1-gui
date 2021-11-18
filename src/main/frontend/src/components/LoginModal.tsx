import { Block } from 'baseui/block';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { useState } from 'react';
import DialogModal, { IUseDialogModalReturnValue } from './DialogModal';

const LOGIN_ENDPOINT = '/api/canLogin';
export const LoginModal = (props: { loginModal: IUseDialogModalReturnValue; }) => {
  const { loginModal } = props;
  const [id, setId] = useState('');
  const [pin, setPin] = useState('');

  const clear = () => {
    setId('');
    setPin('');
  };

  const handleSubmit = async () => {
    const endpoint = `${LOGIN_ENDPOINT}?cusID=${id}&pin=${pin}`;

    let canLogin = false;
    try {
      const response = await fetch(endpoint);
      canLogin = (await response.text()) === 'true' ? true : false; // API endpoint returns true/false as a String
    } catch (error) {
      console.error(error);
    }

    // TODO: Redirect to user/admin page
    alert(canLogin);

    if (!canLogin)
      return;
    loginModal.close();
    clear();
  };

  return (
    <DialogModal
      isOpen={loginModal.isOpen}
      handleClose={() => {
        loginModal.close();
        clear();
      }}
      handleConfirm={handleSubmit}
      text={{ headerText: 'Customer Login', confirmText: 'Create' }}
      modalContent={<Block minWidth="128px" maxWidth="750px">
        <form>
          <FormControl label={() => 'Customer ID'}>
            <Input
              clearable
              onChange={(e) => setId(e.currentTarget.value)}
              value={id} />
          </FormControl>
          <FormControl label={() => 'Customer PIN'}>
            <Input
              type="password"
              clearable
              onChange={(e) => setPin(e.currentTarget.value)}
              value={pin} />
          </FormControl>
        </form>
      </Block>} />
  );
};
