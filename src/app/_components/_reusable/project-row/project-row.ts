import { Component, computed, Input } from '@angular/core';
import { Project } from '../../../_data/models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-row',
  imports: [RouterLink],
  styles: ``,

  template: `
  <div [routerLink]="'project/'+project.urlSlug" class="flex items-center gap-2 py-1.5 border-b divider-subtle last:border-0 rounded-md cursor-pointer transition-colors hover:bg-surface-raised">
    <div class="w-1.5 h-1.5 rounded-full shrink-0"
        [style.background]="dotColor()">
    </div>
    <span class="text-body">{{ project.title }}</span>
    <span class="text-muted ml-auto">{{ project.subtitle }}</span>
  </div>
  `,

})
export class ProjectRow {
  @Input() project!: Project;
  @Input() colorIndex = 0;

  private readonly colorVars = [
    "--color-dot-1",
    "--color-dot-2",
    "--color-dot-3",
    "--color-dot-4",
  ];

  dotColor = computed(() => {
    const varName = this.colorVars[this.colorIndex % this.colorVars.length];
    return getComputedStyle(document.documentElement).getPropertyValue(varName);
  });
}
