import React from 'react';


export default class GlobalFunction extends React.Component {
  constructor(props) {
    super(props);
    this.count = 0;
  }
  static get_year() {
    let Y = []
    for (let i = 1410; i >= 1300; i--) Y.push(i)
    return Y
  }
  static get_minute() {
    let M = []
    for (let i = 0; i <= 59; i++) {
      if (i < 10) M.push("0" + i)
      else M.push(i.toString())
    }
    return M
  }

  

  
 

 

  static getNameWeekday(day) {
    switch (day) {
      case 1:
        return 'شنبه';
      case 2:
        return 'یکشنبه';
      case 3:
        return 'دوشنبه';
      case 4:
        return 'سه شنبه';
      case 5:
        return 'چهارشنبه';
      case 6:
        return 'پنجشنبه';
      case 7:
        return 'جمعه ';
    }
  }
  static Set_day_persion(date) {
    switch (date) {
      case 'Saturday':
        return 'شنبه';
      case 'Sunday':
        return 'یکشنبه';
      case 'Monday':
        return 'دوشنبه';
      case 'Tuesday':
        return 'سه شنبه';
      case 'Wednesday':
        return 'چهارشنبه';
      case 'Thursday':
        return 'پنجشنبه';
      case 'Friday':
        return 'جمعه ';
    }
  }



  static getmon(date) {
    switch (date) {
      case 1:
        return 'فروردین';
      case 2:
        return 'اردیبهشت';
      case 3:
        return 'خرداد';
      case 4:
        return 'تیر';
      case 5:
        return 'مرداد';
      case 6:
        return 'شهریور';
      case 7:
        return 'مهر';
      case 8:
        return 'آبان';
      case 9:
        return 'آذر';
      case 10:
        return 'دی';
      case 11:
        return 'بهمن';
      case 12:
        return 'اسفند';
    }
  }
}
