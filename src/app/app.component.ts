import { Component } from '@angular/core';
import { QuestionService } from './shared/services/question.service';
import { FormsService } from './shared/services/forms.service';
import { IReport,IContent,ICheckBoxControl,IControlBasic,IDataSource,IParameters,InputeControl,IControlLabel,IControl,IControlStyle,IFormControlObject,ISelectControl,IValidatorConfig } from './shared/models/controls-interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  controlsObj:any;
  controlsLoader:boolean;
  questions: any[];
  title = 'dynamic-forms';
  constructor(
    private service: QuestionService,
    private formsService: FormsService
  ) {
    this.questions = service.getQuestions();
  }

  getForms(request: string): void {
    this.controlsLoader  =true;
    this.formsService.getForms(request).subscribe(res => {
      if (res) {
        try {
          this.controlsObj = <IReport>res["report"];
        console.log(res);
        } catch (error) {
          debugger;
        }
        
      }
      this.controlsLoader=false;
    },error=>{
      this.controlsLoader=false;
    });
  }
}
