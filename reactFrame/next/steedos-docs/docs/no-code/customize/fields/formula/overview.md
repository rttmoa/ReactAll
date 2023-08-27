---
sidebar_position: 1
---

# Formula Overview

## Where are Formulas Used in Steedos?

Many areas in Salesforce use formulas. Before you begin using formulas, review the differences in their uses.

USE FORMULAS FOR: | TO:
-- | --
Approval Processes | Define the criteria a record must meet to enter the approval process.
Approval Steps | Define the criteria a record must meet to enter the approval step.
Assignment Rules for Leads and Cases | Define the criteria the lead or case must meet for it to be assigned.
Custom Fields | Create custom formula fields that automatically calculate a value based on other values, merge fields, or expressions. Users can view formula fields on record detail pages but can’t see the underlying algorithm or edit the value of a formula field.
Data Validations | Verify that the data a user enters in a record meets the standards you specify before the user can save the record. A validation rule can include a formula such as CloseDate >= TODAY().
Default Field Values | Apply a value to a custom field when a user creates a record. Use formulas to define a default value such as TODAY() + 7.Users can change a default value. Default field values can be based on a formula using values, merge fields, or expressions you specify.
Formula Fields | Automatically calculate the value of a custom field using the values, merge fields, or expressions you specify. Users can’t change the value of a formula field.
Validation Rules | Prevent users from entering an invalid value in a standard or custom field. Validation rules can be based on formulas and display an error message to users when the value they enter is not valid.
Workflow Field Updates | Automatically change the value of a field to a value you specify. The formula can include other values, merge fields, or expressions. You can set field updates to occur as a result of a workflow rule or an approval process.
Workflow Rules | Define the criteria a record must meet to trigger a workflow rule.


## Formula Data Types
The data type of a formula determines the type of data you expect returned from your formula.

DATA TYPE | DESCRIPTION
-- | --
Checkbox | Returns a true or false value. The field appears as a checkbox in record detail pages and reports. Use True for checked values and False for unchecked values.
Currency | Returns a number in currency format of up to 18 digits with a currency sign.NOTE Salesforce uses the round-half-to-even tie-breaking rule for currency fields. For example, 23.5 becomes 24, 22.5 becomes 22, −22.5 becomes −22, and −23.5 becomes −24.
Date | Returns data that represents a day on the calendar. The current date can be acquired by calling the built-in function TODAY() in a formula. This data type isn’t available for custom summary formulas in reports.
Date/Time | Returns data that represents a moment in time. A date/time field includes the date and also the time of day including hour, minutes, and seconds. You can insert the current date and time in a formula using the NOW() function. This data type isn’t available for custom summary formulas in reports.
Number | Returns a positive or negative integer or decimal of up to 18 digits. Salesforce uses the round half up tie-breaking rule for numbers in formula fields. For example, 12.345 becomes 12.35 and −12.345 becomes −12.35.NOTE A formula field of type Number can store more decimals than are defined. For more information, see "Data type number field can store more decimal places than defined."
Percent | Returns a number in percent format of up to 18 digits followed by a percent sign. Percent data is stored as a decimal divided by 100, which means that 90% is equal to 0.90.
Text | Returns a string of up to 3900 characters. To display text in addition to the formula output, insert that text in quotes. Use the text data type for text, text area, URL, phone, email, address, and auto-number fields. This data type isn’t available for custom summary formulas in reports.NOTE Text area isn’t a supported data type.
Time | Returns data that represents a moment in time, without the date. A time field includes the time of day by hour, minutes, seconds, and milliseconds. You can insert the current time in a formula using the TIMENOW() function.NOTE In formula expressions, use the international date format (ISO) for text arguments. For example, use TIMEVALUE("11:30:00.000") instead of TIMEVALUE("11:30 AM").

## Elements of a Formula

A formula can contain references to the values of fields, operators, functions, literal values, or other formulas.

Use any or all of these elements to build a formula.

### Literal Value

A text string or number you enter that is not calculated or changed. For example, if you have a value that’s always multiplied by 2% of an amount, your formula would contain the literal value of 2% of that amount:

```
ROUND((Amount*0.02), 2)
```

This example contains every possible part of a formula:

- A function called ROUND used to return a number rounded to a specified number of decimal places.
- A field reference called Amount.
- An operator, *, that tells the formula builder to multiply the contents of the Amount field by the literal value, 0.02.
- A literal number, 0.02. Use the decimal value for all percents. To include actual text in your formula, enclose it in quotes.
- The last number 2 in this formula is the input required for the ROUND function that determines the number of decimal places to return.

### Field Reference	

Reference the value of another custom or standard field using a merge field. The syntax for a merge field is field_name for a standard field or field_name__c for a custom field. The syntax for a merge field on a related object is object_name__r.field_name. 

### Function	

A system-defined formula that can require input from you and returns a value or values. For example, TODAY() does not require input but returns the current date. The TEXT(value) function requires your percent, number, or currency input and returns text.

### Operator	

A symbol that specifies the type of calculation to perform or the order in which to do it. For example, the + symbol specifies two values should be added. The open and close parentheses specify which expressions you want evaluated first.

### Comment	

An annotation within a formula that begins with a forward slash followed by an asterisk (/*). and concludes with an asterisk followed by a forward slash (*/). For example,

```
/*This is a formula comment*/
```

Comments are ignored when processing a formula.

Comments are useful for explaining specific parts of a formula to anyone viewing the formula definition. For example:

```
AND( 
/*competitor field is required, check to see if field is empty */
LEN(Competitor__c) = 0, 
/* rule only enforced for ABCD record types */
RecordType.Name = "ABCD Value",
/* checking for any closed status, allows for additional closed picklist values in the future */
CONTAINS(TEXT(StageName), "Closed") 
)
```

You can also use comments to comment out sections of your formula when debugging and checking the syntax to locate errors in the formula.
