import { Component, inject } from '@angular/core';
import { Chip } from "../_reusable/chip/chip";
import { provideTablerIcons, TablerIconComponent } from "angular-tabler-icons";
import { IconExternalLink } from 'angular-tabler-icons/icons';
import { DataService } from '../../_data/data-service';

@Component({
  selector: 'app-hero-tile',
  imports: [Chip, TablerIconComponent],
  templateUrl: './hero-tile.html',
  styles: ``,
  providers: [
    provideTablerIcons({
      IconExternalLink
    })
  ]
})
export class HeroTile {
  data = inject(DataService);
}
