import React, { useEffect, useState, FC } from 'react';

const dateToTimeStamp = (date: Date) => {
  return new Date(date).getTime();
};

const TableLineSorting = (array: any[], order: string, columnName: any) => {
  const newArray = array;
  // a-b = asc
  // b-a = desc

  if (order === 'ascend') {
    // eslint-disable-next-line default-case
    switch (columnName) {
      case 'line_name':
        newArray.sort((a: any, b: any) => {
          return a.line_name.localeCompare(b.line_name, 'en', {
            numeric: true,
          });
        });
        break;
      case 'length':
        newArray.sort((a: any, b: any) => a.length - b.length);
        break;
      case 'seeded_date':
        newArray.sort((a: any, b: any) => {
          return (
            Number(a?.group?.planned_date) - Number(b?.group?.planned_date)
          );
        });
        break;
      case 'planned_date':
        newArray.sort((a: any, b: any) => {
          if (a?.group !== null && a?.line_idle === null) {
            return (
              Number(a?.group?.planned_date) - Number(b?.group?.planned_date)
            );
          }
          return (
            Number(a?.group?.planned_date_harvest_original) -
            Number(b?.group?.planned_date_harvest_original)
          );
        });
        break;
      case 'seed':
        newArray.sort((a: any, b: any) => {
          return a?.group?.seed.localeCompare(b?.group?.seed, 'en', {
            numeric: true,
          });
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
          return b.line_name.localeCompare(a.line_name, 'en', {
            numeric: true,
          });
        });
        break;
      case 'length':
        newArray.sort((a: any, b: any) => b.length - a.length);
        break;
      case 'seeded_date':
        newArray.sort((a: any, b: any) => {
          return (
            Number(b?.group?.planned_date) - Number(a?.group?.planned_date)
          );
        });
        break;
      case 'planned_date':
        newArray.sort((a: any, b: any) => {
          if (b?.group !== null && b?.line_idle === null) {
            return (
              Number(b?.group?.planned_date) - Number(a?.group?.planned_date)
            );
          }
          return (
            Number(b?.group?.planned_date_harvest_original) -
            Number(a?.group?.planned_date_harvest_original)
          );
        });
        break;
      case 'seed':
        newArray.sort((a: any, b: any) => {
          return b?.group?.seed.localeCompare(a?.group?.seed, 'en', {
            numeric: true,
          });
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
