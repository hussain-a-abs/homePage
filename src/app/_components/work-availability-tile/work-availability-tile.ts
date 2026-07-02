import { Component, Input } from '@angular/core';
import { Availability } from '../../_data/models';

@Component({
  selector: 'app-work-availability-tile',
  imports: [],
  template: ` 
  <div class="surface-base rounded-tile p-4 flex flex-col gap-3 h-full">
  <p class="text-label">Open to work</p>

  <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-pill-teal-text bg-pill-teal-bg self-start">
    <div class="w-1.5 h-1.5 rounded-full bg-dot-3 shrink-0"></div>
    <span class="text-[11px] text-pill-teal-text">
      {{ availability.available ? 'Available now' : 'Not available' }}
    </span>
  </div>

  <div class="flex flex-col gap-2">
    @for (role of availability.roles; track role) {
      <div class="flex items-center gap-2">
        <div class="w-1.5 h-1.5 rounded-full bg-text-faint shrink-0"></div>
        <span class="text-body">{{ role }}</span>
      </div>
    }
  </div>

  <span class="text-muted mt-auto">{{ availability.location }}</span>
</div>
`,
  styles: ``,
})
export class WorkAvailabilityTile {
  @Input({ required: true }) availability!: Availability;
}
