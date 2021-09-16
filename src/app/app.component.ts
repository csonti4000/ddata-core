import { Component } from '@angular/core';
import { BaseModel } from 'ddata-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ddata-lib';
  model = new Teszt();
}

class Teszt extends BaseModel {
  date: Date = new Date();
}
