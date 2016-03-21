import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {WrapperCmp} from '../header/header';

@Component({
  selector: 'panels-wells',
  templateUrl: './components/panels-wells/panels-wells.html',
  styleUrls: ['./components/panels-wells/panels-wells.css'],
  directives: [WrapperCmp, CORE_DIRECTIVES]
})
export class PanelsWellsPage {
}
