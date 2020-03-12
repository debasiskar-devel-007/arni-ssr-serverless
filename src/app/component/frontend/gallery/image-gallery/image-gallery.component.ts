import { Component, OnInit, Inject } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FacebookService, UIParams, UIResponse, LoginResponse } from 'ngx-facebook';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';

import { DomSanitizer } from '@angular/platform-browser';



export interface DialogData {

  data: any;
  img: any;
  fulldata: any;
}


@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {

  public imageDataList: any;
  public profile: any;
  public aspectratio:any;
  public croppedfiles:any;
  public crimage:any;
  public image_0:any;
  public image_1:any;
  // public img:any;

  constructor(private readonly meta: MetaService, public activatedRoute: ActivatedRoute, public router: Router, public facebook: FacebookService, public dialog: MatDialog,public sanitizer:DomSanitizer) {
    // this.meta.setTitle('Arnie Fonseca - Image Gallery');
    // this.meta.setTag('og:description', 'Check out the latest images and pictures of Arnie Fonseca and the events he has attended. This gallery is updated after each event, so you can regularly check it for the images of the latest events.');
    // this.meta.setTag('twitter:description', 'Check out the latest images and pictures of Arnie Fonseca and the events he has attended. This gallery is updated after each event, so you can regularly check it for the images of the latest events.');

    // this.meta.setTag('og:keyword', 'Arnie Fonseca Images, Arnie Fonseca Event Pictures, Arnie Fonseca Pictures');
    // this.meta.setTag('twitter:keyword', 'Arnie Fonseca Images, Arnie Fonseca Event Pictures, Arnie Fonseca Pictures');

    // this.meta.setTag('og:title', 'Arnie Fonseca - Image Gallery');
    // this.meta.setTag('twitter:title', 'Arnie Fonseca - Image Gallery');
    // this.meta.setTag('og:type', 'website');
    // this.meta.setTag('og:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
    // this.meta.setTag('twitter:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');

    facebook.init({
      appId: '2912281308815518',
      version: 'v2.9'
    });
  }

  ngOnInit() {

    if (this.activatedRoute.snapshot.params.id == null) {
      this.activatedRoute.data.forEach(res => {
        let result: any;
        result = res;
        this.imageDataList = res.imageGallery.res;
        console.log(this.imageDataList)

        
        for (let i in this.imageDataList) {
          let result: any;
          result = this.imageDataList[i].decription.length;
          this.imageDataList[i].imageTextLength = result;
          // this.img=i;
          // console.log('>>>',this.img)

    


          // this.aspectratio= this.imageDataList[i].aspectratio;
          // console.log( 'aaspectratio==',this.aspectratio)


          // this.croppedfiles= this.imageDataList[i].croppedfiles;
          // console.log('croppedfiles==',this.croppedfiles)

          // for(let j in  this.croppedfiles){
          //   this.crimage='data:image/png;base64,'+(this.sanitizer.bypassSecurityTrustStyle(this.croppedfiles[j]) as any).changingThisBreaksApplicationSecurity;
          //   console.log('>>>>',this.crimage);

          // }
          this.imageDataList[i].image_0=this.imageDataList[i].basepath+this.imageDataList[i].aspectratio[0]+"_"+this.imageDataList[i].imagepath;
          this.imageDataList[i].image_1=this.imageDataList[i].basepath+this.imageDataList[i].aspectratio[1]+"_"+this.imageDataList[i].imagepath;
           console.log('>>>>img0',this.imageDataList[i].image_0)
           console.log('>>>>img1',this.imageDataList[i].image_1)


        }

      })

      this.meta.setTitle('Arnie Fonseca - Image Gallery');
      this.meta.setTag('og:description', 'Check out the latest images and pictures of Arnie Fonseca and the events he has attended. This gallery is updated after each event, so you can regularly check it for the images of the latest events.');
      this.meta.setTag('twitter:description', 'Check out the latest images and pictures of Arnie Fonseca and the events he has attended. This gallery is updated after each event, so you can regularly check it for the images of the latest events.');

      this.meta.setTag('og:keyword', 'Arnie Fonseca Images, Arnie Fonseca Event Pictures, Arnie Fonseca Pictures');
      this.meta.setTag('twitter:keyword', 'Arnie Fonseca Images, Arnie Fonseca Event Pictures, Arnie Fonseca Pictures');

      this.meta.setTag('og:title', 'Arnie Fonseca - Image Gallery');
      this.meta.setTag('twitter:title', 'Arnie Fonseca - Image Gallery');
      this.meta.setTag('og:type', 'website');
      this.meta.setTag('og:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
      this.meta.setTag('twitter:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png')
    }

    if (this.activatedRoute.snapshot.params.id != null) {
      this.activatedRoute.data.forEach(res => {
        let result: any;
        result = res;
        this.imageDataList = res.imageGallery.image_list;
        // console.log(this.imageDataList)

      })
      for (let i in this.imageDataList) {
        if (this.activatedRoute.snapshot.params.id == this.imageDataList[i]._id) {


          let result: any;
          result = this.imageDataList[i].decription.length;
          this.imageDataList[i].imageTextLength = result;

          let val: any;
          val = this.imageDataList[i];

          this.openVideoModal(val)
          // console.log('id',this.imageDataList[i]._id)


          this.meta.setTitle('Arnie Fonseca - Image Gallery', this.imageDataList[i].title);
          this.meta.setTag('og:description', this.imageDataList[i].decription);
          this.meta.setTag('twitter:description', this.imageDataList[i].decription);
          this.meta.setTag('og:url', 'https://arniefonseca.influxiq.com/image-gallery/' + this.imageDataList[i]._id);

          this.meta.setTag('og:title', this.imageDataList[i].title);
          this.meta.setTag('twitter:title', this.imageDataList[i].title);
          this.meta.setTag('og:type', 'website');
          this.meta.setTag('og:image', this.imageDataList[i].image);
          this.meta.setTag('twitter:image', this.imageDataList[i].image)
          this.meta.setTag('twitter:url', 'https://arniefonseca.influxiq.com/image-gallery/' + this.imageDataList[i]._id);
        }
      }
    }

  }


  viewDetails(val: any) {
    this.router.navigateByUrl('/image-gallery/' + val._id)
  }

  // fb share section 

  login() {
    this.facebook.login()
      .then((res: LoginResponse) => {

        this.getProfile();
      })
      .catch();
  }
  getProfile() {
    this.facebook.api('me/?fields=id,name,email,picture')
      .then((res: any) => {

        this.profile = res;

      })
      .catch((error: any) => {

      });
  }


  fbShare(val: any) {
    // console.log(val)
    var url = 'https://arniefonseca.influxiq.com/image-gallery/' + val._id;
    //console.log(url)

    let params: UIParams = {
      href: url,
      method: 'share'
    };
    this.facebook.ui(params).then((res: UIResponse) => {
    }).catch(facebook => {
      // console.log(facebook)
    });
  }

  // twitter share 

  twitterShare(val: any) {
    // console.log(val)
    window.open('https://twitter.com/intent/tweet?url=https://arniefonseca.influxiq.com/image-gallery/' + val._id);
  }

  // linkedin share 

  linkedinShare(val: any) {
    // console.log(val)
    window.open('https://www.linkedin.com/shareArticle?mini=true&url=https://arniefonseca.influxiq.com/image-gallery/' + val._id);
  }

  // tumblr share 

  tumblrShare(val: any) {
    // console.log(val)
    window.open('http://www.tumblr.com/share?url=https://arniefonseca.influxiq.com/image-gallery/' + val._id);
  }



  openVideoModal(val: any) {
    console.log(val)
    const dialogRef = this.dialog.open(ImageGalleryModalComponent, {
      // panelClass:['modal-md','success-modal'],
      panelClass: 'blogdetail_videomodal',
      // width:'450px',
      data: { img: val.image, fulldata: val }


    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }



}








//image modal
@Component({
  selector: 'app-imageModal',
  templateUrl: './imageModal.html'
})
export class ImageGalleryModalComponent {
  public profile: any;
  public fulldata: any;
  constructor(public dialogRef: MatDialogRef<ImageGalleryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public facebook: FacebookService) {
    facebook.init({
      appId: '2912281308815518',
      version: 'v2.9'
    });
  }
  // fb share section 

  login() {
    this.facebook.login()
      .then((res: LoginResponse) => {

        this.getProfile();
      })
      .catch();
  }
  getProfile() {
    this.facebook.api('me/?fields=id,name,email,picture')
      .then((res: any) => {

        this.profile = res;

      })
      .catch((error: any) => {

      });
  }


  fbShare(val: any) {
    console.log(val)
    var url = 'https://arniefonseca.influxiq.com/image-gallery/' + val._id;
    //console.log(url)

    let params: UIParams = {
      href: url,
      method: 'share'
    };
    this.facebook.ui(params).then((res: UIResponse) => {
    }).catch(facebook => {
      // console.log(facebook)
    });
  }

  // twitter share 

  twitterShare(val: any) {
    console.log(val)
    window.open('https://twitter.com/intent/tweet?url=https://arniefonseca.influxiq.com/image-gallery/' + val._id);
  }

  // linkedin share 

  linkedinShare(val: any) {
    // console.log(val)
    window.open('https://www.linkedin.com/shareArticle?mini=true&url=https://arniefonseca.influxiq.com/image-gallery/' + val._id);
  }

  // tumblr share 

  tumblrShare(val: any) {
    // console.log(val)
    window.open('http://www.tumblr.com/share?url=https://arniefonseca.influxiq.com/image-gallery/' + val._id);
  }


}


















