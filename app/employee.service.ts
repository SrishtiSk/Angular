import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { employee } from './employee'; 

@Injectable()
export class EmployeeService {  
  url = 'http://localhost:4200/Api/Employee';  
  constructor(private http: HttpClient) { }  
  getAllEmployee(): Observable<employee[]> {  
    return this.http.get<employee[]>(this.url + '/AllEmployeeDetails');  
  }  
  getEmployeeById(employeeId: string): Observable<employee> {  
    return this.http.get<employee>(this.url + '/GetEmployeeDetailsById/' + employeeId);  
  }  
  createEmployee(employee: employee): Observable<employee> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<employee>(this.url + '/InsertEmployeeDetails/',  
    employee, httpOptions);  
  }  
  updateEmployee(employee: employee): Observable<employee> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<employee>(this.url + '/UpdateEmployeeDetails/',  
    employee, httpOptions);  
  }  
  deleteEmployeeById(employeeid: string): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url + '/DeleteEmployeeDetails?id=' +employeeid,  
 httpOptions);  
  }  
}  