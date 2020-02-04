import { Component } from '@angular/core';
import { QuestionService } from './shared/services/question.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  questions: any[];
  title = 'dynamic-forms';
  constructor(service: QuestionService){
    this.questions = service.getQuestions();
  }
}
