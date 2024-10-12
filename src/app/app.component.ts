import { Component } from '@angular/core';
import { CalculatorComponent } from './calculator/calculator.component';  // Adjust path if necessary

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CalculatorComponent],  
})
export class AppComponent { }
