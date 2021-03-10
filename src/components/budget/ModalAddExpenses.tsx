import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Radio, Collapse } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';

import { IRootState } from '../../store/rootReducer';
import { IUtilState, IUtilData } from '../../store/utils/utils.type';
import { getUtilData } from '../../store/utils/utils.actions';

import {
  Button,
  CloseIcon,
  DollarIcon,
  Dropdown,
  Input,
  InputModal,
  PlusIcon,
  RadioButton,
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
}) => {
  const [expenses, setExpenses] = useState<IModalBudget[]>([
    {
      id: '1',
      expenses_name: '',
      price_budget: '',
      line_budget_id: paramId,
      type: 'select',
      budget_type: 'a',
    },
  ]);
  const [disabled, setDisabled] = useState(true);
  const width = useWidth();
  const dispatch = useDispatch();
  const history = useHistory();

  const seedData = useSelector<IRootState, IUtilState['seeds']>(
    state => state.utils.seeds,
  );

  const maintenanceData = useSelector<IRootState, IUtilState['maintenances']>(
    state => state.utils.maintenances,
  );

  useEffect(() => {
    dispatch(getUtilData('all', history));
  }, []);

  const handleOnConfirm = async () => {
    const newExpenses = expenses.map(item => {
      return {
        expenses_name: item.expenses_name,
        line_budget_id: Number(item.line_budget_id),
        type: type === 'seed' ? 's' : 'm',
        price_actual: item.budget_type === 'a' ? Number(item.price_budget) : 0,
        price_budget: item.budget_type === 'b' ? Number(item.price_budget) : 0,
        budget_type: item.budget_type,
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
        type: 'select',
        budget_type: 'a',
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
        type: 'select',
        budget_type: 'a',
      },
    ]);
    setDisabled(true);
  };

  const handleOnAddLineCustom = () => {
    const defaultId = expenses.length + 1;
    setExpenses([
      ...expenses,
      {
        id: defaultId.toString(),
        expenses_name: '',
        price_budget: '',
        line_budget_id: paramId,
        type: 'text',
        budget_type: 'a',
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

  const handleOnBudgetType = (value: string, id: string) => {
    setExpenses(
      expenses.map(item =>
        item.id === id ? { ...item, budget_type: value } : { ...item },
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
        type: 'select',
        budget_type: 'a',
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
      modalWidth={920}
    >
      <div>
        {expenses.map((expense, index) => (
          <div
            className='mb-12 budget__maintenance budget__maintenance--modal pos-relative d-flex align-items-center justify-content-between'
            key={expense.id}
          >
            <div className='budget__wrapper mr-16'>
              {type === 'seed' && expense.type === 'select' && (
                <Dropdown
                  className='mr-16 w-100'
                  placeholder='seed name'
                  onChange={(value, event) => handleOnName(value, expense.id)}
                  label='Seed name'
                  options={seedData.map(
                    (seed: IUtilData) =>
                      ({
                        value: seed.name,
                        label: seed.name,
                        id: seed.id,
                      } as IMainList),
                  )}
                  defaultValue={
                    expense.expenses_name ? expense.expenses_name : undefined
                  }
                />
              )}
              {type === 'seed' && expense.type === 'text' && (
                <Input
                  type='text'
                  onChange={e => handleOnName(e.target.value, expense.id)}
                  className='mr-16 w-100'
                  value={expense.expenses_name}
                  label='Seed name'
                  placeholder='seed name'
                />
              )}
              {type !== 'seed' && expense.type === 'select' && (
                <Dropdown
                  className='mr-16 w-100'
                  placeholder='maintenance name'
                  onChange={(value, event) => handleOnName(value, expense.id)}
                  label='Maintenance name'
                  options={maintenanceData.map(
                    (maintenance: IUtilData) =>
                      ({
                        value: maintenance.name,
                        label: maintenance.name,
                        id: maintenance.id,
                      } as IMainList),
                  )}
                  defaultValue={
                    expense.expenses_name ? expense.expenses_name : undefined
                  }
                />
              )}
              {type !== 'seed' && expense.type === 'text' && (
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
            <div className='budget__price-wrapper mr-16'>
              <Input
                type='number'
                onChange={e => handleOnPrice(e.target.value, expense.id)}
                value={expense.price_budget.toString()}
                unit={<DollarIcon />}
                label='Price'
                placeholder='0'
              />
            </div>
            <div className={index ? '' : 'pt-20'}>
              <Radio.Group
                className='d-flex'
                onChange={e => handleOnBudgetType(e.target.value, expense.id)}
                value={expense.budget_type}
              >
                <RadioButton label='Budgeted' value='b' />
                <RadioButton className='ml-34' label='Actual' value='a' />
              </Radio.Group>
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
      <div className='d-flex'>
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
        <Button
          className={width > 768 ? '' : 'mb-24'}
          color='blue'
          size={width > 768 ? 0 : 2}
          width={width > 768 ? 'default' : 'wide'}
          type='bordered'
          isNoneBorder={width > 768}
          iconLeft
          onClick={handleOnAddLineCustom}
        >
          <span className='mr-4 ml-6 font-size-0'>
            <PlusIcon />
          </span>
          <span>Add Custom</span>
        </Button>
      </div>
    </InputModal>
  );
};

export default ModalAddExpenses;
