import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../api.service';

import { MetaService } from '@ngx-meta/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

import { NestedTreeControl } from '@angular/cdk/tree';
import { BehaviorSubject, observable, of as observableOf } from 'rxjs';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { FacebookService, UIParams, UIResponse, LoginResponse } from 'ngx-facebook';

export interface DialogData {
  data: any;  
} 

export class FileNode{
  children: FileNode[];
  filename: string;
  type:any;
}

@Component({
  selector: 'app-blogdetail',
  templateUrl: './blogdetail.component.html',
  styleUrls: ['./blogdetail.component.css']
})
export class BlogdetailComponent implements OnInit {


  public nestedTreeControl: NestedTreeControl<FileNode>;
  public blogCategoryDataSource:MatTreeNestedDataSource<FileNode>;
  public dataChange:BehaviorSubject<FileNode[]> = new BehaviorSubject<FileNode[]>([]);




  public blogCategory:any;
  public blogDetail:any;
  public blog:any = '';
  public blogList:any;
  public blog_img:any;
  public blog_image:any;
  public image:any;
  public blogtitle:any;
  public blogcategorysearch:any;
  public blogcategory:any;
  public blogcategorycount:any;
  public blogcat:any;
  public blogCount:any;
  public resc: any;
  public blogListing: any;

  public MostViwedBlog:any=[];
  public similarBlogs:any=[];

  public dataformate: any;
  // public p_id: any;
  public profile: any;
  // @ViewChild('myaccordion') myPanels: MatAccordion;

  // openAll(){
  //   this.myPanels.openAll();
  // }
  // closeAll(){
  //   this.myPanels.closeAll();
  // }

  safeSrc: SafeResourceUrl;

  copyText(val:any){
    console.log('copyText');
  }

  constructor(private readonly meta: MetaService, private router: Router, private activatedRoute: ActivatedRoute, private cookieService: CookieService, public apiService: ApiService,private sanitizer: DomSanitizer,public dialog:MatDialog, private facebook:FacebookService) { 
    facebook.init({
      appId: '2912281308815518',
      version: 'v2.9'
    });

    this.nestedTreeControl = new NestedTreeControl<FileNode> (this._getChildren);
    this.blogCategoryDataSource = new MatTreeNestedDataSource();

    this.dataChange.subscribe(data => this.blogCategoryDataSource.data = data);

  
    this.activatedRoute.data.forEach((data: any) => {

      this.blog = data.blogCatList.blogs[0];
      this.blogtitle=this.blog.blogtitle.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
      this.meta.setTitle(this.blog.blogtitle);
      this.meta.setTag('og:description', this.blog.description_html);
      this.meta.setTag('twitter:description', this.blog.description_html);
      this.meta.setTag('og:url', 'http://arniefonseca.influxiq.com/blogdetail/'+this.activatedRoute.snapshot.params.blogtitle+'/'+this.blog._id);
      this.meta.setTag('og:keyword', this.blog.author);
      this.meta.setTag('twitter:keyword', this.blog.author);

      this.meta.setTag('og:title', this.blog.blogtitle);
      this.meta.setTag('twitter:title', this.blog.blogtitle);
      this.meta.setTag('og:type', 'website');
      this.meta.setTag('og:image', this.blog.blogs_image[0].basepath + this.blog.blogs_image.image);
      this.meta.setTag('twitter:image', this.blog.blogs_image[0].basepath + this.blog.blogs_image.image);
      //console.warn('>>>>>>>kb>>>>>>>',this.blog,this.blogtitle)  
    })
     /**fetch user api and store by sourav*/
    let dat:any;
    dat={
    
      "blogid":this.blog._id
    }
    this.apiService.CustomRequest(dat,'apiforip').subscribe(resc=>{
    //console.log(resc)
    })
 
     /*------------Most Viewed Blogs List and popular blog list by sourav-----*/
     let data: any = {
       condition: {"_id":this.blog.blogcat}
     }
 
     this.apiService.CustomRequest(data,"popularsimilarblogs").subscribe((result: any) => {
       //console.warn(result);
       this.MostViwedBlog = result.popular_blogs;
       this.similarBlogs=result.similar_blogs
       //console.log('>>>>>>>>>>>>>>>>>>>>>>>>>', this.MostViwedBlog);
     });

    
    this.dataChange.next([
      {
        filename: "test",
        type: "",
        children:[
          {
            filename: "test3",
            type: "exe",
            children: [],
          }
        ],
      },
      {
        filename: "test2",
        type: "exe",
        children:[],
      },
    ]);   

  }

  private _getChildren = (item: FileNode) => { return observableOf(item.children); };
  hasNestedChild = (_: number, nodeData: FileNode) => { return ! (nodeData.type); };

  panelOpenState = false;

  ngOnInit() {

    //**all blog category and blog list from resolve in routing**//
// ************* blog details *****************//
      
     
      

      
    // let data: any = {
    //   source:"blog_category_view"
    // }

    // this.apiService.postDatawithoutToken("datalistwithouttoken", data).subscribe((result: any)=>{
    //   // console.log(result.res);
    //   this.blogcategorycount = result.resc;
    //   // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>', this.blogcategorycount);
    // });



    //    /**api service for blog_catagory total count by uttam */  
    //   // this.blogcategorycount = this.blogList.blogCatList.blog_category.length;
    //   // console.log('>>>>>>>>>>>>>>>>>',this.blogcategorycount)



      

    // // let data: any = {
    // //   source:"blog_category_view"
    // // }

    // // this.apiService.postDatawithoutToken("datalistwithouttoken", data).subscribe((result: any)=>{
    // //   // console.log(result.res);
    // //   this.blogCategoryDataSource = result.res;
    // //   // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>', this.blogCategoryDataSource);
    // // });


    


    
    // let blogsdatacount: any = {
    //   source:"blogs_view"
    // }

    // this.apiService.postDatawithoutToken("datalistwithouttoken", blogsdatacount).subscribe((result: any)=>{
    //   // console.log(result.res);
    //   this.blogCount = result.res;
    //   // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>', this.blogCount);
    // });



    // let blogscategory: any = {
    //   source:"blog_category_view"
    // }

    // this.apiService.postDatawithoutToken("datalistwithouttoken", blogscategory).subscribe((result: any)=>{
    //   // console.log(result.res);
    //   this.blogCategory = result.res;
    //   // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>', this.blogCategory);
    // });



    //**all blog category and blog list from resolve in routing**//

    this.activatedRoute.data.forEach((data: any) => {
      this.blogList = data;
      //  console.log('>>>>>>>>>>>>>>',this.blogList)

    })

  //****total blog list****//
        let blogList: any = {
          source:"blogs_view"
        }
        this.apiService.postDatawithoutToken("datalistwithouttoken", blogList).subscribe((result: any)=>{
          // console.log(result.res);
          this.blogCategoryDataSource = result.res;
          // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>', this.blogcategorycount);
        });


        // this.blogListing = this.blogList.blogCatList.blogs
        // console.log('---------------',this.blogListing)
      


/**api service for total blog_catagory by uttam */

      let blogCatData: any = {
        source:"blog_category_view"
      }
      this.apiService.postDatawithoutToken("datalistwithouttoken", blogCatData).subscribe((result: any)=>{
        // console.log(result.res);
        this.blogCategoryDataSource = result.res;
        // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>', this.blogcategorycount);
      });


      /**api service for blog_catagory total count by uttam */  
            let data: any = {
            source:"blog_category_view"
          }

          this.apiService.postDatawithoutToken("datalistwithouttoken", data).subscribe((result: any)=>{
            // console.log(result.res);
            this.blogcategorycount = result.resc;
            // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>', this.blogcategorycount);
          });
       
  }


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
  
  fbTestimonialShare(val:any){
    //console.log(val)
    var url='https://arniefonseca.influxiq.com/blogdetail/'+this.blogtitle+'/'+ val._id;
    console.log(url)
  
    let params: UIParams = {
      href: url,
      method: 'share'
    };
    this.facebook.ui(params).then((res:UIResponse)=>{
    }).catch(facebook=>{
      // console.log(facebook)
    });
  }
  
  twitterTestimonialShare(val:any){
    window.open('https://twitter.com/intent/tweet?url=arniefonseca.influxiq.com/blogdetail/'+this.blogtitle+'/'+ val._id);
    console.log('https://twitter.com/intent/tweet?url=arniefonseca.influxiq.com/blogdetail/'+this.blogtitle+'/'+ val._id);
  }
  
  
  linkedinTestimonialShare(val:any){
  
    window.open('https://www.linkedin.com/sharing/share-offsite/?url=arniefonseca.influxiq.com/blogdetail/'+this.blogtitle+'/'+ val._id);
    console.log('https://www.linkedin.com/sharing/share-offsite/?url=arniefonseca.influxiq.com/blogdetail/'+this.blogtitle+'/'+ val._id);
  }
  
  tumblrTestimonialShare(val:any){
    window.open('http://www.tumblr.com/share?url=arniefonseca.influxiq.com/blogdetail/'+this.blogtitle+'/'+ val._id);
  console.log('http://www.tumblr.com/share?url=arniefonseca.influxiq.com/blogdetail/'+this.blogtitle+'/'+ val._id);
  }
  openvideourl(val: any){
    //console.log('openvideourl',val)
    let url:any;
     url="https://www.youtube.com/embed/";
      //console.log('video url....>',url+val);
      this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(url + val[0].video_url);
      
      //console.log('>>>>>>>>>>>>>>>>>>',this.safeSrc)
      const dialogRef = this.dialog.open(VideoModalComponent, {
        // panelClass:['modal-md','success-modal'],
        panelClass:'blogdetail_videomodal',
        // width:'450px',
        data:this.safeSrc,
      
        
  
      });
  
      dialogRef.afterClosed().subscribe(result => {
        
      });

  }

}

@Component({
  selector:'app-videomodal',
  templateUrl:'./videomodal.html'
})
export class VideoModalComponent {
  constructor( public dialogRef: MatDialogRef<VideoModalComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData){
  }
}