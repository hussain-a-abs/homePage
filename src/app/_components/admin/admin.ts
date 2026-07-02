import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TablerIconComponent, provideTablerIcons } from 'angular-tabler-icons';
import { IconArrowLeft, IconNumber123, IconLayoutGrid } from 'angular-tabler-icons/icons';
import { ProjectForm } from "./_adminComponents/project-form/project-form";
import { CertsForm } from "./_adminComponents/certs-form/certs-form";
import { DataService } from '../../_data/data-service';

@Component({
  selector: 'app-admin',
  imports: [TablerIconComponent, ProjectForm, CertsForm, RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
  providers: [
    provideTablerIcons({
      IconArrowLeft,
      IconLayoutGrid
    }),
  ]
})
export class Admin implements OnInit {
  router = inject(Router);
  data = inject(DataService);
  isExpandedProjects = false;

  expandSection(section: string){

  }

  ngOnInit(): void {
    this.data.fetchProjects();
  }



  
}
