import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs'; 
import {query} from './query';
@Injectable({
  providedIn: 'root'
})
export class QueryService {  
  url = 'http://localhost:4200/Api/Queries';  
  constructor(private http: HttpClient) { }  
  getAllQuery(): Observable<query[]> {  
    return this.http.get<query[]>(this.url + '/AllQueryDetails');  
  }  
  getQueryById(queryId: string): Observable<query> {  
    return this.http.get<query>(this.url + '/GetQueryDetailsById/' + queryId);  
  }  
  createQuery(query: query): Observable<query> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<query>(this.url + '/InsertQueryDetails/',  
    query, httpOptions);  
  }  
  updateQuery(query: query): Observable<query> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<query>(this.url + '/UpdateQueryDetails/',  
    query, httpOptions);  
  }  
  deleteQueryById(QueryID: string): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url + '/DeleteQueryDetails?id=' +QueryID,  
 httpOptions);  
  }  
}