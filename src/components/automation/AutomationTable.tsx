import React, { FC, useEffect } from 'react';
import { Table } from 'antd';
import classNames from 'classnames';

import './styles.scss';
import useColumns from '../shared/tables/useColumns';
import MobileAutomationTable from './MobileAutomationTable';
import DropdownMenu from '../shared/dropdown-menu/DropdownMenu';
import { useWidth } from '../../util/useWidth';

interface ITables {
  data: any[];
  column: string;
  isTableChild?: boolean;
  onEdit: (dat: any) => void;
  onDelete: (dat: any) => void;
}

const AutomationTable: FC<ITables> = ({
  data,
  column,
  isTableChild,
  onEdit,
  onDelete,
}) => {
  const columns = useColumns(column);
  const width = useWidth();

  const handleOnEdit = (dat: any) => {
    onEdit(dat);
  };

  const onDeleteRow = (dat: any) => {
    onDelete(dat);
  };

  const editField = {
    title: '',
    key: 'more',
    align: 'right',
    render: (d: any) => (
      <>
        <DropdownMenu
          data={d}
          column={column}
          onEdit={handleOnEdit}
          onDeleteRow={onDeleteRow}
          type='automations'
        />
      </>
    ),
  };

  const getColumns = () => {
    return [...columns, editField];
  };

  return (
    <>
      {width > 820 ? (
        <Table
          className={classNames(`budget table table--${column}`, {
            'table--is__shild': isTableChild,
          })}
          pagination={false}
          columns={getColumns()}
          dataSource={data}
        />
      ) : (
        <MobileAutomationTable
          data={data}
          handleOnEdit={handleOnEdit}
          onDeleteRow={onDeleteRow}
        />
      )}
    </>
  );
};

export default AutomationTable;
