import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';  
import { Observable } from 'rxjs';  
import { EmployeeService } from '../employee.service';  
import { employee } from '../employee';  

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {  
  dataSaved = false;  
  employeeForm: any;  
  allEmployees: Observable<employee[]>;  
  employeeIdUpdate:number|null;  
  message:string|null;  
  
  constructor(private formbulider: FormBuilder, private employeeService:EmployeeService) { }  
  
  ngOnInit() {  
    this.employeeForm = this.formbulider.group({  
      EmpID:['',[Validators.required]],
      EmpName: ['', [Validators.required]],
      QueryID:['',[Validators.required]],
      SubjectID:['',[Validators.required]],
      SolutionID:['',[Validators.required]],  
       
    });  
    this.loadAllEmployees();  
  }  
  loadAllEmployees() {  
    this.allEmployees = this.employeeService.getAllEmployee();  
  }  
  onFormSubmit() {  
    this.dataSaved = false;  
    const employee = this.employeeForm.value;  
    this.CreateEmployee(employee);  
    this.employeeForm.reset();  
  }  
  loadEmployeeToEdit(employeeId: string) {  
    this.employeeService.getEmployeeById(employeeId).subscribe(employee=> {  
      this.message = '';  
      this.dataSaved = false;  
      this.employeeIdUpdate = employee.EmpID;  
      this.employeeForm.controls['EmpID'].setValue(employee.EmpID);
      this.employeeForm.controls['EmpName'].setValue(employee.EmpName);    
      this.employeeForm.controls['QueryID'].setValue(employee.QueryID);  
      this.employeeForm.controls['SubjectID'].setValue(employee.SubjectID);  
      this.employeeForm.controls['SolutionID'].setValue(employee.SolutionID); 
    });  
  
  }  
  CreateEmployee(employee: employee) {  
    if (this.employeeIdUpdate == null) {  
      this.employeeService.createEmployee(employee).subscribe(  
        () => {  
          this.dataSaved = true;  
          this.message = 'Record saved Successfully';  
          this.loadAllEmployees();  
          this.employeeIdUpdate = 0;  
          this.employeeForm.reset();  
        }  
      );  
    } else {  
      employee.EmpID = this.employeeIdUpdate;  
      this.employeeService.updateEmployee(employee).subscribe(() => {  
        this.dataSaved = true;  
        this.message = 'Record Updated Successfully';  
        this.loadAllEmployees();  
        this.employeeIdUpdate = 0;  
        this.employeeForm.reset();  
      });  
    }  
  }   
  deleteEmployee(employeeId: string) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.employeeService.deleteEmployeeById(employeeId).subscribe(() => {  
      this.dataSaved = true;  
      this.message = 'Record Deleted Succefully';  
      this.loadAllEmployees();  
      this.employeeIdUpdate = 0;  
      this.employeeForm.reset();  
  
    });  
  }  
}  
  resetForm() {  
    this.employeeForm.reset();  
    this.message = ' ';  
    this.dataSaved = false;  
  }  
}  