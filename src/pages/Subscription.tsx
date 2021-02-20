import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import {
  Button,
  Feedback,
  Subtitle,
  Title,
  ModalComponent,
} from '../components/shared';
import Plan from '../components/subscription/Plan';
import SubscriptionModal from '../components/subscription/SubscriptionModal';
import CreditCardModal from '../components/subscription/CreditCardModal';
import Transaction from '../components/subscription/Transaction';
import CreditCard from '../components/subscription/CreditCard';
import { IRootState } from '../store/rootReducer';
import { AuthState } from '../store/auth/auth.type';
import { composeApi } from '../apis/compose';
import { IAlertInfo } from '../types/basicComponentsTypes';
import {
  ICardDetails,
  ISubscriptionState,
} from '../store/subscription/subscription.type';
import { setSubscriptionStatus } from '../store/subscription/subscription.actions';

const Subscription = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isSubModal, setIsSubModal] = useState(false);
  const [isCardModal, setIsCardModal] = useState(false);
  const [isAlertModal, setIsAlertModal] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [alertInfo, setAlertInfo] = useState<IAlertInfo>({
    type: '',
    title: '',
    text: '',
    buttonText: '',
  });
  const [cardDetails, setCardDetails] = useState<ICardDetails | null>(null);

  const authStore = useSelector<IRootState, AuthState['auth']>(
    state => state.auth.auth,
  );
  const subscriptionStatus = useSelector<IRootState, ISubscriptionState>(
    state => state.subscription,
  );

  const getSubscriptionStats = async () => {
    const responseData = await composeApi(
      {
        data: {},
        method: 'GET',
        url: 'api/subscription/get-subscription-status',
        requireAuth: true,
      },
      dispatch,
      authStore,
      history,
    );
    dispatch(setSubscriptionStatus(responseData));
  };

  const showAlertModal = (type: string) => {
    if (type === 'input_card') {
      setAlertInfo({
        type: 'warning',
        title: 'Warning',
        buttonText: 'OK',
        text: 'Please Add Payment Method',
      });
      setIsAlertModal(true);
    }
  };

  const onSubscribe = async (qty: number) => {
    setIsSubscribing(true);
    const responseData = await composeApi(
      {
        data: {
          card_number: cardDetails?.number,
          cvc: cardDetails?.cvv,
          plan_id: '1',
          expiration_month: cardDetails?.date.slice(0, 2),
          expiration_year: cardDetails?.date.slice(-2),
          quantity: qty,
          trial: 0,
        },
        method: 'POST',
        url: 'api/subscription/subscription',
        requireAuth: true,
      },
      dispatch,
      authStore,
      history,
    );
    if (responseData?.message === 'Successfully subscribed') {
      await getSubscriptionStats();
    }
    console.log(responseData);
    setIsSubscribing(false);
    setIsSubModal(false);
  };

  const getMessage = () => {
    if (subscriptionStatus?.status === 'not_subscribe') {
      return (
        <>
          You are not subcribed yet. You need to subscribe to continue using the
          platform.
        </>
      );
    }
    if (subscriptionStatus?.status === 'cancelled') {
      return (
        <>
          Your subscription has expired
          <span className='font-weight-500'> May 01, 2021.</span>
          You need to re-subscribe to continue using the platform.
        </>
      );
    }
    return <></>;
  };

  useEffect(() => {
    getSubscriptionStats();
  }, []);

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
        message={getMessage()}
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
        <Plan
          info={subscriptionStatus?.active_data}
          onSubscription={() =>
            cardDetails ? setIsSubModal(true) : showAlertModal('input_card')
          }
        />
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
        {!cardDetails && (
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
        )}
        {cardDetails && (
          <CreditCard
            card={cardDetails}
            onChangeCard={() => setIsCardModal(true)}
          />
        )}
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
        {!subscriptionStatus?.history ? (
          <Subtitle
            className='mb-10'
            size={1}
            color='black-3'
            align='default'
            fontWeight={400}
          >
            No Transactions yet
          </Subtitle>
        ) : (
          <Transaction
            className='mb-8'
            date='Mar 01, 2021'
            price='9.99'
            status='Paid'
          />
        )}
      </div>
      <SubscriptionModal
        textButton='Subscribe'
        onSubscribe={onSubscribe}
        onCancel={() => setIsSubModal(false)}
        visible={isSubModal}
        disabled={isSubscribing}
        title='Subscription'
      />
      <CreditCardModal
        textButton='Add card'
        onCancel={() => setIsCardModal(false)}
        onAdd={card => {
          setCardDetails(card);
          setIsCardModal(false);
        }}
        visible={isCardModal}
        title='Add credit card'
      />
      <ModalComponent
        type={alertInfo?.type}
        visible={isAlertModal}
        title={alertInfo?.title}
        text={alertInfo?.text}
        buttonText={alertInfo?.buttonText}
        onConfirm={() => setIsAlertModal(false)}
        onCancel={() => setIsAlertModal(false)}
      />
    </div>
  );
};

export default Subscription;
