import { Component, OnInit } from '@angular/core';  
import { FormBuilder, Validators } from '@angular/forms';  
import { Observable } from 'rxjs';  
import { QueryService } from '../query.service';  
import { query } from '../query';
@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {  
  dataSaved = false;  
  queryForm: any;  
  allQueries: Observable<query[]>;  
  queryIdUpdate: number|null;  
  message:string|null;  
  
  constructor(private formbulider: FormBuilder, private queryService:QueryService) { }  
  
  ngOnInit() {  
    this.queryForm = this.formbulider.group({  
      QueryID:['',[Validators.required]],
      Description: ['', [Validators.required]],
      Qstate:['',[Validators.required]],
      Added:['',[Validators.required]],
      SubjectID:['',[Validators.required]], 
      EmpID:['',[Validators.required]],
      SolutionID:['',[Validators.required]], 
       
    });  
    this.loadAllQueries();  
  }  
  loadAllQueries() {  
    this.allQueries = this.queryService.getAllQuery();  
  }  
  onFormSubmit() {  
    this.dataSaved = false;  
    const query = this.queryForm.value;  
    this.CreateQuery(query);  
    this.queryForm.reset();  
  }  
  loadQueryToEdit(QueryID: string) {  
    this.queryService.getQueryById(QueryID).subscribe(query=> {  
      this.message = null;  
      this.dataSaved = false;  
      this.queryIdUpdate = query.QueryID;  
      this.queryForm.controls['QueryID'].setValue(query.QueryID);
      this.queryForm.controls['Description'].setValue(query.Description);    
      this.queryForm.controls['Qstate'].setValue(query.QState);  
      this.queryForm.controls['Added'].setValue(query.Added);  
      this.queryForm.controls['EmpID'].setValue(query.EmpID);
      this.queryForm.controls['SolutionID'].setValue(query.SolutionID); 
    });  
  
  }  
  CreateQuery(query: query) {  
    if (this.queryIdUpdate == null) {  
      this.queryService.createQuery(query).subscribe(  
        () => {  
          this.dataSaved = true;  
          this.message = 'Record saved Successfully';  
          this.loadAllQueries();  
          this.queryIdUpdate = 0;  
          this.queryForm.reset();  
        }  
      );  
    } else {  
      query.QueryID = this.queryIdUpdate;  
      this.queryService.updateQuery(query).subscribe(() => {  
        this.dataSaved = true;  
        this.message = 'Record Updated Successfully';  
        this.loadAllQueries();  
        this.queryIdUpdate = 0;  
        this.queryForm.reset();  
      });  
    }  
  }   
  deleteQuery(QueryId: string) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.queryService.deleteQueryById(QueryId).subscribe(() => {  
      this.dataSaved = true;  
      this.message = 'Record Deleted Succefully';  
      this.loadAllQueries();  
      this.queryIdUpdate = 0;  
      this.queryForm.reset();  
  
    });  
  }  
}  
  resetForm() {  
    this.queryForm.reset();  
    this.message = null;  
    this.dataSaved = false;  
  }  
}  