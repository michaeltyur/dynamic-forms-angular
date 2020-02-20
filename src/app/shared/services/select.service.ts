import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectService {
  
  setRelationShipsEmmitter$ = new EventEmitter(); 
  selectDataResetEmitter$ = new EventEmitter(); 
  selectDataFilterEmitter$ = new EventEmitter(); 

  constructor() { }
}
