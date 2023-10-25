---
sidebar_position: 2
---

# Field Attributes

FIELD | DESCRIPTION
-- | --
Visible Lines | For long text area fields, set the number of lines to be displayed on edit pages. You can display between 2 and 50 lines (the default is 6 lines). If the text does not fit in the specified number of visible lines, scroll bars appear. Long text area fields are fully displayed on detail pages and printable views.
Calculation Options | Determines how a roll-up summary field is recalculated after its properties change. Choose Automatic calculation to recalculate a field the next time it’s displayed. Choose Force a mass recalculation of this field as a safety net option to force recalculation of the roll-up summary field values.
Data Type | The data type of a field determines what type of information is in the field. For example, a field with the Number data type contains a positive or negative integer. For more information on data types, see Custom Field Types.
Decimal Places | For currency, geolocation, number, and percent fields, this field represents the number of digits you can enter to the right of a decimal point. The system rounds the decimal numbers you enter, if necessary. For example, if you enter 4.986 in a field with Decimal Places set to 2, the number rounds to 4.99.
Default Value | The value to apply when a user creates a record. For checkbox custom fields, choose Checked or Unchecked as the default value to indicate the default when creating records. Don’t assign default values to fields that are both required and unique, because uniqueness errors can result. 
Description | Text that describes the custom field. This description is for administration purposes only and doesn’t display to users on record detail and edit pages that include the field.
Display Format | For auto-number fields, enter a Display Format to control formatting details such as the minimum number of leading zeros and any prefix or suffix for the number.Begin by entering the required minimum {0} as a placeholder for the auto-number without any leading zeros. Add any prefix to your number before this placeholder and insert any suffix text after the placeholder. Insert any date prefixes or suffixes in the form of {YY}, {YYYY}, {MM}, or {DD}, which represent the record creation date in Greenwich Mean Time (GMT).For information on using auto-number formats when entering your Display Format, see Auto-Number Formatting Examples.
Filter Criteria | The criteria used to select a group of records to calculate the value of a roll-up summary field.
Formulas | Enter the formula for the custom formula field or custom summary formula for reports.
Help Text | The text that displays in the field-level help hover text for this field.
Is Name Field | For external object fields of type text, specifies this custom field as the name field for the external object. Not available for text area fields. By default, the External ID standard field is the name field for the external object.If you select this checkbox, make sure that the External Column Name specifies a table column that contains name values. Each external object can have only one name field.For internal use only, Salesforce stores the value of the name field from each row that’s retrieved from the external system. This behavior doesn’t apply to external objects that are associated with high-data-volume external data sources.
Label | The name of the custom field as you want it to appear.
Length (for number, currency, percent fields) | For number, currency, and percent fields, the number of digits you can enter to the left of the decimal point, for example, 123.98 for an entry of 3.
Master Object | The object on the master side of a master-detail relationship used to display the value of a roll-up summary field.
Related To | For relationship fields, the name of the associated object.
Required | Makes the field required everywhere in Salesforce. Not available for external objects.You must specify a Default Value for required campaign member custom fields.Don’t assign default values to fields that are both required and unique, because uniqueness errors can result. 
Roll-Up Type | For roll-up summary fields, choose the type of calculation to make:COUNT: Totals the number of related records.SUM: Totals the values in the field you select in the Field to Aggregate option. Only number, currency, and percent fields are available.MIN: Displays the lowest value of the field you select in the Field to Aggregate option for all directly related records. Only number, currency, percent, date, and date/time fields are available.MAX: Displays the highest value of the field you select in the Field to Aggregate option for all directly related records. Only number, currency, percent, date, and date/time fields are available.
Starting Number | For auto-number fields, enter a Starting Number that’s less than 1 billion. .
Sharing Setting | For master-detail relationship fields, the Sharing Setting attribute determines the sharing access that users must have to a master record to create, edit, or delete its associated detail records.
Summarized Object | The object on the detail side of a master-detail relationship used to provide the values calculated in a roll-up summary field.
Unique | If checked, prevents duplicate field values.For text fields, you can control whether values that are identical except for their case are considered unique.
Values | For picklist fields, a list of available values (up to 255 characters for each value).