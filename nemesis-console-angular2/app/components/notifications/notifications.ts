import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {WrapperCmp} from '../header/header';

@Component({
  selector: 'notifications',
  templateUrl: './components/notifications/notifications.html',
  styleUrls: ['./components/notifications/notifications.css'],
  directives: [WrapperCmp, CORE_DIRECTIVES]
})
export class NotificationsPage {
}
