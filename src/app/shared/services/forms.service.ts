import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IReport,IContent,IControlBasic,IDataSource,IParameters,InputeControl,IControlLabel,IControl,IControlStyle,IFormControlObject,ISelectControl,IValidatorConfig } from '../models/controls-interfaces';


@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(private http: HttpClient) { }

  getForms(requestNumber: number): Observable<IFormControlObject> {
    let url = "/api/DynamicForms/GetForms?request=" + requestNumber;
    return this.http.get<IFormControlObject>(url);
  }
  
}
