import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResolveService } from './services/resolve.service';

/**Frontend Routing**/
import { HomeComponent } from './component/frontend/home/home.component';
import { LoginComponent } from './component/frontend/login/login.component';
import { ForgetPasswordComponent } from './component/frontend/forget-password/forget-password.component';
import { ResetPasswordComponent } from './component/frontend/reset-password/reset-password.component';
import { SignUpComponent } from './component/frontend/sign-up/sign-up.component';
import { ContactusComponent } from './component/frontend/contactus/contactus.component';
import { ServiceComponent } from './component/frontend/service/service.component';
import { TesimonialComponent } from './component/frontend/tesimonial/tesimonial.component';
import { ServicelistComponent } from './component/frontend/services/servicelist/servicelist.component';
import { BlogComponent } from './component/frontend/blog/blog.component';
import { BloglistComponent } from './component/frontend/bloglist/bloglist.component';
import { BlogdetailComponent } from './component/frontend/blogdetail/blogdetail.component';
import { TesimoniallistComponent } from './component/frontend/tesimoniallist/tesimoniallist.component';
import { ImageGalleryComponent } from './component/frontend/gallery/image-gallery/image-gallery.component';
import { VideoGalleryComponent } from './component/frontend/gallery/video-gallery/video-gallery.component';
import { TeamComponent } from './component/frontend/team/team.component';
import { SeminarsComponent } from './component/frontend/events/seminars/seminars.component';
import { WorkshopsComponent } from './component/frontend/events/workshops/workshops.component';
import { SpeakerEngagementsComponent } from './component/frontend/events/speaker-engagements/speaker-engagements.component';
import { WorkshopDetailComponent } from './component/frontend/events/workshop-detail/workshop-detail.component';
import { SeminarsDetailComponent } from './component/frontend/events/seminars-detail/seminars-detail.component';
import { BioComponent } from './component/frontend/bio/bio.component';
import { SpeakerEngagementsDetailComponent } from './component/frontend/events/speaker-engagements-detail/speaker-engagements-detail.component';


import { BkLeftdivComponent } from './layout/bk-leftdiv/bk-leftdiv.component';
import { EmployeeTrainingComponent } from './component/frontend/services/employee-training/employee-training.component';
import { CouplesCounselingComponent } from './component/frontend/services/couples-counseling/couples-counseling.component';
import { PersonalDevelopmentCoachingComponent } from './component/frontend/services/personal-development-coaching/personal-development-coaching.component';
import { HighPerformanceCoachingComponent } from './component/frontend/services/high-performance-coaching/high-performance-coaching.component';
import { SpecialProgramsForYoungMenComponent } from './component/frontend/services/special-programs-for-young-men/special-programs-for-young-men.component';

const routes: Routes = [
  /**Frontend Routing**/
  { path: 'bk-leftdiv', component: BkLeftdivComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactusComponent },
  
  {
    path: 'servicehome',
    component: ServiceComponent,
    resolve: { serviceListData: ResolveService },
    data: { requestcondition: { source: 'service', condition: {} }, endpoint: 'datalist' }
  },
  {
    path: "testimonialhome",
    component: TesimonialComponent,
    resolve: { testimonialListData: ResolveService },
    data: {
      requestcondition: { source: "testimonal", condition: {} },
      endpoint: "datalistwithouttoken"
    }
  },

  //  static path
  {
    path: 'ourservices', component: ServicelistComponent,
    resolve: {
      serviceList: ResolveService
    },
    data:
    {
      requestcondition:
      {
        source: 'service_view', condition: {}
      }, endpoint: 'datalistwithouttoken'
    }
  },





  { path: 'bloghome', component: BlogComponent },

  {
    path: 'blog', component: BloglistComponent, resolve: { blogCatList: ResolveService },
    data: { requestcondition: { condition: { "limit": 4, "skip": 1 } }, endpoint: 'blogdata' }
  },

  {
    path: 'blogdetail/:_id', component: BlogdetailComponent,
    resolve: {
      blogCatList: ResolveService
    },
    data:
    {
      requestcondition:
      {
        source: 'blogs_view', condition: {}
      }, endpoint: 'datalistwithouttoken'
    }
  },

  //  static path
  {
    path: "testimonial", component: TesimoniallistComponent,
    resolve: { testimonialListData: ResolveService },
    data: {
      requestcondition: { source: "testimonial_view", condition: {} },
      endpoint: "datalistwithouttoken"
    }
  },

  { path: 'employee-training', component: EmployeeTrainingComponent },
  { path: 'couples-counseling', component: CouplesCounselingComponent },
  { path: 'personal-development-coaching', component: PersonalDevelopmentCoachingComponent },
  { path: 'high-performance-coaching', component: HighPerformanceCoachingComponent },
  { path: 'special-programs-for-young-men', component: SpecialProgramsForYoungMenComponent },
  { path: 'image-gallery', component: ImageGalleryComponent },
  { path: 'video-gallery', component: VideoGalleryComponent },
  { path: 'team', component: TeamComponent },
  { path: 'bio', component: BioComponent },


// ___________________event frontend__________________//

{ path: 'seminars', component: SeminarsComponent,
resolve: { seminarsListData: ResolveService },
data: {
  requestcondition: { source: "events_view", condition: {type:"seminars"} },
  endpoint: "datalistwithouttoken"
}
},
{ path: 'workshops', component: WorkshopsComponent,
resolve: { workshopsListData: ResolveService },
data: {
  requestcondition: { source: "events_view", condition: {type:"workshops"} },
  endpoint: "datalistwithouttoken"
}
},
{ path: 'speaker-engagements', component: SpeakerEngagementsComponent,
resolve: { speakerEngagementsListData: ResolveService },
data: {
  requestcondition: { source: "events_view", condition: {type:"speaker_engagement"} },
  endpoint: "datalistwithouttoken"
}
},

{ path: 'seminars-detail/:_id', component: SeminarsDetailComponent,
resolve: { seminarsDetailData: ResolveService },
data: {
  requestcondition: { source: "events_view", condition: {type:"seminars"} },
  endpoint: "datalistwithouttoken"
}
},
{ path: 'workshop-detail/:_id', component: WorkshopDetailComponent,
resolve: { workshopsDetailData: ResolveService },
data: {
  requestcondition: { source: "events_view", condition: {type:"workshops"} },
  endpoint: "datalistwithouttoken"
}
},



{ path: 'speaker-engagements-detail/:_id', component: SpeakerEngagementsDetailComponent,
resolve: { speakerengagementsDetailData: ResolveService },
data: {
requestcondition: { source: "events_view", condition: {type:"speaker_engagement"} },
endpoint: "datalistwithouttoken"
}
},

// ___________________ end event frontend__________________//
  
  /**End Frontend Routing**/
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
