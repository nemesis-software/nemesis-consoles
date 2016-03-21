import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {WrapperCmp} from '../header/header';

@Component({
  selector: 'typography',
  templateUrl: './components/typography/typography.html',
  styleUrls: ['./components/typography/typography.css'],
  directives: [WrapperCmp, CORE_DIRECTIVES]
})
export class TypographyPage {
}
