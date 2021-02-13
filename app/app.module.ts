import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EmployeeService } from './employee.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from'@angular/material/menu';  
import {MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { EmployeeComponent } from './employee/employee.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { TouchedErrorStateMatcher } from './touched-error-state.matcher';
import { QueryComponent } from './query/query.component';
import { SolutionComponent } from './solution/solution.component';
import { SubjectComponent } from './subject/subject.component';

  
@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    QueryComponent,
    SolutionComponent,
    SubjectComponent,
  ],
  imports: [
    BrowserModule,  
    FormsModule,  
    ReactiveFormsModule, 
    HttpClientModule,  
    BrowserAnimationsModule,  
    MatButtonModule,  
    MatMenuModule,  
    MatDatepickerModule,  
    MatNativeDateModule,  
    MatIconModule,  
    MatRadioModule,  
    MatCardModule,  
    MatSidenavModule,  
    MatFormFieldModule,  
    MatInputModule,
    MatToolbarModule,  
    MatTooltipModule, 
    AppRoutingModule 
  ],
  providers: [HttpClientModule, EmployeeService,MatDatepickerModule,
    { provide: ErrorStateMatcher, useClass: TouchedErrorStateMatcher }],
  bootstrap: [AppComponent]
})

export class AppModule { }
