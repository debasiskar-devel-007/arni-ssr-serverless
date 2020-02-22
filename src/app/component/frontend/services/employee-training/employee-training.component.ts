import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-employee-training',
  templateUrl: './employee-training.component.html',
  styleUrls: ['./employee-training.component.css']
})
export class EmployeeTrainingComponent implements OnInit {

  constructor(private readonly meta: MetaService) {
    this.meta.setTitle('Arnie Fonseca - Employee Training Program');
    this.meta.setTag('og:description', 'Train your employees to improve their performance using Arnie Fonseca’s Employee Training Program, and increase the overall output of your organization manifolds.');
    this.meta.setTag('twitter:description', 'Train your employees to improve their performance using Arnie Fonseca’s Employee Training Program, and increase the overall output of your organization manifolds.');

    this.meta.setTag('og:keyword', 'Employee Training Program, Employee Coaching Program, Training For Employees, Coaching For Employees');
    this.meta.setTag('twitter:keyword', 'Employee Training Program, Employee Coaching Program, Training For Employees, Coaching For Employees');

    this.meta.setTag('og:title', 'Arnie Fonseca - Employee Training Program');
    this.meta.setTag('twitter:title', 'Arnie Fonseca - Employee Training Program');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
    this.meta.setTag('twitter:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
  }

  ngOnInit() {
  }

}
