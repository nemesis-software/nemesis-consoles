import {
  TestComponentBuilder,
  describe,
  expect,
  injectAsync,
  it,
} from 'angular2/testing';
import {Component, View} from 'angular2/angular2';
import {DOM} from 'angular2/src/core/dom/dom_adapter';
import {PanelsWellsPage} from './panels-wells';

export function main() {
  describe('panels-wells component', () => {
    it('should work',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.overrideTemplate(TestComponent, '<div><panels-wells></panels-wells></div>')
          .createAsync(TestComponent)
          .then((rootTC) => {
            let panelsWellsDOMEl = rootTC.debugElement.componentViewChildren[0].nativeElement;

            expect(DOM.querySelectorAll(panelsWellsDOMEl, 'h1')[0].textContent).toEqual('Howdy!');
          });
      }));
  });
}

@Component({selector: 'test-cmp'})
@View({directives: [PanelsWellsPage]})
class TestComponent {}
