import React, { useState, FC } from 'react';
import moment from 'moment';

import toggleSecondMillisecond from '../../../util/toggleSecondMillisecond';

import ModalComponent from '../modal/Modal';
import Subtitle from '../subtitle/Subtitle';

import './styles.scss';

interface ITableMobileAssessment {
  data?: any;
  dotMenuField?: any;
  hideDots?: boolean | undefined;
}

const TableMobileAssessment: FC<ITableMobileAssessment> = ({
  data,
  dotMenuField,
}) => {
  const [infoModal, setInfoModal] = useState(false);

  return (
    <div className='table-mobile__card'>
      <div className='table-mobile__card-dots'>{dotMenuField.render(data)}</div>

      <div className='d-flex pb-23'>
        <div className='flex-basis-50'>
          <Subtitle size={3} color='black-2' align='left' fontWeight={400}>
            Date of assessment
          </Subtitle>
          <Subtitle size={5} color='black-5' align='left' fontWeight={400}>
            {moment(
              data?.created_at
                ? toggleSecondMillisecond(data?.created_at)
                : 1611220802422,
            ).format('DD.MM.YYYY')}
          </Subtitle>
        </div>
        <div className='flex-basis-50 ml-24'>
          <Subtitle size={3} color='black-2' align='left' fontWeight={400}>
            Colour
          </Subtitle>
          <Subtitle size={5} color='black-5' align='left' fontWeight={400}>
            {data?.color}
          </Subtitle>
        </div>
      </div>

      <div className='d-flex pb-23'>
        <div className='flex-basis-50'>
          <Subtitle size={3} color='black-2' align='left' fontWeight={400}>
            Condition min
          </Subtitle>
          <Subtitle size={5} color='black-5' align='left' fontWeight={400}>
            {data?.condition_min}
          </Subtitle>
        </div>
        <div className='flex-basis-50 ml-24'>
          <Subtitle size={3} color='black-2' align='left' fontWeight={400}>
            Condition max
          </Subtitle>
          <Subtitle size={5} color='black-5' align='left' fontWeight={400}>
            {data?.condition_max}
          </Subtitle>
        </div>
      </div>

      <div className='d-flex pb-23'>
        <div className='flex-basis-50'>
          <Subtitle size={3} color='black-2' align='left' fontWeight={400}>
            Condition average
          </Subtitle>
          <Subtitle size={5} color='black-5' align='left' fontWeight={400}>
            {data?.condition_average}
          </Subtitle>
        </div>
        <div className='flex-basis-50 ml-24'>
          <Subtitle size={3} color='black-2' align='left' fontWeight={400}>
            Blues
          </Subtitle>
          <Subtitle size={5} color='black-5' align='left' fontWeight={400}>
            {data?.blues}
          </Subtitle>
        </div>
      </div>

      <div className='d-flex pb-23'>
        <div className='flex-basis-50'>
          <Subtitle size={3} color='black-2' align='left' fontWeight={400}>
            Tonnes
          </Subtitle>
          <Subtitle size={5} color='black-5' align='left' fontWeight={400}>
            {data?.tones}
          </Subtitle>
        </div>
        <div className='flex-basis-50 ml-24'>
          <Subtitle size={3} color='black-2' align='left' fontWeight={400}>
            Planned harvest date
          </Subtitle>
          <Subtitle size={5} color='black-5' align='left' fontWeight={400}>
            {moment(toggleSecondMillisecond(data?.planned_date_harvest)).format(
              'DD.MM.YYYY',
            )}
          </Subtitle>
        </div>
      </div>

      <div className='d-flex'>
        <div className='flex-basis-50'>
          <Subtitle size={3} color='black-2' align='left' fontWeight={400}>
            Comment
          </Subtitle>
          <Subtitle size={5} color='black-5' align='left' fontWeight={400}>
            <div
              className='btn__modal'
              onKeyDown={() => undefined}
              onClick={() => setInfoModal(prev => !prev)}
            >
              View
            </div>
          </Subtitle>
        </div>
      </div>

      <ModalComponent
        visible={infoModal}
        onCancel={() => setInfoModal(prev => !prev)}
        type=''
        title='Comment'
        text={data?.comment ? data?.comment : 'No comments yet'}
      />
    </div>
  );
};

export default TableMobileAssessment;
