import React, { FC, ReactNode, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Popover } from 'antd';

import Button from '../button/Button';
import { Input } from '../index';

import './styles.scss';
import { updateBudgetValue } from '../../../store/budget/budget.action';
import { IUpdateBudget } from '../../../types/apiDataTypes';

interface IOwnProps {
  children: ReactNode;
  className?: string;
  value: string;
  data: any;
  type: 'budgeted' | 'actual';
}

const BudgetTooltip: FC<IOwnProps> = ({
  type,
  className,
  children,
  value,
  data,
}) => {
  const query = new URLSearchParams(useLocation().search);
  const dispatch = useDispatch();
  const history = useHistory();
  const [count, setCount] = useState('');
  const [comment, setComment] = useState('');
  const [visible, setVisible] = useState(false);

  const onConfirm = () => {
    let sendData: IUpdateBudget = {};
    if (data.data_row === 'price') {
      sendData = {
        farm_id: data.farm_id,
        expenses_id: data.expenses_id,
        budget_id: data.budget_id,
        line_id: Number(query.get('line')),
        expenses_name: data.name,
        data_row: `${data.data_row}${
          type === 'budgeted' ? '_budget' : '_actual'
        }`,
        type: `${type === 'budgeted' ? 'b' : 'a'}`,
        value: count,
        comment,
      };
    } else {
      sendData = {
        budget_id: data.budget_id,
        farm_id: data.farm_id,
        line_id: Number(query.get('line')),
        data_row: `${data.data_row}${type === 'budgeted' ? '' : '_actual'}`,
        type: `${type === 'budgeted' ? 'b' : 'a'}`,
        value: count,
        comment,
      };

      if (data.data_row === 'length') {
        sendData.data_row = `${data.data_row}${
          type === 'budgeted' ? '_budget' : '_actual'
        }`;
      }
    }

    dispatch(
      updateBudgetValue(
        sendData,
        data.data_row === 'price' ? 'price' : 'budget-part',
        history,
      ),
    );
  };

  return (
    <Popover
      visible={visible}
      onVisibleChange={(v: boolean) => setVisible(v)}
      overlayClassName={className}
      placement='bottomLeft'
      content={
        <div>
          <Input
            onChange={e =>
              setCount(Number(e.target.value) > -1 ? e.target.value : '0')
            }
            type='number'
            value={count}
            className='mb-16'
            label='Value'
            placeholder={value}
          />
          <Input
            onChange={e => setComment(e.target.value)}
            type='textarea'
            value={comment}
            label='Comment'
            className='mb-20'
            placeholder=''
            isOptional
          />
          <div className='d-flex justify-content-end align-items-center'>
            <Button
              width='small'
              size={1}
              type='transparent'
              color='blue'
              onClick={() => setVisible(false)}
            >
              Cancel
            </Button>
            <Button
              width='small'
              size={3}
              type='fill'
              color='green'
              className='ml-16'
              onClick={onConfirm}
            >
              Submit
            </Button>
          </div>
        </div>
      }
      trigger='click'
    >
      {children}
    </Popover>
  );
};

export default BudgetTooltip;
