import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { opportunity } from 'src/app/lib/inteerfaces/opportunity';
import { organization } from 'src/app/lib/inteerfaces/organization';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { OportunitiesService } from 'src/app/lib/services/oportunities/oportunities.service';
import { UserService } from 'src/app/lib/services/user/user.service';
import { ApplyOnActivityComponent } from '../../volunteer/apply-on-activity/apply-on-activity.component';
import { AddOpportunityComponent } from '../add-opportunity/add-opportunity.component';
import { UpdateCompanyComponent } from '../update-company/update-company.component';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  @ViewChild('callAPIDialog')
  callAPIDialog!: TemplateRef<any>;
   organization!: Observable<organization|undefined>;
 id:string='';
   role!:string;
   uid!:string;
   alloportunities$! : Observable<opportunity[]>;
   opportunities!: Observable<opportunity[] | undefined>;
   panelOpenState=true;
   activityid!:string;



  constructor(public dialog: MatDialog, private route:ActivatedRoute, private opportunityservice:OportunitiesService, public userservice:UserService,public authservice:AuthService)

  {
    
    this.organization = this.route.paramMap.pipe(
      switchMap((value)=> {
        this.id = value.get('id')+'';
        this.alloportunities$=this.opportunityservice.getOpportunities(this.id);
        this.authservice.userState$.subscribe((v)=>{
          this.uid = v.id;
        })
        return this.userservice.getuserById(this.id);
  


}));

    }
  ngOnInit(): void {
   
    
  }
  

        

     addoportunity(){
      // console.log(id);
      let dialogRef = this.dialog.open(AddOpportunityComponent, {
         width: '500px',
        
       });
       dialogRef.afterClosed().subscribe((result)=> {
           console.log(result); 
           
   
           //this.students = this.studentsService.getStudents();
          
       })
   
      
     }
        
       
  
    
  
    
  
// geturl(){
 
// 	let x= `url("${this.organization.profileImg}")` ;
//   return x;
// }
  updateorganization(id:string){
    let dialogRef = this.dialog.open(UpdateCompanyComponent, {
       width: '500px',
      data:{id:id,data:this.organization}
     });
     dialogRef.afterClosed().subscribe((result)=> {
         console.log(result); 
 
        
        
     })
 
    
   }
   Apply(id: string) {
    
    this.activityid = id;
    let dialogRef = this.dialog.open(ApplyOnActivityComponent, {
      width: '700px',
      height: '400px',

      data: { id: id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {

      }
      // this.person = result;
    });
  }

   chickapply(applicantsIds:string[],active:boolean){
    let stat:boolean = false;
    for (let i = 0; i < applicantsIds.length ; i++) {
    if((applicantsIds[i]==this.uid)|| !active)
    stat = true
    }
    return stat;
      }
}
