import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {WrapperCmp} from '../header/header';

@Component({
  selector: 'grid',
  templateUrl: './components/grid/grid.html',
  styleUrls: ['./components/grid/grid.css'],
  directives: [WrapperCmp, CORE_DIRECTIVES]
})
export class GridPage {
}
