---
sidebar_position: 1.5
---

# formula field type

The data type of a formula determines the type of data you expect returned from your formula.


DATA TYPE | 	DESCRIPTION
-- | --
Checkbox|Returns a true or false value. The field appears as a checkbox in record detail pages and reports. Use True for checked values and False for unchecked values.
Currency|Returns a number in currency format of up to 18 digits with a currency sign.
Date|Returns data that represents a day on the calendar. The current date can be acquired by calling the built-in function TODAY() in a formula. This data type isn’t available for custom summary formulas in reports.
Date/Time|Returns data that represents a moment in time. A date/time field includes the date and also the time of day including hour, minutes, and seconds. You can insert the current date and time in a formula using the NOW() function. This data type isn’t available for custom summary formulas in reports.
Number|Returns a positive or negative integer or decimal of up to 18 digits. Salesforce uses the round half up tie-breaking rule for numbers in formula fields. For example, 12.345 becomes 12.35 and −12.345 becomes −12.35.
Percent|Returns a number in percent format of up to 18 digits followed by a percent sign. Percent data is stored as a decimal divided by 100, which means that 90% is equal to 0.90.
Text|Returns a string of up to 3900 characters. To display text in addition to the formula output, insert that text in quotes. Use the text data type for text, text area, URL, phone, email, address, and auto-number fields. This data type isn’t available for custom summary formulas in reports.
Time|Returns data that represents a moment in time, without the date. A time field includes the time of day by hour, minutes, seconds, and milliseconds. You can insert the current time in a formula using the TIMENOW() function.