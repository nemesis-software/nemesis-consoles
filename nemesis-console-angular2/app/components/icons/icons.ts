import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {WrapperCmp} from '../header/header';

@Component({
  selector: 'icons',
  templateUrl: './components/icons/icons.html',
  styleUrls: ['./components/icons/icons.css'],
  directives: [WrapperCmp, CORE_DIRECTIVES]
})
export class IconsPage {
}
