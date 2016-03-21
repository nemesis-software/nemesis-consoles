import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {WrapperCmp} from '../header/header';

@Component({
  selector: 'table',
  templateUrl: './components/table/table.html',
  styleUrls: ['./components/table/table.css'],
  directives: [WrapperCmp, CORE_DIRECTIVES]
})
export class TablePage {
}
