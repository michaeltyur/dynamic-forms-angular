import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Report,Content,ControlBasic,DataSource,Parameters,nputeControl,ControlLabel,Control,ControlStyle,FormControlObject,SelectControl,ValidatorConfig } from '../models/controls-interfaces';


@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(private http: HttpClient) { }

  getReportsTitles(): Observable<string[]> {
    let url = "/api/DynamicForms/GetReportsTitles";
    return this.http.get<string[]>(url);
  }

  getForms(reportID: number): Observable<FormControlObject> {
    let url = "/api/DynamicForms/GetForms?request=" + reportID;
    return this.http.get<FormControlObject>(url);
  }
  
}
