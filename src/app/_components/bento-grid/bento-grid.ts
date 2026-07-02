import { Component, inject, OnInit } from '@angular/core';
import { HeroTile } from "../hero-tile/hero-tile";
import { ProjectsTile } from "../projects-tile/projects-tile";
import { DataService } from '../../_data/data-service';
import { StackTile } from "../stack-tile/stack-tile";
import { CertsTile } from "../certs-tile/certs-tile";
import { WorkAvailabilityTile } from "../work-availability-tile/work-availability-tile";

@Component({
  selector: 'app-bento-grid',
  imports: [HeroTile, ProjectsTile, StackTile, CertsTile, WorkAvailabilityTile],
  templateUrl: './bento-grid.html',
  styleUrl: './bento-grid.css',
})
export class BentoGrid implements OnInit {
  data = inject(DataService);
  
  async ngOnInit(): Promise<void> {
    this.data.fetchProjects();
    this.data.fetchStackChips();
    this.data.fetchCerts();
    this.data.fetchAvailability();
  }

}
