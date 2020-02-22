import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-personal-development-coaching',
  templateUrl: './personal-development-coaching.component.html',
  styleUrls: ['./personal-development-coaching.component.css']
})
export class PersonalDevelopmentCoachingComponent implements OnInit {

  constructor(private readonly meta: MetaService) {
    this.meta.setTitle('Arnie Fonseca - Personal Development Coaching Program');
    this.meta.setTag('og:description', 'Arnie Fonseca’s Personal Development Coaching Programs to help you become the best version of yourself so that you are able to achieve great satisfaction and happiness in every area of your life.');
    this.meta.setTag('twitter:description', 'Arnie Fonseca’s Personal Development Coaching Programs to help you become the best version of yourself so that you are able to achieve great satisfaction and happiness in every area of your life.');

    this.meta.setTag('og:keyword', 'Personal Development Coaching, Personal Development Program, Coaching Program For Personal Development');
    this.meta.setTag('twitter:keyword', 'Personal Development Coaching, Personal Development Program, Coaching Program For Personal Development');

    this.meta.setTag('og:title', 'Arnie Fonseca - Personal Development Coaching Program');
    this.meta.setTag('twitter:title', 'Arnie Fonseca - Personal Development Coaching Program');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
    this.meta.setTag('twitter:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
  }

  ngOnInit() {
  }

}
