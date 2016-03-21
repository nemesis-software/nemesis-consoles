import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {WrapperCmp} from '../header/header';

@Component({
  selector: 'form',
  templateUrl: './components/form/form.html',
  styleUrls: ['./components/form/form.css'],
  directives: [WrapperCmp, CORE_DIRECTIVES]
})
export class FormPage {
}
