import { Component,Input, TemplateRef, Injectable, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators,  FormBuilder, FormGroup  } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-company-activities',
  templateUrl: './company-activities.component.html',
  styleUrls: ['./company-activities.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: AppComponent}   
  ]
})
export class CompanyActivitiesComponent {
  @ViewChild('callAPIDialog')
  callAPIDialog!: TemplateRef<any>;
  constructor(public dialog: MatDialog) { }

  openDialog() {
    let dialogRef = this.dialog.open(this.callAPIDialog);
    dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
            if (result !== 'no') {
              const enabled = "Y"
                console.log(result);
            } else if (result === 'no') {
               console.log('User clicked no.');
            }
        }
    })
}


onSend(form: NgForm){  
  if(form.status === 'INVALID')
  {
    // display error in your form
  }else{
      console.log(form.value)
      this.dialog.closeAll(); // Close opened diaglo
    // do whatever you want to do with your data
  }
  
}
}
