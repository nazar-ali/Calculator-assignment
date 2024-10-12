import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl, ReactiveFormsModule, FormsModule} from "@angular/forms"
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent implements OnInit {
   
  inputStr: any;

  ngOnInit(): void {
    this.inputStr = new FormGroup({
      text : new FormControl()
    })
  }

  buttonClick(buttonElement:any){
    let buttonText = buttonElement.textContent;
    this.inputStr.controls.text.setValue(buttonText)
  }     
}
