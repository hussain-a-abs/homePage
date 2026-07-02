import { Component, inject } from '@angular/core';
import { Chip } from "../_reusable/chip/chip";
import { ProjectRow } from "../_reusable/project-row/project-row";
import { Project } from '../../_data/models';
import { DataService } from '../../_data/data-service';

@Component({
  selector: 'app-projects-tile',
  imports: [ProjectRow],
  templateUrl: './projects-tile.html',
  styleUrl: './projects-tile.css',
  host: {
  }
})
export class ProjectsTile {
  data = inject(DataService);
}
