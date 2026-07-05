import { Component, inject } from '@angular/core';
import { DataService } from '../../_data/data-service';
import { Chip } from "../_reusable/chip/chip";

@Component({
  selector: 'app-stack-tile',
  imports: [Chip],
  templateUrl: './stack-tile.html',
  styles: ``,
})
export class StackTile {
  data = inject(DataService)
}
