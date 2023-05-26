import { Builder, withChildren } from '@builder.io/react';

import { withFunctions } from './functions/withFunctions'
import { FieldObject } from './components/FieldObject';
import { FieldSection } from './components/FieldSection';
import { configFieldSection } from './components/FieldSection.cofig';
import { Field } from './components/Field';
import { configField } from './components/Field.config';
import { Form } from './components/Form';
import { configForm } from './components/Form.config';
import { configFieldObject } from './components/FieldObject.config';
import { Table } from './components/Table';
import { configTable } from './components/Table.config';

const FormWrap = withFunctions(Form, ['onValuesChange', 'initialValues', 'onFinish']);
Builder.registerComponent(withChildren(FormWrap), configForm);
Builder.registerComponent(withChildren(FieldSection), configFieldSection);
Builder.registerComponent(Field, configField);
Builder.registerComponent(withChildren(FieldObject), configFieldObject);

const tableWrap = withFunctions(Table, ['request']);
Builder.registerComponent(tableWrap, configTable);