---
sidebar_position: 3
sidebar_label: Cross-Object Formula
---

# What Is a Cross-Object Formula?

A Cross-object formula is a formula that spans two related objects and references merge fields on those objects. A cross-object formula can reference merge fields from a master (“parent”) object if an object is on the detail side of a master-detail relationship. A cross-object formula also works with lookup relationships.

You can reference fields from objects that are up to 10 relationships away. A cross-object formula is available anywhere formulas are used except when creating default values.

:::tip
If you create a formula that references a field on another object and display that formula in your page layout, users can see the field on the object even if they don’t have access to that object record. For example, if you create a formula field on the Case object that references an account field, and display that formula field in the case page layout, users can see this field even if they don’t have access to the account record.
:::

You can't include an object as the lookup field in a formula. To reference an object, reference the object's ID field or another field on the object. For example, Account.Owner is invalid because it references the object directly. account.owner.name or account.owner are valid references for your formula.

