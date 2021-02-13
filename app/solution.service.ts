import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs'; 
import { solution} from './solution';
@Injectable({
  providedIn: 'root'
})
export class SolutionService {  
  url = 'http://localhost:4200/Api/Solutions';  
  constructor(private http: HttpClient) { }  
  getAllSolution(): Observable<solution[]> {  
    return this.http.get<solution[]>(this.url + '/AllSolutionDetails');  
  }  
  getSolutionById(ID: string): Observable<solution> {  
    return this.http.get<solution>(this.url + '/GetSolutionDetailsById/' + ID);  
  }  
  createSolution(solution: solution): Observable<solution> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<solution>(this.url + '/InsertSolutionDetails/',  
    solution, httpOptions);  
  }  
  updateSolution(solution: solution): Observable<solution> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<solution>(this.url + '/UpdateSolutionDetails/',  
    solution, httpOptions);  
  }  
  deleteSolutionById(ID: string): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url + '/DeleteSolutionDetails?id=' +ID,  
 httpOptions);  
  }  
}