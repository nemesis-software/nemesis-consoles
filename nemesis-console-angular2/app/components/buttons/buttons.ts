import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {WrapperCmp} from '../header/header';

@Component({
  selector: 'buttons',
  templateUrl: './components/buttons/buttons.html',
  styleUrls: ['./components/buttons/buttons.css'],
  directives: [WrapperCmp, CORE_DIRECTIVES]
})
export class ButtonsPage {
}
