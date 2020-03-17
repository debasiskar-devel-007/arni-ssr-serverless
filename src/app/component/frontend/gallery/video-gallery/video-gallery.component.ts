import { Component, OnInit, Inject } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { ActivatedRoute, Router } from '@angular/router'
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';
import { FacebookService, UIParams, UIResponse, LoginResponse } from 'ngx-facebook';
import {ApiService} from '../../../../api.service';

export interface DialogData {

  data: any;
  data1: any;
  fulldata:any;
  url:any;
  flag:any;
}


// declare var $:any;
// var iframe           = $('iframe:first');
// var iframe_src       = iframe.attr('src');
// var youtube_video_id = iframe_src.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.css']
})
export class VideoGalleryComponent implements OnInit {

  // videoshow(){
  //   if (youtube_video_id.length == 11) {
  //     var video_thumbnail = $('<img src="//img.youtube.com/vi/'+youtube_video_id+'/0.jpg">');
  //     $('body').append(video_thumbnail);

  //     $('img:first').click(function() {
  //         $('iframe:first').fadeToggle('400');
  //     });
  //   }
  // }
  public videoDataList: any;
  public video_url: any = 'https://www.youtube.com/embed/';
  public safeUrl: any;
  public safeSrc: any;
  public profile: any;
  public videoTextLength: any;
  public indexVal:any=9;
  public searchLoadMore:boolean=false;
  public indexvallength:any;
  public vimeo_url:any='https://player.vimeo.com/video/'
  public safeUrlVimeo:any;
  public vimeothumblin:any='https://i.vimeocdn.com/video/';
  public vimeoimg:any;
  public vimeosafesrc:any;


  constructor(private readonly meta: MetaService, public activatedRoute: ActivatedRoute, public sanitizer: DomSanitizer, public dialog: MatDialog, public router: Router, public facebook: FacebookService,public apiService:ApiService) {
   
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
        this.videoDataList = res.videoGallery.video_list;
        this.indexvallength=this.videoDataList.length;
        // console.log(this.videoDataList, '+++++')
      })

      for (let i in this.videoDataList) {
        let result: any;
        let resultvimeo:any;
        // console.log('  this.safeUrl', result);

        if(this.videoDataList[i].type == 'youtube'){
          // console.log('youtube',this.videoDataList[i])
        result = this.videoDataList[i].video_url;
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.video_url + result);
        this.videoDataList[i].safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.video_url + result);
        this.videoDataList[i].videoTextLength = this.videoDataList[i].description_html.length;
        } 
        if(this.videoDataList[i].type == 'vimeo') {
          // console.log('vimeo',this.videoDataList[i])

        resultvimeo = this.videoDataList[i].video_url;
        this.safeUrlVimeo = this.sanitizer.bypassSecurityTrustResourceUrl(this.vimeo_url + resultvimeo);
        this.videoDataList[i].safeUrlVimeo = this.sanitizer.bypassSecurityTrustResourceUrl(this.vimeo_url + resultvimeo);
        this.videoDataList[i].videoTextLength = this.videoDataList[i].description_html.length;
        this.vimeoimg=this.sanitizer.bypassSecurityTrustResourceUrl(this.vimeothumblin + resultvimeo +'_200x150.webp');
        this.videoDataList[i].vimeoimg=this.sanitizer.bypassSecurityTrustResourceUrl(this.vimeothumblin + resultvimeo +'.jpg');
        // console.log(this.videoDataList[i].vimeoimg)
        }


      }
      this.meta.setTitle('Arnie Fonseca - Video Gallery');
      this.meta.setTag('og:description', 'Check out the latest videos from the events attended or hosted by Arnie Fonseca. This gallery is updated after each event, so you can regularly check it for the videos from the latest events.');
      this.meta.setTag('twitter:description', 'Check out the latest videos from the events attended or hosted by Arnie Fonseca. This gallery is updated after each event, so you can regularly check it for the videos from the latest events.');

      this.meta.setTag('og:keyword', 'Arnie Fonseca Videos, Arnie Fonseca Event Videos, Videos Of Arnie Fonseca');
      this.meta.setTag('twitter:keyword', 'Arnie Fonseca Videos, Arnie Fonseca Event Videos, Videos Of Arnie Fonseca');

      this.meta.setTag('og:title', 'Arnie Fonseca - Video Gallery');
      this.meta.setTag('twitter:title', 'Arnie Fonseca - Video Gallery');
      this.meta.setTag('og:type', 'website');
      this.meta.setTag('og:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png');
      this.meta.setTag('twitter:image', 'https://dev.arniefonseca.influxiq.com/assets/images/logo.png')
    }




    if (this.activatedRoute.snapshot.params.id != null) {
      this.activatedRoute.data.forEach(res => {
        let result: any;
        result = res;
        this.videoDataList = res.videoGallery.video_list;
        // console.log(this.videoDataList, '+++++')
      })
     

      for (let i in this.videoDataList) {
      
        let resultvimeo:any;
        resultvimeo = this.videoDataList[i].video_url;

        this.vimeoimg=this.sanitizer.bypassSecurityTrustResourceUrl(this.vimeothumblin + resultvimeo +'_200x150.webp');
        this.videoDataList[i].vimeoimg=this.sanitizer.bypassSecurityTrustResourceUrl(this.vimeothumblin + resultvimeo +'.jpg');

        if (this.activatedRoute.snapshot.params.id == this.videoDataList[i]._id) {


          if(this.videoDataList[i].type=='youtube'){

            // console.log('>>>>>>>',this.videoDataList[i]);
          let val:any;
          val=this.videoDataList[i];
          let flag:any;
          flag=1;
          this.openVideoModal(val,flag);

          let videoimg:any;
          videoimg='https://img.youtube.com/vi/'+ this.videoDataList[i].video + '/0.jpg';
          // console.log('>>>>>>>>>>>>>',videoimg)

          this.meta.setTitle('Arnie Fonseca - Video Gallery', this.videoDataList[i].title);
          this.meta.setTag('og:description', this.videoDataList[i].description_html);
          this.meta.setTag('twitter:description', this.videoDataList[i].description_html);
          this.meta.setTag('og:url', 'https://arniefonseca.influxiq.com/video-gallery/' + this.videoDataList[i]._id);
          this.meta.setTag('og:title', this.videoDataList[i].title);
          this.meta.setTag('twitter:title', this.videoDataList[i].title);
          this.meta.setTag('og:type', 'website');
         
          this.meta.setTag('og:image', videoimg);

          this.meta.setTag('twitter:image', videoimg)
          this.meta.setTag('twitter:url', 'https://arniefonseca.influxiq.com/video-gallery/' + this.videoDataList[i]._id);

          }

          if(this.videoDataList[i].type=='vimeo'){

            // console.log('>>>>>>>',this.videoDataList[i]);
          let val:any;
          val=this.videoDataList[i];
          let flag:any;
          flag=1;
          this.openVideoModal(val,flag);

          let vimeoimg:any;
          vimeoimg='https://i.vimeocdn.com/video/'+ this.videoDataList[i].video_url + '.jpg';
          // console.log('>>>>>>>>>>>>>',videoimg)

          this.meta.setTitle('Arnie Fonseca - Video Gallery', this.videoDataList[i].title);
          this.meta.setTag('og:description', this.videoDataList[i].description_html);
          this.meta.setTag('twitter:description', this.videoDataList[i].description_html);
          this.meta.setTag('og:url', 'https://arniefonseca.influxiq.com/video-gallery/' + this.videoDataList[i]._id);
          this.meta.setTag('og:title', this.videoDataList[i].title);
          this.meta.setTag('twitter:title', this.videoDataList[i].title);
          this.meta.setTag('og:type', 'website');
          // this.meta.setTag('og:image', this.video_url + this.videoDataList[i].video + '/0.jpg');
          // console.log('img src','img.youtube.com/vi/'+ this.videoDataList[i].video+ '/0.jpg')
          this.meta.setTag('og:image', vimeoimg);

          this.meta.setTag('twitter:image', vimeoimg)
          this.meta.setTag('twitter:url', 'https://arniefonseca.influxiq.com/video-gallery/' + this.videoDataList[i]._id);
          }
          
        }
      }

    }
  }

  openVideoModal(val: any,flag:any) {

    if(flag == 1){
      console.log(val,flag)

    if(val.type == 'youtube'){
      let videourl: any;
      videourl = this.video_url + val.video + '?autoplay=1';
      // console.log('>>', videourl)
  
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(videourl);
  
      //console.log('>>>>>>>>>>>>>>>>>>',this.safeSrc)
      const dialogRef = this.dialog.open(VideoGalleryModalComponent, {
        // panelClass:['modal-md','success-modal'],
        panelClass: 'blogdetail_videomodal',
        // width:'450px',
        data: { url: this.safeSrc, fulldata: val ,flag:flag}
  
  
      });
      dialogRef.afterClosed().subscribe(result => {
  
      });
    }
    if(val.type == 'vimeo'){
      let vimeourl: any;
      vimeourl = this.vimeo_url + val.video+'?autoplay=1';
      this.vimeosafesrc = this.sanitizer.bypassSecurityTrustResourceUrl(vimeourl);
      const dialogRef = this.dialog.open(VideoGalleryModalComponent, {
        // panelClass:['modal-md','success-modal'],
        panelClass: 'blogdetail_videomodal',
        // width:'450px',
        data: { url: this.vimeosafesrc, fulldata: val ,flag:flag}
  
  
      });
      dialogRef.afterClosed().subscribe(result => {
  
      });

    }

  
      

    } else {


      if(val.type=='youtube'){
        console.log(val,flag)

        // let videourl: any;
        // videourl = this.video_url + val.video + '?autoplay=1';
        // console.log('>>', videourl)
    
        this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.video_url + val.video);
    
        //console.log('>>>>>>>>>>>>>>>>>>',this.safeSrc)
        const dialogRef = this.dialog.open(VideoGalleryModalComponent, {
          // panelClass:['modal-md','success-modal'],
          panelClass: 'blogdetail_videomodal',
          // width:'450px',
          data: { url: this.safeSrc, fulldata: val,flag:flag }
          
        });
       
        dialogRef.afterClosed().subscribe(result => {
    
        });

      }
      if(val.type=='vimeo'){
        let vimeourl: any;
        vimeourl = this.vimeo_url + val.video;
        this.vimeosafesrc = this.sanitizer.bypassSecurityTrustResourceUrl(vimeourl);
        const dialogRef = this.dialog.open(VideoGalleryModalComponent, {
          // panelClass:['modal-md','success-modal'],
          panelClass: 'blogdetail_videomodal',
          // width:'450px',
          data: { url: this.vimeosafesrc, fulldata: val ,flag:flag}
    
    
        });
        dialogRef.afterClosed().subscribe(result => {
    
        });
      }

    }


  }

  // load more function 

  videoLoadMore(){
    let data:any;
          data={
      "limit":10,
       "skip":this.indexVal
     }
     this.apiService.CustomRequest(data,'videogallerydata').subscribe(res=>{
      let result:any=res;
      console.log(result.video_list)
      this.indexvallength=result.video_list.length;
      if(result.video_list.length>0){

              this.videoDataList = this.videoDataList.concat(result.video_list);
              this.indexVal = this.indexVal + 6;
            }else{
                 this.searchLoadMore=true;
            }


     })

  }


  viewDetails(val: any) {
    this.router.navigateByUrl('/video-gallery/' + val._id)
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
    var url = 'https://arniefonseca.influxiq.com/video-gallery/' + val._id;
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
    window.open('https://twitter.com/intent/tweet?url=https://arniefonseca.influxiq.com/video-gallery/' + val._id);
  }

  // linkedin share 

  linkedinShare(val: any) {
    // console.log(val)
    window.open('https://www.linkedin.com/shareArticle?mini=true&url=https://arniefonseca.influxiq.com/video-gallery/' + val._id);
  }

  // tumblr share 

  tumblrShare(val: any) {
    // console.log(val)
    window.open('http://www.tumblr.com/share?url=https://arniefonseca.influxiq.com/video-gallery/' + val._id);
  }


}





//video modal
@Component({
  selector: 'app-videoModal',
  templateUrl: './videoModal.html'
})
export class VideoGalleryModalComponent {
  public profile: any;
  public fulldata:any;
  constructor(public dialogRef: MatDialogRef<VideoGalleryModalComponent>,
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
    var url = 'https://arniefonseca.influxiq.com/video-gallery/' + val._id;
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
    window.open('https://twitter.com/intent/tweet?url=https://arniefonseca.influxiq.com/video-gallery/' + val._id);
  }

  // linkedin share 

  linkedinShare(val: any) {
    // console.log(val)
    window.open('https://www.linkedin.com/shareArticle?mini=true&url=https://arniefonseca.influxiq.com/video-gallery/' + val._id);
  }

  // tumblr share 

  tumblrShare(val: any) {
    // console.log(val)
    window.open('http://www.tumblr.com/share?url=https://arniefonseca.influxiq.com/video-gallery/' + val._id);
  }



}

