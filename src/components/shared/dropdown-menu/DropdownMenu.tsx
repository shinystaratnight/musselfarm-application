import React, { FC, ReactNode, useState, useEffect, useRef } from 'react';
import { Dropdown, Menu } from 'antd';

import { useSelector } from 'react-redux';
import useMenuHandler from '../tables/useMenuHandler';
import DotsIcon from '../DotsIcon';
import { IRootState } from '../../../store/rootReducer';
import { ProfileState } from '../../../store/profile/profile.type';

import './styles.scss';

interface IDropdownMenu {
  data: any;
  type?: 'farms' | 'todo' | 'isModal' | 'isRedirect' | 'utils';
  icon?: ReactNode;
  column?: string;
  onEdit?: (data: any, col?: string | undefined) => void | undefined;
  onDeleteRow?: (data: any) => void;
  onDeactivate?: (data: any) => void;
  onActivateUser?: (data: any) => void;
  isRedirect?: undefined | string;
  isAdmin?: boolean;
  lineId?: string;
}

const DropdownMenu: FC<IDropdownMenu> = ({
  data,
  column,
  icon,
  type,
  onEdit,
  isRedirect,
  onDeleteRow,
  onDeactivate,
  onActivateUser,
  isAdmin = false,
  lineId,
}) => {
  const rowData = useRef<null | { isRedirectLine: false; farm_id: undefined }>(
    null,
  );
  const {
    onDelete,
    redirectToFarm,
    redirectToLine,
    redirectToEditFarm,
  } = useMenuHandler();

  const permission = useSelector<IRootState, ProfileState['permission']>(
    state => state.profile.permission,
  );

  const onCLickDropdown = (d: any, event: any): void => {
    event.stopPropagation();
    rowData.current = d;
  };

  const onInfoHandler = (dataRow: any): void => {
    if (column === 'isFarms') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      redirectToFarm(dataRow.id);
    }
    if (column === 'isFarm') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      redirectToLine(dataRow.farm_id, dataRow.id);
    }
  };

  const onEditHandler = (dataRow: any): void => {
    if (type === 'todo' && onEdit) {
      onEdit(dataRow);
    }

    if (column === 'isFarms') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      redirectToEditFarm(dataRow.id);
    }

    if (column === 'isUsers' && onEdit) {
      onEdit(dataRow);
    }

    if (column === 'isFarm' && onEdit) {
      onEdit(dataRow, column);
    }

    if (column === 'isLine' && onEdit) {
      onEdit(dataRow, column);
    }

    if (column === 'isUtil' && onEdit) {
      onEdit(dataRow, column);
    }

    if (type === 'isModal' && onEdit) {
      onEdit(dataRow);
    }

    if (type === 'isRedirect' && onEdit) {
      onEdit(dataRow);
    }
  };

  const menuClickHandler = ({ key, domEvent }: any) => {
    domEvent.stopPropagation();

    if (key === 'info' && type === 'farms') {
      onInfoHandler(rowData.current);
    }

    if (key === 'edit') {
      onEditHandler(rowData.current);
    }

    if (key === 'deactivate' && onDeactivate) {
      onDeactivate(rowData.current);
    }

    if (key === 'activate' && onActivateUser) {
      onActivateUser(rowData.current);
    }

    if (
      key === 'delete' &&
      column !== 'isUsers' &&
      column !== 'isBudgetLog' &&
      column !== 'isUtil'
    ) {
      let redirect;
      if (column === 'isFarms') {
        redirect = isRedirect;
      }
      if (column === 'isFarm' && rowData?.current?.isRedirectLine) {
        redirect = `/farms/${rowData?.current?.farm_id}`;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onDelete(rowData.current, column, redirect, lineId);
    }

    if (
      key === 'delete' &&
      onDeleteRow &&
      (column === 'isUsers' || column === 'isBudgetLog' || column === 'isUtil')
    ) {
      onDeleteRow(rowData.current);
    }
  };

  const menu = (
    <Menu onClick={menuClickHandler}>
      {type === 'farms' &&
        column !== 'isLine' &&
        column !== 'isUsers' &&
        column !== 'isBudgetLog' && <Menu.Item key='info'>Info</Menu.Item>}
      {column !== 'isUsers' &&
        column !== 'isBudgetLog' &&
        permission?.isEdit && <Menu.Item key='edit'>Edit</Menu.Item>}
      {column === 'isUsers' &&
        data.status === 'active' &&
        permission?.isEdit && <Menu.Item key='edit'>Edit</Menu.Item>}
      {column === 'isUsers' &&
        data.status !== 'deactivated' &&
        data.status !== 'pending' && (
          <Menu.Item key='deactivate'>Deactivate</Menu.Item>
        )}
      {column === 'isUsers' && data.status === 'deactivated' && (
        <Menu.Item key='activate'>Activate</Menu.Item>
      )}
      {permission?.isEdit && <Menu.Item key='delete'>Delete</Menu.Item>}
    </Menu>
  );

  const userAdminMenu = (
    <>
      {data?.role !== 'admin' && (
        <Menu onClick={menuClickHandler}>
          {column === 'isUsers' && data?.status === 'active' && (
            <Menu.Item key='edit'>Edit</Menu.Item>
          )}
          {data?.status !== 'deactivated' && data?.status !== 'pending' && (
            <Menu.Item key='deactivate'>Deactivate</Menu.Item>
          )}
          {data?.status === 'deactivated' && (
            <Menu.Item key='activate'>Activate</Menu.Item>
          )}
          <Menu.Item key='delete'>Delete</Menu.Item>
        </Menu>
      )}
    </>
  );

  return (
    <div className='dropdown'>
      <Dropdown
        overlay={isAdmin ? userAdminMenu : menu}
        placement='bottomRight'
        trigger={['click']}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-use-before-define,react/jsx-no-bind
        onClick={onCLickDropdown.bind(null, data)}
      >
        <div>{icon || <DotsIcon />}</div>
      </Dropdown>
    </div>
  );
};

export default DropdownMenu;
