import { Component, computed, Input } from '@angular/core';

@Component({
  selector: 'app-chip',
  imports: [],
  template: `
    <span [class]="classes()" class="">
      <ng-content />
    </span>
  `,
})
export class Chip {
  @Input() variant: 'light' | 'dark' = 'light';
  @Input() index = 0;

  private readonly cycle: Array<'blue' | 'purple' | 'teal' | 'amber'> =
    ['blue', 'purple', 'teal', 'amber'];

  private lightMap = {
    blue:   'bg-pill-blue-bg text-pill-blue-text',
    purple: 'bg-pill-purple-bg text-pill-purple-text',
    teal:   'bg-pill-teal-bg text-pill-teal-text',
    amber:  'bg-pill-amber-bg text-pill-amber-text',
  };

  private darkMap = {
    blue:   'bg-pill-dark-blue-bg text-pill-dark-blue-text',
    purple: 'bg-pill-dark-purple-bg text-pill-dark-purple-text',
    teal:   'bg-pill-dark-teal-bg text-pill-dark-teal-text',
    amber:  'bg-pill-dark-amber-bg text-pill-dark-amber-text',
  };

  classes = computed(() => {
    const map = this.variant === 'dark' ? this.darkMap : this.lightMap;
    const color = this.cycle[this.index % this.cycle.length];
    return `${map[color]} text-[10px] px-2 py-0.5 rounded-full me-1`;
  });
}