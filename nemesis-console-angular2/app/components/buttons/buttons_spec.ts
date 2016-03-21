import {
  TestComponentBuilder,
  describe,
  expect,
  injectAsync,
  it,
} from 'angular2/testing';
import {Component, View} from 'angular2/angular2';
import {DOM} from 'angular2/src/core/dom/dom_adapter';
import {ButtonsPage} from './buttons';

export function main() {
  describe('buttons component', () => {
    it('should work',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.overrideTemplate(TestComponent, '<div><buttons></buttons></div>')
          .createAsync(TestComponent)
          .then((rootTC) => {
            let buttonsDOMEl = rootTC.debugElement.componentViewChildren[0].nativeElement;

            expect(DOM.querySelectorAll(buttonsDOMEl, 'h1')[0].textContent).toEqual('Howdy!');
          });
      }));
  });
}

@Component({selector: 'test-cmp'})
@View({directives: [ButtonsPage]})
class TestComponent {}
