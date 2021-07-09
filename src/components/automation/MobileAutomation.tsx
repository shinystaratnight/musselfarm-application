import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import { Paragrapgh } from '../shared';
import DropdownMenu from '../shared/dropdown-menu/DropdownMenu';

interface ITableMobileHeader {
  data: any;
  handleOnEdit: (data: any, col?: string | undefined) => void;
  onDeleteRow: (data: any) => void;
}

const MobileAutomation: FC<ITableMobileHeader> = ({
  data,
  handleOnEdit,
  onDeleteRow,
}) => {
  const history = useHistory();

  return (
    <div className='table-mobile__card mb-12'>
      <div
        className={classNames('table-mobile__card-dots', {
          'hide-element': false,
        })}
      >
        <DropdownMenu
          data={data}
          column='isAutomation'
          onEdit={handleOnEdit}
          onDeleteRow={onDeleteRow}
          type='automations'
        />
      </div>
      <div className='d-flex pb-23 mt-24'>
        <div className='flex-basis-50'>
          <Paragrapgh size={3} color='black-2' align='left' fontWeight={400}>
            Contidion
          </Paragrapgh>
          <div className='d-flex align-items-center'>
            <div className='pr-6 tx-color-3'>{`IF ${data?.condition} Is`}</div>
          </div>
        </div>
        <div className='flex-basis-50'>
          <Paragrapgh size={3} color='black-2' align='left' fontWeight={400}>
            Action
          </Paragrapgh>
          <div className='d-flex align-items-center'>
            <div className='pr-6 tx-color-3'>{`${data?.action} Then`}</div>
          </div>
        </div>
      </div>
      <div className='d-flex pb-23'>
        <div className='flex-basis-100'>
          <Paragrapgh size={3} color='black-2' align='left' fontWeight={400}>
            Time
          </Paragrapgh>
          <div className='d-flex align-items-center'>
            <div className='pr-6 tx-color-3'>
              {data.time === 0 && <span>At the day</span>}
              {data.time > 0 && <span>{data.time} Day(s) After</span>}
              {data.time < 0 && <span>{-data.time} Day(s) Before</span>}
            </div>
          </div>
        </div>
      </div>
      <div className='d-flex pb-23'>
        <div className='flex-basis-100'>
          <Paragrapgh size={3} color='black-2' align='left' fontWeight={400}>
            Outcome
          </Paragrapgh>
          <div className='d-flex flex-direction-col'>
            <div className='mr-15 tx-left mb-15' style={{ width: 80 }}>
              Create Task
            </div>
            <div
              className='d-flex flex-direction-col tx-left'
              style={{ flex: 1 }}
            >
              <div>
                <span>Title:</span>
                <span>{data.outcome.title}</span>
              </div>
              <div>
                <span>Desc:</span>
                <span>
                  {data.outcome.description.length >= 70
                    ? `${data.outcome.description.slice(0, 70)}...`
                    : data.outcome.description}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAutomation;
