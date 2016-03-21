import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {WrapperCmp} from '../header/header';

@Component({
  selector: 'chart',
  templateUrl: './components/chart/chart-element.html',
  properties: ['title']
})
class Chart {
  title: string;
}

@Component({
  selector: 'chart-page',
  templateUrl: './components/chart/chart.html',
  styleUrls: ['./components/chart/chart.css'],
  directives: [WrapperCmp, Chart, CORE_DIRECTIVES]
})
export class ChartPage {
}
