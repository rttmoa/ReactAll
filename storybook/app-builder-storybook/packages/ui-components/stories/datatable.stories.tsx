import * as React from "react"
import _ from 'lodash';
import request from 'umi-request';

import { DataTable } from "../src"

export default {
  title: "DataTable-UI",
}

const DATA = [
    { id: 1, name: 'Billy Simonns', age: 40, email: 'billy@salesforce.com' },
    { id: 2, name: 'Kelsey Denesik', age: 35, email: 'kelsey@salesforce.com' },
    { id: 3, name: 'Kyle Ruecker', age: 50, email: 'kyle@salesforce.com' },
    {
        id: 4,
        name: 'Krystina Kerluke',
        age: 37,
        email: 'krystina@salesforce.com',
    },
    { id: 5, name: 'Billy Simonns', age: 40, email: 'billy@salesforce.com' },
    { id: 6, name: 'Kelsey Denesik', age: 35, email: 'kelsey@salesforce.com' },
    { id: 7, name: 'Kyle Ruecker', age: 50, email: 'kyle@salesforce.com' },
    { id: 8, name: 'Billy Simonns', age: 40, email: 'billy@salesforce.com' },
    { id: 9, name: 'Kelsey Denesik', age: 35, email: 'kelsey@salesforce.com' },
    { id: 10, name: 'Kyle Ruecker', age: 50, email: 'kyle@salesforce.com' },
    { id: 11, name: 'Billy Simonns', age: 40, email: 'billy@salesforce.com' },
    { id: 12, name: 'Kelsey Denesik', age: 35, email: 'kelsey@salesforce.com' },
    { id: 13, name: 'Kyle Ruecker', age: 50, email: 'kyle@salesforce.com' },
    { id: 14, name: 'Billy Simonns', age: 40, email: 'billy@salesforce.com' },
    { id: 15, name: 'Kelsey Denesik', age: 35, email: 'kelsey@salesforce.com' },
    { id: 16, name: 'Kyle Ruecker', age: 50, email: 'kyle@salesforce.com' },
];

const COLUMNS = [
    { label: 'Name', fieldName: 'name', editable: true },
    {
        label: 'Age',
        fieldName: 'age',
        type: 'number',
        sortable: true,
        cellAttributes: { alignment: 'left' },
    },
    { label: 'Email', fieldName: 'email', type: 'lookup', editable: true  },
];

const recordMetadata = {
  name: 'name',
  email: 'email',
  website: 'url',
  amount: 'currency',
  phone: 'phoneNumber',
  closeAt: 'dateInFuture',
};

const loadData = async (params?: {pageSize:number, current:number}, sort?:any, filter?:any) => {
  // console.log('loadData请求数据') 
  // const data = await request('https://data-faker.herokuapp.com/collection', {
  //   params,
  //   method: 'POST',
  //   headers: {
  //       'Content-Type': 'application/json; charset=utf-8',
  //   },
  //   body: JSON.stringify({
  //       amountOfRecords: params?.pageSize,
  //       recordMetadata,
  //   }),
  // })
  // console.log("Data结果", data);
  // const total = 100;
  // return {data, total}

  let total = 100;
  let data =  DATA;
  return {data, total}
}

const COLUMNS2 = [
  { label: 'Label', name: 'name', valueType: 'text', editable: true, filters: true },
  { label: 'Website', name: 'website', valueType: 'href', editable: true },
  { label: 'Phone', name: 'phone', valueType: 'text', editable: true },
  { label: 'CloseAt', name: 'closeAt', valueType: 'dateTime', editable: true, filters: true },
  { label: 'Balance', name: 'amount', valueType: 'number', editable: true },
];

export const DataTableAntD = () => {
  // const [data, setData] = React.useState(() => data)
  return (
    <DataTable
      columns={COLUMNS} 
      scroll={{ y: 300 }} 
      request={loadData}  
      size='small'
      editable={true}
      pagination={{pageSize: 10}}
    > 
    </DataTable>
  )
}