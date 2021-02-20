import React, { FC } from 'react';

import './styles.scss';
import { Button, Paragrapgh, Subtitle } from '../shared';
import { useWidth } from '../../util/useWidth';

interface IOwnProps {
  onSubscription: () => void;
  info: any;
}

const Plan: FC<IOwnProps> = ({ onSubscription, info }) => {
  const width = useWidth();

  return (
    <div className='w-100 plan'>
      <div
        className={
          width > 520
            ? 'd-flex pb-20 line-bottom align-items-center justify-content-between'
            : 'd-flex pb-24 align-items-center justify-content-between'
        }
      >
        <div className={width > 520 ? 'ml-24' : 'ml-12'}>
          <Paragrapgh
            className='mb-4'
            size={width > 520 ? 2 : 3}
            color='black-2'
            align='default'
            fontWeight={500}
          >
            Your plan
          </Paragrapgh>
          <Subtitle
            size={width > 520 ? 1 : 4}
            color='black-3'
            align='default'
            fontWeight={400}
          >
            {info ? 10 : '--'} Farms
          </Subtitle>
        </div>
        <div>
          <Paragrapgh
            className='mb-4'
            size={width > 520 ? 2 : 3}
            color='black-2'
            align='default'
            fontWeight={500}
          >
            Active farms
          </Paragrapgh>
          <div className='d-flex align-items-center'>
            <Subtitle
              size={width > 520 ? 1 : 4}
              color='black-3'
              align='default'
              fontWeight={400}
            >
              {info ? 10 : '--'}
            </Subtitle>
            <Paragrapgh
              className='pl-8'
              size={width > 520 ? 2 : 3}
              color='black-3'
              align='default'
              fontWeight={400}
            >
              of {info ? 10 : '--'}
            </Paragrapgh>
          </div>
        </div>
        <div className={width > 520 ? 'mr-70' : 'mr-24'}>
          <Paragrapgh
            className='mb-4'
            size={width > 520 ? 2 : 3}
            color='black-2'
            align='default'
            fontWeight={500}
          >
            Expired
          </Paragrapgh>
          <Subtitle
            size={width > 520 ? 1 : 4}
            color='black-3'
            align='default'
            fontWeight={400}
          >
            {info ? 'May 01, 2021' : '-- / -- ----'}
          </Subtitle>
        </div>
      </div>
      <div className={width > 520 ? 'mt-16 ml-24' : 'mb-8 pl-12 pr-12'}>
        <Button
          color='blue'
          size={1}
          width={width > 520 ? 'normal' : 'wide'}
          type='bordered'
          onClick={onSubscription}
        >
          Start Subscription
        </Button>
      </div>
    </div>
  );
};

export default Plan;
