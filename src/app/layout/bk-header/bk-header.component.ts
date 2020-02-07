import { Component, OnInit, Inject  } from '@angular/core';
import { BkLeftdivComponent } from '../../../app/layout/bk-leftdiv/bk-leftdiv.component';
import { SidenavService } from '../../services/sidenav.service';

import {MatDialog} from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-bk-header',
  templateUrl: './bk-header.component.html',
  styleUrls: ['./bk-header.component.css']
})
export class BkHeaderComponent implements OnInit {
  public userCookies: any;     
  public user_data: any;
  public token: any;

  public user_full_name: any;

  constructor(public cookieService: CookieService, private sidenav: SidenavService, public dialog: MatDialog, public router: Router, public Header: HeaderComponent, public activeroute: ActivatedRoute) {}
  toggleActive:boolean = false;
  toggleRightSidenav() {
    this.toggleActive = !this.toggleActive;
    this.sidenav.toggle();
    // console.log('Clicked');
    
    
    
   }

  ngOnInit() {
    if (this.cookieService.get('user_details') != undefined && this.cookieService.get('user_details') != null && this.cookieService.get('user_details') != '') {
      // this.userCookies = JSON.parse(this.cookieService.get('user_details'));
      // this.token = this.cookieService.get('jwtToken')
      //console.log(this.userCookies.type);
      // this.user_full_name = this.userCookies.firstname + ' '+ this.userCookies.lastname ;
      // this.userid = this.userCookies._id;    
      }
  }

  logOut() {
    this.cookieService.deleteAll();
    this.router.navigateByUrl('/');
    // console.log("logout");
  }

}

