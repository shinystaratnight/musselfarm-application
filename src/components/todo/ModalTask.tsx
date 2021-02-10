import React, { FC, useState } from 'react';
import { Datepicker, InputModal, Dropdown } from '../shared';
import { IMainList } from '../../types/basicComponentsTypes';

import './styles.scss';

interface IOwnProps {
  type: string;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  visible: boolean;
}

const ModalTask: FC<IOwnProps> = ({
  type,
  onCancel,
  onConfirm,
  title,
  visible,
}) => {
  const [farm, setFarm] = useState('');
  const [line, setLine] = useState('');
  const [date, setDate] = useState('');
  const items: IMainList[] = [
    { value: 'Mussel Farm 2', label: 'Mussel Farm 2', id: 'MusselFarm2' },
    { value: 'Mussel Farm 3', label: 'Mussel Farm 3', id: 'MusselFarm3' },
    { value: 'Mussel Farm 1', label: 'Mussel Farm 1', id: 'MusselFarm1' },
  ];

  const itemsLine: IMainList[] = [
    { value: 'Line 2', label: 'Line 2', id: 'Line2' },
    { value: 'Line 3', label: 'Line 3', id: 'Line3' },
    { value: 'Line 1', label: 'Line 1', id: 'Line1' },
  ];

  const handleOnSelectFarm = (value: string) => {
    setFarm(value);
  };

  const handleOnSelectLine = (value: string) => {
    setLine(value);
  };

  const handleOnSelectDate = (value: string) => {
    setDate(value);
  };

  return (
    <InputModal
      visible={visible}
      onCancel={onCancel}
      title={title}
      type={type}
      onConfirm={onConfirm}
    >
      <Dropdown
        className='mb-16'
        placeholder='select farm'
        onChange={(value, event) => handleOnSelectFarm(value)}
        label='Select farm'
        options={items}
      />
      <Dropdown
        className='mb-16'
        placeholder='select line'
        onChange={(value, event) => handleOnSelectLine(value)}
        label='Select line'
        options={itemsLine}
      />
      <Datepicker
        className='mb-24'
        label='Date'
        required
        onRange={e => undefined}
        onChange={(e, value) => handleOnSelectDate(value)}
      />
    </InputModal>
  );
};

export default ModalTask;
