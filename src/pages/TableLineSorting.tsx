import React, { useEffect, useState, FC } from 'react';

const TableLineSorting = (array: any[], order: string, columnName: any) => {
  const newArray = array;
  // a-b = asc
  // b-a = desc

  if (order === 'ascend') {
    // eslint-disable-next-line default-case
    switch (columnName) {
      case 'line_name':
        newArray.sort((a: any, b: any) => {
          return a.line_name.length - b.line_name.length;
        });
        break;
      case 'length':
        newArray.sort((a: any, b: any) => a.length - b.length);
        break;
      case 'seeded_date':
        newArray.sort((a: any, b: any) => a.seeded_date - b.seeded_date);
        break;
      case 'planned_date_harvest':
        newArray.sort(
          (a: any, b: any) =>
            a?.group?.planned_date_harvest.length -
            b?.group?.planned_date_harvest.length,
        );
        break;
      case 'seed':
        newArray.sort((a: any, b: any) => a.seed - b.seed);
        break;
      case 'profile_per_meter':
        newArray.sort(
          (a: any, b: any) =>
            a.profit_per_meter.length - b.profit_per_meter.length,
        );
        break;
      case 'condition':
        newArray.sort((a: any, b: any) => a.condition - b.condition);
        break;
    }
  } else if (order === 'descend') {
    // eslint-disable-next-line default-case
    switch (columnName) {
      case 'line_name':
        newArray.sort(
          (a: any, b: any) => b.line_name.length - a.line_name.length,
        );
        break;
      case 'length':
        newArray.sort((a: any, b: any) => b.length - a.length);
        break;
      case 'seeded_date':
        newArray.sort((a: any, b: any) => b.seeded_date - a.seeded_date);
        break;
      case 'planned_date_harvest':
        newArray.sort(
          (a: any, b: any) =>
            b?.group?.planned_date_harvest.length -
            a?.group?.planned_date_harvest.length,
        );
        break;
      case 'seed':
        newArray.sort((a: any, b: any) => b.seed - a.seed);
        break;
      case 'profile_per_meter':
        newArray.sort(
          (a: any, b: any) =>
            b.profit_per_meter.length - a.profit_per_meter.length,
        );
        break;
      case 'condition':
        newArray.sort((a: any, b: any) => b.condition - a.condition);
        break;
    }
  }

  return newArray;
};

export default TableLineSorting;
