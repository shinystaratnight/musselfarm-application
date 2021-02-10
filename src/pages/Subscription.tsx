import React, { useState } from 'react';

import { Button, Feedback, Subtitle, Title } from '../components/shared';
import Plan from '../components/subscription/Plan';
import SubscriptionModal from '../components/subscription/SubscriptionModal';
import CreditCardModal from '../components/subscription/CreditCardModal';
import Transaction from '../components/subscription/Transaction';
import CreditCard from '../components/subscription/CreditCard';

const Subscription = () => {
  const [isSubModal, setIsSubModal] = useState(false);
  const [isCardModal, setIsCardModal] = useState(false);

  return (
    <div className='content pb-32'>
      <Title
        className='mb-28'
        size={5}
        color='black-3'
        align='default'
        fontWeight={700}
      >
        Plan & billing
      </Title>
      <Feedback
        className='mb-32'
        isWithoutClosable
        theme='light'
        message={
          <>
            Your subscription has expired{' '}
            <span className='font-weight-500'> May 01, 2021.</span> You need to
            re-subscribe to continue using the platform.
          </>
        }
        type='error'
      />
      <div>
        <Title
          className='mb-16'
          size={6}
          color='black-3'
          align='default'
          fontWeight={500}
        >
          Active subscription
        </Title>
        <Plan onSubscription={() => setIsSubModal(true)} />
      </div>
      <div className='sub-min-height'>
        <Title
          className='mb-16'
          size={6}
          color='black-3'
          align='default'
          fontWeight={500}
        >
          Payment method
        </Title>
        <Button
          className='mb-16'
          color='blue'
          size={2}
          width='default'
          type='fill'
          onClick={() => setIsCardModal(true)}
        >
          Add Payment method
        </Button>
        <CreditCard onChangeCard={() => setIsCardModal(true)} />
      </div>
      <div>
        <Title
          className='mb-16'
          size={6}
          color='black-3'
          align='default'
          fontWeight={500}
        >
          Last tansactions
        </Title>
        <Subtitle
          className='mb-10'
          size={1}
          color='black-3'
          align='default'
          fontWeight={400}
        >
          No Transactions yet
        </Subtitle>
        <Transaction
          className='mb-8'
          date='Mar 01, 2021'
          price='9.99'
          status='Paid'
        />
      </div>
      <SubscriptionModal
        textButton='Subscribe'
        onCancel={() => setIsSubModal(false)}
        visible={isSubModal}
        title='Subscription'
      />
      <CreditCardModal
        textButton='Add card'
        onCancel={() => setIsCardModal(false)}
        visible={isCardModal}
        title='Add credit card'
      />
    </div>
  );
};

export default Subscription;
