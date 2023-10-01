import React, { ReactElement } from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input/input'

interface DataSourceObject { value: string }
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface UseAutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>
  onSelect?: (item: DataSourceType) => void
  renderOption?: (item: DataSourceType) => ReactElement
}

const UseAutoComplete:React.FC<UseAutoCompleteProps> = (props) => {

  const { fetchSuggestions, } = props
  return (
    <div>
      
    </div>
  );
};

export default UseAutoComplete;