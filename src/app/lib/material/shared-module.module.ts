import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';



export const MaterialImports =[
  ReactiveFormsModule,
  MatButtonModule,
  MatDialogModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatStepperModule,
  MatListModule,
  MatSelectModule,
  MatFormFieldModule,
  MatCardModule,
  MatInputModule,
MatChipsModule,
MatCheckboxModule,
MatDatepickerModule,
MatNativeDateModule,
MatAutocompleteModule,
MatDividerModule,
MatProgressBarModule,
MatTabsModule,




]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialImports,
  ],
  exports:[
MaterialImports,
  ]
})
export class SharedModuleModule { }
