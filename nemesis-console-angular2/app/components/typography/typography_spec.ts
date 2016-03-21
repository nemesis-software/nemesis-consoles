import {
  TestComponentBuilder,
  describe,
  expect,
  injectAsync,
  it,
} from 'angular2/testing';
import {Component, View} from 'angular2/angular2';
import {DOM} from 'angular2/src/core/dom/dom_adapter';
import {TypographyPage} from './typography';

export function main() {
  describe('typography component', () => {
    it('should work',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.overrideTemplate(TestComponent, '<div><typography></typography></div>')
          .createAsync(TestComponent)
          .then((rootTC) => {
            let typographyDOMEl = rootTC.debugElement.componentViewChildren[0].nativeElement;

            expect(DOM.querySelectorAll(typographyDOMEl, 'h1')[0].textContent).toEqual('Howdy!');
          });
      }));
  });
}

@Component({selector: 'test-cmp'})
@View({directives: [TypographyPage]})
class TestComponent {}
