import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  inputStr: any;

  ngOnInit(): void {
    this.inputStr = new FormGroup({
      text: new FormControl('')
    });
  }

  buttonClick(buttonElement: any) {
    let buttonText = buttonElement.textContent;
    let currentText = this.inputStr.controls.text.value.replace(/,/g, ''); 

    if (currentText != null) {
      currentText += buttonText;
      this.inputStr.controls.text.setValue(this.byAddingCommasBothIntegerAndDecimal(currentText)); 
    } else {
      this.inputStr.controls.text.setValue(buttonText);
    }
  }

  clearDisplay() {
    this.inputStr.controls.text.setValue('');
  }

  calculatingValues() {
    const expression = this.inputStr.controls.text.value.replace(/,/g, ''); 

    try {
      const result = eval(expression); 
      this.inputStr.controls.text.setValue(this.byAddingCommasBothIntegerAndDecimal(result)); 
    } catch (e) {
      this.inputStr.controls.text.setValue('Error');
    }
  }

  deletLastItem() {
    let str = this.inputStr.controls.text.value.replace(/,/g, ''); 
    str = str.slice(0, -1);
    this.inputStr.controls.text.setValue(this.byAddingCommasBothIntegerAndDecimal(str)); 
  }

 
  byAddingCommasBothIntegerAndDecimal(value: string): string {
    const [integerPart, decimalPart] = value.split('.'); 
    const regixAddCommasAfterThreeDigits = /\B(?=(\d{3})+(?!\d))/g
    const formattedInteger = integerPart.replace(regixAddCommasAfterThreeDigits,','); 
    return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger; 
  }
}
