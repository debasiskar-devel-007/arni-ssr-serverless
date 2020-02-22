import { Component, OnInit } from '@angular/core';

import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})
export class BioComponent implements OnInit {

  constructor(private readonly meta: MetaService) {


    this.meta.setTitle('Arnie Fonseca - Who Is Coach Arnie?');
    this.meta.setTag('og:description', 'Want to know more About Arnie Fonseca, the Personal Development Mentor fondly known by many as Coach Arnie? Want to find out more About Coach Arnie before you join his program?');
    this.meta.setTag('twitter:description', 'Want to know more About Arnie Fonseca, the Personal Development Mentor fondly known by many as Coach Arnie? Want to find out more About Coach Arnie before you join his program?');

    this.meta.setTag('og:keyword', 'About Arnie Fonseca, About Coach Arnie, Who Is Coach Arnie, Who Is Arnie Fonseca');
    this.meta.setTag('twitter:keyword', 'About Arnie Fonseca, About Coach Arnie, Who Is Coach Arnie, Who Is Arnie Fonseca');

    this.meta.setTag('og:title', 'Arnie Fonseca - Who Is Coach Arnie?');
    this.meta.setTag('twitter:title', 'Arnie Fonseca - Who Is Coach Arnie?');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
    this.meta.setTag('twitter:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
  }

  ngOnInit() {
  }

}
