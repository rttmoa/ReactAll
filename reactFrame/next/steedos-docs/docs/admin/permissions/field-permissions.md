---
sidebar_position: 6
---

# Field Permissions

Field permissions specify the access level for each field in an object. 

## What Determines Field Access?

Several factors control whether users can view and edit specific fields in Steedos. You can control users’ access to fields at the record type, user, or field level.

- Page layouts—Set whether fields are visible, required, editable, or read only for a particular record type.
- Field-level security—Further restrict users’ access to fields by setting whether those fields are visible, editable, or read only. These settings override field properties set in the page layout if the field-level security setting is more restrictive.
- Permissions—Some user permissions override both page layouts and field-level security settings. For example, users with the “Edit Read Only Fields” permission can always edit read-only fields regardless of any other settings.
- Object required fields—Override field-level security or any less-restrictive settings on page layouts by making a custom field universally required.
- Lookup and system fields—If you enable the Require permission to view record names in lookup fields setting, you restrict who can view record names in lookup and system fields. Users must have Read access to these records or the View All Lookup Record Names permission to view this data.

## Field-Level Security

Field-level security settings let you restrict users’ access to view and edit specific fields.

Page layouts and field-level security settings determine which fields a user sees. The most restrictive field access settings of the two always applies. For example, you can have a field that’s required in a page layout but is read-only in the field-level security settings. The field-level security overrides the page layout, so the field remains read-only.


<!-- ## 字段权限

之前我们提到华炎魔方权限引擎是基于权限集来计算用户对每一个对象的相关权限的，华炎魔方权限引擎还进一步实现了不同权限集下的用户对每一个对象下的不同字段的权限计算，现在我们来看看如何为合同对象配置字段级的权限控制。

假设我们需要禁止公司的业务人员查看合同记录中与财务相关的字段，我们可以先新建一个名为”业务员“的简档，然后为该简档配置合同对象下的字段级权限。

要配置字段权限，请在”设置“应用中进入”公司设置→简档/权限集“界面，找到并进入要设置对象权限的简档或权限集记录详细界面，在”对象权限“子表中点击要设置字段权限的记录左侧序号链接来进入对象权限记录详细界面。

在对象权限记录详细界面我们可以看到底部有一个名为”字段权限“的子表，请按以下步骤来配置字段权限：

* 找到要设置权限的字段，并双击“允许查看”或“允许编辑”单元格，然后勾选单元格中的勾选框来编辑其相关权限。
* 点击表格空白处可以看到页面底部弹出了保存按钮，点击保存来保存字段权限配置。
* 如果需要重置该对象的字段配置，可以点击右上角的“重置字段权限”按钮。

我们只要把与财务相关的字段的”允许编辑“和”允许查看“勾选框去除即可实现业务人员查看合同记录时隐藏财务相关的字段。

在华炎魔方中查询数据时，这里配置的字段权限也会被华炎魔方权限引擎识别并叠加到最终查询条件中，整个查询计算过程请参考该文档顶部提到的 [权限计算 - 查询 示意图](https://console.steedos.cn/api/files/images/2T54fG8LvDhdkwazR)。 -->