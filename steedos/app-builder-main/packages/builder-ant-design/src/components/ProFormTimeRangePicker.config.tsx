export const configProFormTimeRangePicker = {
  name: '@steedos/builder-form:TimeRangePicker',
  inputs: [
    { name: 'name', type: 'text', defaultValue: 'timeRange', required: true },
    { name: 'label', type: 'text', defaultValue: 'TimeRange Picker', required: true },
    { name: 'readonly', type: 'boolean', defaultValue: false },
    { name: 'width', type: 'string', defaultValue: 'md', enum: ['xs', 'sm', 'md', 'lg', 'xl'] },
    { name: 'disabled', type: 'boolean', defaultValue: false, helperText: '禁用' },
    { name: 'rules',  type: 'list', subFields: [
      { name: 'required', type: 'boolean', defaultValue: false },
      { name: 'message', type: 'string', defaultValue: 'Please select time' }
    ], helperText: '控制组件是否必填和校验信息'},
    {
      name: 'fieldProps', type: 'object', subFields: [
        { name: 'allowClear', type: 'boolean', defaultValue: true, helperText: '是否显示清除按钮' },
        { name: 'autoFocus', type: 'boolean', defaultValue: false, helperText: '自动获取焦点' },
        { name: 'inputReadOnly', type: 'boolean', defaultValue: false, helperText: '设置输入框为只读（避免在移动设备上打开虚拟键盘）' }
      ]
    }
  ],
  defaultStyles: {
    display: 'block',
    marginTop: '0',
  },
  canHaveChildren: false,
  requiresParent: {
    message: 'This block must be inside a "Form" or "FormSection" or "FormList" or "Table" block',
    query: {
      'component.name': { $in: ['@steedos/builder-form:Form', '@steedos/builder-form:FormSection', '@steedos/builder-form:FormList', '@steedos/builder-form:Table'] }
    }
  }
};
