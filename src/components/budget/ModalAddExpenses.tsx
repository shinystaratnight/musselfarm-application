import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  Button,
  CloseIcon,
  DollarIcon,
  Dropdown,
  Input,
  InputModal,
  PlusIcon,
} from '../shared';
import { IMainList, IModalBudget } from '../../types/basicComponentsTypes';
import { createBudget } from '../../store/budget/budget.action';
import { useWidth } from '../../util/useWidth';

interface IOwnProps {
  onCancel: (type: string) => void;
  onConfirm: () => void;
  visible: boolean;
  className?: string;
  type: string;
  paramId: number;
  options?: IMainList[];
}

const ModalAddExpenses: FC<IOwnProps> = ({
  type,
  visible,
  onCancel,
  className,
  onConfirm,
  paramId,
  options,
}) => {
  const [expenses, setExpenses] = useState<IModalBudget[]>([
    {
      id: '1',
      expenses_name: '',
      price_budget: '',
      line_budget_id: paramId,
    },
  ]);
  const [disabled, setDisabled] = useState(true);
  const width = useWidth();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleOnConfirm = async () => {
    const newExpenses = expenses.map(item => {
      return {
        expenses_name: item.expenses_name,
        price_budget: Number(item.price_budget),
        line_budget_id: Number(item.line_budget_id),
        type: type === 'seed' ? 's' : 'm',
        price_actual: 0,
      };
    });

    await dispatch(createBudget({ expenses: newExpenses }, history));

    onConfirm();
    setExpenses([
      {
        id: '1',
        expenses_name: '',
        price_budget: '',
        line_budget_id: paramId,
      },
    ]);
  };

  const handleOnAddLine = () => {
    const defaultId = expenses.length + 1;
    setExpenses([
      ...expenses,
      {
        id: defaultId.toString(),
        expenses_name: '',
        price_budget: '',
        line_budget_id: paramId,
      },
    ]);
    setDisabled(true);
  };

  const handleOnPrice = (value: string, id: string) => {
    setExpenses(
      expenses.map(item =>
        item.id === id
          ? { ...item, price_budget: Number(value) > -1 ? value : '0' }
          : { ...item },
      ),
    );
  };

  const handleOnName = (value: string, id: string) => {
    let counter = 0;

    const newExpenses: IModalBudget[] = expenses.map(item => {
      if (item.id === id) {
        if (value !== '') {
          counter += 1;
        }
        return { ...item, expenses_name: value };
      }
      if (item.expenses_name !== '') {
        counter += 1;
      }
      return { ...item };
    });

    setDisabled(counter !== expenses.length);
    setExpenses(newExpenses);
  };

  const handleOnCancel = (defaultType: string) => {
    setExpenses([
      {
        id: '1',
        expenses_name: '',
        price_budget: '',
        line_budget_id: paramId,
      },
    ]);
    onCancel(defaultType);
  };

  const handleOnDeleteLine = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <InputModal
      visible={visible}
      onCancel={() => handleOnCancel(type)}
      title={
        type === 'seed' ? 'Add seeding expenses' : 'Add maintenance expenses'
      }
      type='confirm'
      onConfirm={handleOnConfirm}
      className={className}
      disabled={disabled}
    >
      <div>
        {expenses.map(expense => (
          <div
            className='mb-12 budget__maintenance budget__maintenance--modal pos-relative d-flex align-items-center justify-content-between'
            key={expense.id}
          >
            <div className='budget__wrapper mr-16'>
              {type === 'seed' ? (
                <Dropdown
                  className='mr-16 w-100'
                  onChange={(value, event) => handleOnName(value, expense.id)}
                  label='Seed name'
                  options={options as IMainList[]}
                  placeholder='seed name'
                />
              ) : (
                <Input
                  className='mr-16'
                  type='text'
                  value={expense.expenses_name}
                  placeholder='new maintenance'
                  onChange={e => handleOnName(e.target.value, expense.id)}
                  label='Maintenance name'
                />
              )}
            </div>
            <div className='budget__price-wrapper'>
              <Input
                type='number'
                onChange={e => handleOnPrice(e.target.value, expense.id)}
                value={expense.price_budget.toString()}
                unit={<DollarIcon />}
                label='Price'
                placeholder='0'
              />
            </div>
            <span
              className='budget__close-icon budget__close-icon--modal'
              onKeyDown={() => undefined}
              onClick={() => handleOnDeleteLine(expense.id)}
              role='button'
              tabIndex={0}
            >
              <CloseIcon />
            </span>
          </div>
        ))}
      </div>
      <Button
        className={width > 768 ? '' : 'mb-24'}
        color='blue'
        size={width > 768 ? 0 : 2}
        width={width > 768 ? 'default' : 'wide'}
        type='bordered'
        isNoneBorder={width > 768}
        iconLeft
        onClick={handleOnAddLine}
      >
        <span className='mr-4 ml-6 font-size-0'>
          <PlusIcon />
        </span>
        <span>Add</span>
      </Button>
    </InputModal>
  );
};

export default ModalAddExpenses;
