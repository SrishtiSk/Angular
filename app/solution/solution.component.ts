import { Component, OnInit } from '@angular/core';
import { solution } from '../solution';
import { FormBuilder, Validators } from '@angular/forms';  
import { Observable } from 'rxjs';  
import { SolutionService } from '../solution.service';


@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css']
})
export class SolutionComponent implements OnInit {  
  dataSaved = false;  
  solutionForm: any;  
  allSolutions: Observable<solution[]>;  
  SolutionIdUpdate: number|null;  
  message:string|null;  
  
  constructor(private formbulider: FormBuilder, private SolutionService:SolutionService) { }  
  
  ngOnInit() {  
    this.solutionForm = this.formbulider.group({  
      ID:['',[Validators.required]],
      Description: ['', [Validators.required]],
      Added:['',[Validators.required]],
      QueryID:['',[Validators.required]], 
      EmpID:['',[Validators.required]],
       
    });  
    this.loadAllSolutions();  
  }  
  loadAllSolutions() {  
    this.allSolutions = this.SolutionService.getAllSolution();  
  }  
  onFormSubmit() {  
    this.dataSaved = false;  
    const solution = this.solutionForm.value;  
    this.CreateSolution(solution);  
    this.solutionForm.reset();  
  }  
  loadSolutionToEdit(ID: string) {  
    this.SolutionService.getSolutionById(ID).subscribe(solution=> {  
      this.message = null;  
      this.dataSaved = false;  
      this.SolutionIdUpdate = solution.ID;  
      this.solutionForm.controls['ID'].setValue(solution.ID);
      this.solutionForm.controls['Description'].setValue(solution.Description);      
      this.solutionForm.controls['Added'].setValue(solution.Added);  
      this.solutionForm.controls['QueryID'].setValue(solution.QueryID);
      this.solutionForm.controls['EmpID'].setValue(solution.EmpID);
    });  
  
  }  
  CreateSolution(solution: solution) {  
    if (this.SolutionIdUpdate == null) {  
      this.SolutionService.createSolution(solution).subscribe(  
        () => {  
          this.dataSaved = true;  
          this.message = 'Record saved Successfully';  
          this.loadAllSolutions();  
          this.SolutionIdUpdate = 0;  
          this.solutionForm.reset();  
        }  
      );  
    } else {  
      solution.QueryID = this.SolutionIdUpdate;  
      this.SolutionService.updateSolution(solution).subscribe(() => {  
        this.dataSaved = true;  
        this.message = 'Record Updated Successfully';  
        this.loadAllSolutions();  
        this.SolutionIdUpdate = 0;  
        this.solutionForm.reset();  
      });  
    }  
  }   
  deleteSolution(ID: string) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.SolutionService.deleteSolutionById(ID).subscribe(() => {  
      this.dataSaved = true;  
      this.message = 'Record Deleted Succefully';  
      this.loadAllSolutions();  
      this.SolutionIdUpdate = 0;  
      this.solutionForm.reset();  
  
    });  
  }  
}  
  resetForm() {  
    this.solutionForm.reset();  
    this.message = null;  
    this.dataSaved = false;  
  }  
}  