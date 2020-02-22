import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-high-performance-coaching',
  templateUrl: './high-performance-coaching.component.html',
  styleUrls: ['./high-performance-coaching.component.css']
})
export class HighPerformanceCoachingComponent implements OnInit {

  constructor(private readonly meta: MetaService) {
    this.meta.setTitle('Arnie Fonseca - High-Performance Coaching Program');
    this.meta.setTag('og:description', 'Arnie Fonseca’s High-Performance Coaching Program will help you improve and perform in your workplace at very high levels of success, enabling you and your organization to grow.');
    this.meta.setTag('twitter:description', 'Arnie Fonseca’s High-Performance Coaching Program will help you improve and perform in your workplace at very high levels of success, enabling you and your organization to grow.');

    this.meta.setTag('og:keyword', 'High-Performance Coaching, High-Performance Coaching By Coach Arnie, Arnie Fonseca’s High-Performance Coaching');
    this.meta.setTag('twitter:keyword', 'High-Performance Coaching, High-Performance Coaching By Coach Arnie, Arnie Fonseca’s High-Performance Coaching');

    this.meta.setTag('og:title', 'Arnie Fonseca - High-Performance Coaching Program');
    this.meta.setTag('twitter:title', 'Arnie Fonseca - High-Performance Coaching Program');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
    this.meta.setTag('twitter:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
  }

  ngOnInit() {
  }

}
