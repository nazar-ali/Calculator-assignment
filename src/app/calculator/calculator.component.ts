import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterOutlet } from '@angular/router';
import { CommaFormatPipe } from './Services/commaFormatPips/CommaFormatPip'; 

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  providers: [CommaFormatPipe] 
})
export class CalculatorComponent implements OnInit {

  inputStr: any;
  isChecked: boolean = true; 

  constructor(private commaFormatPipe: CommaFormatPipe) {} 

  ngOnInit(): void {
    this.inputStr = new FormGroup({
      text: new FormControl('')
    });
  }


  buttonClick(buttonElement: any) {
    console.log('Button clicked:', buttonElement);

    let buttonText = buttonElement.textContent;
    let currentText = this.inputStr.controls.text.value.replace(/,/g, ''); 

    console.log("replace with comma : ",currentText)

    if (buttonText === '.') {
      const lastNumberSegment = currentText.split(/[\+\-\*\/]/).pop(); 
      if (lastNumberSegment.includes('.')) return; 
    }

    if (currentText != null) {
      currentText += buttonText;
      let formattedValue;
      
      if (buttonText === '.' || currentText.includes('.')) {
        formattedValue = currentText;
      } else {
        formattedValue = this.commaFormatPipe.transform(currentText);
      }
      
      this.inputStr.controls.text.setValue(formattedValue); 
    } else {
      this.inputStr.controls.text.setValue(buttonText);
    }
  }

  clearDisplay() {
    const deleted = this.inputStr.controls.text.setValue('');
    console.log(deleted);
   return deleted;
  }

  calculatingValues() {
    const expression = this.inputStr.controls.text.value.replace(/,/g, '');

    console.log(expression)

    try {
      const result = eval(expression); 
      const formattedResult = this.commaFormatPipe.transform(result.toString()); 
      this.inputStr.controls.text.setValue(formattedResult); 
    } catch (e) {
      this.inputStr.controls.text.setValue('');
    }
  }

  deletLastItem() {
    let str = this.inputStr.controls.text.value.replace(/,/g, ''); 
    str = str.slice(0, -1);
    let formattedValue;
    if (str.includes('.')) {
      formattedValue = str;
    } else {
      formattedValue = this.commaFormatPipe.transform(str);
    }
    
    this.inputStr.controls.text.setValue(formattedValue); 
  }


  toggleSwitch() {
    this.isChecked = !this.isChecked;
    console.log('Switch toggled:', this.isChecked);
  }
}
