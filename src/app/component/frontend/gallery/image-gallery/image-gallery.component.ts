import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import {ActivatedRoute,Route,Router} from '@angular/router';
import { FacebookService, UIParams, UIResponse, LoginResponse } from 'ngx-facebook';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {

  public imageDataList:any;
  public profile:any;

  constructor(private readonly meta: MetaService,public activatedRoute:ActivatedRoute,public router:Router,public facebook:FacebookService) { 
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

    if(this.activatedRoute.snapshot.params.id == null){
      this.activatedRoute.data.forEach(res=>{
        let result:any;
        result=res;
        this.imageDataList=res.imageGallery.res;
        // console.log(this.imageDataList)
  
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

    if(this.activatedRoute.snapshot.params.id != null) {
      this.activatedRoute.data.forEach(res=>{
        let result:any;
        result=res;
        this.imageDataList=res.imageGallery.image_list;
        // console.log(this.imageDataList)
  
      })
      for(let i in this.imageDataList){
        if(this.activatedRoute.snapshot.params.id == this.imageDataList[i]._id){
          console.log('id',this.imageDataList[i]._id)
        
      
    this.meta.setTitle('Arnie Fonseca - Image Gallery',this.imageDataList[i].title);
    this.meta.setTag('og:description', this.imageDataList[i].decription);
    this.meta.setTag('twitter:description', this.imageDataList[i].decription);
    this.meta.setTag('og:url','https://arniefonseca.influxiq.com/image-gallery/'+this.imageDataList[i]._id);
 
    this.meta.setTag('og:title', this.imageDataList[i].title);
    this.meta.setTag('twitter:title', this.imageDataList[i].title);
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', this.imageDataList[i].image);
    this.meta.setTag('twitter:image', this.imageDataList[i].image)
    this.meta.setTag('twitter:url','https://arniefonseca.influxiq.com/image-gallery/'+this.imageDataList[i]._id);
    }
    }
    }
    
  }


  viewDetails(val:any){
    this.router.navigateByUrl('/image-gallery/'+val._id)
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
  

  fbShare(val:any){
    // console.log(val)
    var url='https://arniefonseca.influxiq.com/image-gallery/'+ val._id;
    //console.log(url)

    let params: UIParams = {
      href: url,
      method: 'share'
    };
    this.facebook.ui(params).then((res:UIResponse)=>{
    }).catch(facebook=>{
      // console.log(facebook)
    });
  }

  // twitter share 

  twitterShare(val:any){
    // console.log(val)
    window.open('https://twitter.com/intent/tweet?url=https://arniefonseca.influxiq.com/image-gallery/'+ val._id);
  }

  // linkedin share 

  linkedinShare(val:any){
    // console.log(val)
    window.open('https://www.linkedin.com/shareArticle?mini=true&url=https://arniefonseca.influxiq.com/image-gallery/'+ val._id);
  }

  // tumblr share 

  tumblrShare(val:any){
    // console.log(val)
    window.open('http://www.tumblr.com/share?url=https://arniefonseca.influxiq.com/image-gallery/'+ val._id);
  }

}
