import { Component } from '@angular/core';
import { Order } from './order.model';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent {
  model: Order = new Order("", 0, new Date(), "");

  onSubmit():void {
    console.log(this.model);    
  }
}
