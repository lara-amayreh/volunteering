import { X } from '@angular/cdk/keycodes';
import { NgFor } from '@angular/common';
import { Component,Input, TemplateRef, Injectable, ViewChild, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators,  FormBuilder, FormGroup  } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Observable, of, Subscription, switchMap } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { opportunity } from 'src/app/lib/inteerfaces/opportunity';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { OportunitiesService } from 'src/app/lib/services/oportunities/oportunities.service';
import { AddOpportunityComponent } from '../add-opportunity/add-opportunity.component';

@Component({
  selector: 'app-company-activities',
  templateUrl: './company-activities.component.html',
  styleUrls: ['./company-activities.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: AppComponent}   
  ]
})
export class CompanyActivitiesComponent implements OnInit {
  @ViewChild('callAPIDialog')
  callAPIDialog!: TemplateRef<any>;
   opportunities!: Observable<opportunity[] | undefined>;
   profileImg!:string;
cname!:string;
start!:string;
end!:string;
userstate!:Observable<any>;
subscription!: Subscription;
  constructor(public dialog: MatDialog,public oportunityservice:OportunitiesService,private authservice:AuthService) { }
  ngOnInit(): void {
 this.userstate= this.authservice.userState$;
 this.subscription=this.userstate.subscribe((value)=>{
    this.opportunities = this.oportunityservice.getOpportunities(value?.id+'');

  })

 
    
  
  }
 
  
  addoportunity(){
    // console.log(id);
    let dialogRef = this.dialog.open(AddOpportunityComponent, {
       width: '500px',
      
     });
    //  dialogRef.afterClosed().subscribe((result)=> {
    //      console.log(result); 
         
 
        
    //  })
 
    
   }
   ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}