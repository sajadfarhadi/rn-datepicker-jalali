# RN-DATEPICKER-JALALI

![alt-text](https://github.com/sajadfarhadi/rn-datepicker-jalali/raw/master/help/rangePicker.png?raw=true)


## Installation

`$ npm install rn-datepicker-jalali`

## Date Picker

| props               | type                                | default                                                                                                             |
| ------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| open             | boolean                            |                                                                                                               |
| range           | boolean                       |                                                                                                 |
| onChange           | function                     | (value) =>  {}                                                                                                  |
| onClose           | function                     |  

## usage

```jsx
import React from "react";
import  DatePicker  from "rn-datepicker-jalali";

render(<DatePicker />, document.getElementById("root"));
