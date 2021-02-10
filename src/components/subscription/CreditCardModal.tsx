import React, { ChangeEvent, FC, useState } from 'react';

import { InputModal, Input, Title } from '../shared';

import './styles.scss';
import { useWidth } from '../../util/useWidth';

interface IOwnProps {
  onCancel: () => void;
  visible: boolean;
  title: string;
  textButton: string;
}
const CreditCardModal: FC<IOwnProps> = ({
  textButton,
  title,
  onCancel,
  visible,
}) => {
  const width = useWidth();
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvc, setCVC] = useState('');
  const [date, setDate] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  const handleOnEmail = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEmail(e.target.value);
  };

  const handleOnCardHolder = (e: string) => {
    setCardHolder(e);
  };

  const handleOnDate = (e: string) => {
    setDate(e);
  };

  const handleOnCardNumber = (e: string) => {
    setCardNumber(e);
  };

  const handleOnCVC = (e: string) => {
    setCVC(e);
  };

  const clearState = () => {};

  const handleOnCancel = () => {
    clearState();
    onCancel();
  };

  const handleOnConfirm = () => {
    clearState();
    onCancel();
  };

  return (
    <InputModal
      visible={visible}
      onCancel={handleOnCancel}
      title={title}
      type='confirm'
      confirmNameBtn={textButton}
      onConfirm={handleOnConfirm}
    >
      <div
        className={
          width > 595 ? 'pos-relative pt-8 w-100 pb-21 mb-24' : 'w-100 mb-16'
        }
      >
        <div className='addCard credit-card'>
          <Input
            onChange={e => handleOnCardNumber(e.target.value)}
            type='text'
            className='mb-20 addCard__cardNumber'
            value={cardNumber}
            label='Card number'
            placeholder='Card number'
            required
          />
          <div className='d-flex justify-content-between card-inputs'>
            <div className='addCard__cardHolder mr-16'>
              <Input
                onChange={e => handleOnCardHolder(e.target.value)}
                type='text'
                value={cardHolder}
                label='Name on card'
                placeholder='John Doe'
                required
              />
            </div>
            <div className='addCard__date'>
              <Input
                className='addCard__expiration'
                onChange={e => handleOnDate(e.target.value)}
                type='text'
                value={date}
                label='Expiration'
                placeholder='MM / YY'
                required
              />
              {width < 596 && (
                <Input
                  className='addCard__cvc'
                  onChange={e => handleOnCVC(e.target.value)}
                  type='password'
                  value={cvc}
                  label='CVV'
                  placeholder='***'
                  required
                />
              )}
            </div>
          </div>
        </div>
        {width > 595 && (
          <div className='bg-card credit-card'>
            <div className='big-line w-100' />
            <div className='d-flex cvc justify-content-end'>
              <Input
                className='addCard__cvc mr-20'
                onChange={e => handleOnCVC(e.target.value)}
                type='password'
                value={cvc}
                label='CVV'
                placeholder='***'
                required
              />
            </div>
          </div>
        )}
      </div>
      <Input
        className='mb-24'
        type='email'
        onChange={handleOnEmail}
        value={email}
        label='Email'
        placeholder='email'
      />
    </InputModal>
  );
};

export default CreditCardModal;
