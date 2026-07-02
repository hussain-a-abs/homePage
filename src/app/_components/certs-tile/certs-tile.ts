import { Component, Input } from '@angular/core';
import { Certification } from '../../_data/models';
import { Chip } from "../_reusable/chip/chip";
import { provideTablerIcons, TablerIconComponent } from "angular-tabler-icons";
import { IconCloud, IconShieldCheck, IconServer, IconDatabase, IconExternalLink } from 'angular-tabler-icons/icons';

@Component({
  selector: 'app-certs-tile',
  imports: [Chip, TablerIconComponent],
  templateUrl: './certs-tile.html',
  styleUrl: './certs-tile.css',
  providers: [
    provideTablerIcons({
      IconCloud,
      IconShieldCheck,
      IconServer,
      IconDatabase,
      IconExternalLink
    })
  ]
})
export class CertsTile {
  @Input({ required: true }) cert!: Certification;


}
