import { Component, OnInit } from '@angular/core';
import { HttpLoaderService } from '../http-loader.service';
import { AppComponent } from '../app.component';
// import { Router } from 'express';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-http-loader',
  templateUrl: './http-loader.component.html',
  styleUrls: ['./http-loader.component.css']
})
export class HttpLoaderComponent implements OnInit {
  httpLoading: boolean;
  constructor(private loaderService: HttpLoaderService, public activatedRoute: ActivatedRoute, public router: Router, public appComponent: AppComponent) {
    var urlArr: any = this.router.url.split("/");
    this.loaderService.isLoading.subscribe((v) => {
      // console.log(v)
      this.httpLoading = v;
    });  
}

  ngOnInit() {
  }

}
