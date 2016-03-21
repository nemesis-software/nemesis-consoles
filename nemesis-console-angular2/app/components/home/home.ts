import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {WrapperCmp} from '../header/header';

@Component({
  selector: 'timeline',
  templateUrl: './components/home/timeline.html',
  styleUrls: ['./components/home/timeline.css'],
  directives: [CORE_DIRECTIVES]
})
class TimelineCmp {}

@Component({
  selector: 'notifications',
  templateUrl: './components/home/notifications.html',
  directives: [CORE_DIRECTIVES]
})
class NotificationCmp {}

@Component({
  selector: 'chat',
  templateUrl: './components/home/chat.html',
  directives: [CORE_DIRECTIVES]
})
class ChatCmp {}

@Component({
  selector: 'stats',
  templateUrl: './components/home/stats.html',
  properties: ['number', 'comments', 'colour', 'type'],
  directives: [CORE_DIRECTIVES]
})
class StatsCmp {
  number:number;
  comments:string;
  colour:string;
  type:string;
}

@Component({
  selector: 'dashboard',
  templateUrl: './components/home/home.html',
  styleUrls: ['./components/home/home.css'],
  directives: [WrapperCmp, StatsCmp, TimelineCmp, NotificationCmp, ChatCmp, CORE_DIRECTIVES]
})
export class HomePage {
}
