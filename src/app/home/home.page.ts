import { Component } from '@angular/core';
//import { initialize } from '@ionic/core';
//import { clear } from 'console';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  Temp_val_1: number = 0; // left operand
  comma_index = 0 // if the number has comma or not
  Is_New_Value = true; // to mange when display must be 0
  operator = '+'; // to hold calculation operation, default value is always '+' because 0 + number1 = number1
  res_to_show = 0; // the number that will be shown in display
  Buttons_Groups = [ // to use in for-loop in html
      ['AC', '%', '/'], 
      [7, 8, 9, '*'], 
      [4, 5, 6, '-'],
      [1, 2, 3, '+'],
      [0, '.', '=']
    ]; 

  constructor() {}
  
  get_value_type(nbr: any):boolean { // to manage the color of button
    if (typeof nbr === 'number' || nbr ==='.') {
      return true;
    }
    return false;
  }

  get_double_width_value(nbr: any):boolean { // to manage double width for two button (0 & =) in UI
    if (nbr === 0 || nbr === 'AC') {
      return true;
    }
    return false;
  }

  onClick(val: any) {
    if (typeof val === 'number') { // to check if user click on a number
      if (this.Is_New_Value) { // if the value is first digit of number replace it
        this.res_to_show = val;
        this.Is_New_Value = false;
        if (this.comma_index !== 0) { // if there is a comma in number
          this.res_to_show = this.res_to_show / Math.pow(10, this.comma_index);
          this.comma_index += 1;
        } 
     
      } else {
        if (this.comma_index !== 0) { // if there is a comma in number
          let tmp = this.res_to_show * Math.pow(10, this.comma_index);
          this.res_to_show = tmp + val;
          this.res_to_show = this.res_to_show / Math.pow(10, this.comma_index);
          this.comma_index += 1; // raise power index
        
        } else {
          let tmp = this.res_to_show * 10; // if not
          this.res_to_show = tmp + val;
        }
      }
    
    } else if (typeof val === 'string') {
      if (val === '.') { // check if the string is comma or an operator
        //this.res_to_show
        this.addcomma();
      
      } else if (val === 'AC') { 
        this.clear()

      } else { // are operator
        this.addoperator(val);
      }
    } 
  }

  addcomma() {
    this.comma_index = 1; // comma_index define the power of 10 to calculate result
  }

  clear() { // reset the calculator
    this.res_to_show = 0;
    this.Temp_val_1 = 0;
    this.operator = '+';
    this.Is_New_Value = true;
    this.comma_index = 0;
  }

  addoperator(op: string) {
    if (op === '%') { 
      this.calc_Percent(this.operator);
      this.operator = op; // save as last operand for the next calculating
      this.Is_New_Value = true;
      this.comma_index = 0;
      return;
    }

    switch (this.operator) { // calculate the last operand by clicking on new operand
      case '+':
        var tmp:number = 0;
        tmp = this.Temp_val_1 + this.res_to_show;
        this.Temp_val_1 = tmp; // letf operand
        break;

      case '-': 
        var tmp:number = 0;
        tmp = (this.Temp_val_1 - this.res_to_show);
        this.Temp_val_1 = tmp; // letf operand
        break;

      case '*':
        var tmp:number = 0;
        tmp = this.Temp_val_1 * this.res_to_show;
        this.Temp_val_1 = tmp; // letf operand
        break;

      case '/':
        var tmp:number = 0;  
        tmp = this.Temp_val_1 / this.res_to_show;
        this.Temp_val_1 = tmp; // letf operand
        break;
    }

    this.operator = op; // save as last operand for the next calculating
    this.Is_New_Value = true;
    this.comma_index = 0;

    if (op === '=') {
        this.res_to_show = this.Temp_val_1;
        this.Temp_val_1 = 0;
        this.operator = '+'; // set to default
        this.comma_index = 0;
    }   
  }

  calc_Percent(old_op: string) {
    this.res_to_show = this.res_to_show / 100;

    if (this.Temp_val_1 !== 0) {
      let temp = (this.Temp_val_1 * this.res_to_show); 

      switch (old_op) { // calculate the last operand by clicking on new percent
        case '+':
          this.Temp_val_1 = this.Temp_val_1 + temp;
          break;
  
        case '-': 
          this.Temp_val_1 = this.Temp_val_1 - temp;
          break;
  
        case '*':
          this.Temp_val_1 = this.Temp_val_1 * (temp / 100);
          break;
  
        case '/':
          this.Temp_val_1 = this.Temp_val_1 / (temp * 100);
          break;
      }
    }
  }
}
