import React from "react";
import { FormField, FormFieldProps } from "../form/FormField";
import { ObjectFieldLookup } from "./ObjectFieldLookup";

export type ObjectFieldProps = {
  label: string,
  objectApiName: string,
  fieldName: string,
  type: string,
  isRequired: boolean,
  isReadOnly: boolean,
  options: [],
  reference_to: string,
  enableAdd: boolean,
  readonly: boolean
} &  FormFieldProps

export function ObjectField(props:ObjectFieldProps) {

  const { objectApiName, fieldName, reference_to, type, readonly, ...rest} = props
  // 从对象定义中生成字段信息。
  const formFieldProps:FormFieldProps = {
    name: fieldName,
    valueType: type
  }

  switch (type) {
    case 'url':
      formFieldProps.valueType = 'href';
      break;
    case 'currency':
      formFieldProps.valueType = 'money';
      break;
    case 'autonumber':
      formFieldProps.valueType = 'index';
      break;
    case 'datetime':
      formFieldProps.valueType = 'dateTime';
      break;
    case 'boolean':
      formFieldProps.valueType = 'switch';
      break;
    case 'number':
      formFieldProps.valueType = 'digit';
      break;
    // case 'formula':
    
    // case 'master_detail':

    case 'select':{
      const valueEnum = {}
      props.options.map((option:any) => {
        valueEnum[option.value] = option.label;
      })
      formFieldProps.valueEnum = valueEnum;
      break;
    }
  }
 
  if (type === 'lookup') {
    return (
      <ObjectFieldLookup
        {...rest}
        label={props.label}
        name={fieldName}
        referenceTo={reference_to}
        enableAdd={true}
        placeholder={`请搜索${props.label}...`}
        readonly={readonly}
      />
    )
  } else {
    return (
      <FormField 
        {...rest}
        {...formFieldProps} 
      />
    )
  } 
}