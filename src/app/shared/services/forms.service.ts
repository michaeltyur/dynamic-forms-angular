import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IReport,IContent,IControlBasic,IDataSource,IParameters,InputeControl,IControlLabel,IControl,IControlStyle,IFormControlObject,ISelectControl,IValidatorConfig } from '../models/controls-interfaces';


@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(private http: HttpClient) { }

  getReportsTitles(): Observable<string[]> {
    let url = "/api/DynamicForms/GetReportsTitles";
    return this.http.get<string[]>(url);
  }

  getForms(reportTitle: string): Observable<IFormControlObject> {
    let url = "/api/DynamicForms/GetForms?request=" + reportTitle;
    return this.http.get<IFormControlObject>(url);
  }
  
}
