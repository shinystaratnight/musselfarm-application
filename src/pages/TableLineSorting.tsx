import React, { useEffect, useState, FC } from 'react';
import CompareString from './FarmLine/CompareString';
import CompareDate from './FarmLine/CompareDate';

const TableLineSorting = (array: any[], order: string, columnName: any) => {
  const newArray = array;
  // a-b = asc
  // b-a = desc
  if (order === 'ascend') {
    // eslint-disable-next-line default-case
    switch (columnName) {
      case 'line_name':
        newArray.sort((a: any, b: any) => {
          return CompareString(a.line_name, b.line_name);
        });
        break;
      case 'length':
        newArray.sort((a: any, b: any) => a.length - b.length);
        break;
      case 'seeded_date':
        newArray.sort((a: any, b: any) => {
          if (a?.group !== null && a?.line_idle === null) {
            return CompareDate(a?.group?.planned_date, b?.group?.planned_date);
          }
          return a?.line_idle.length - b?.line_idle.length;
        });
        break;
      case 'planned_date':
        newArray.sort((a: any, b: any) => {
          if (a?.group !== null && a?.line_idle === null) {
            return CompareDate(a?.group?.planned_date, b?.group?.planned_date);
          }
          return CompareDate(
            a?.group?.planned_date_harvest_original,
            b?.group?.planned_date_harvest_original,
          );
        });
        break;
      case 'seed':
        newArray.sort((a: any, b: any) => {
          return CompareString(a?.group?.seed, b?.group?.seed);
        });
        break;
      case 'profile_per_meter':
        newArray.sort(
          (a: any, b: any) =>
            a?.group?.profit_per_meter - b?.group?.profit_per_meter,
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
        newArray.sort((a: any, b: any) => {
          return CompareString(a.line_name, b.line_name);
        });
        break;
      case 'length':
        newArray.sort((a: any, b: any) => b.length - a.length);
        break;
      case 'seeded_date':
        newArray.sort((a: any, b: any) => {
          if (b?.group !== null && b?.line_idle === null) {
            return CompareDate(b?.group?.planned_date, a?.group?.planned_date);
          }
          return b?.line_idle.length - a?.line_idle.length;
        });
        break;
      case 'planned_date':
        newArray.sort((a: any, b: any) => {
          if (b?.group !== null && b?.line_idle === null) {
            return CompareDate(b?.group?.planned_date, a?.group?.planned_date);
          }
          return CompareDate(
            b?.group?.planned_date_harvest_origina,
            a?.group?.planned_date_harvest_origina,
          );
        });
        break;
      case 'seed':
        newArray.sort((a: any, b: any) => {
          return CompareString(b?.group?.seed, a?.group?.seed);
        });
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
