import { Component, inject, Input, signal, Signal, ViewEncapsulation } from '@angular/core';
import { provideTablerIcons, TablerIconComponent } from "angular-tabler-icons";
import { DataService } from '../../_data/data-service';
import { Project } from '../../_data/models';
import { IconArrowLeft } from 'angular-tabler-icons/icons';
import { RouterLink } from '@angular/router';
import { provideMarkdown, MarkdownComponent, MARKED_OPTIONS, } from 'ngx-markdown';
import { Chip } from "../_reusable/chip/chip";
@Component({
  selector: 'app-project-component',
  imports: [TablerIconComponent, RouterLink, MarkdownComponent, Chip],
  templateUrl: './project-component.html',
  styles: ``,
  providers: [
    provideMarkdown({
      markedOptions: {
        provide: MARKED_OPTIONS,
        useValue: {
          gfm: true,
          breaks: true
        }
      }
    }),
    provideTablerIcons({
      IconArrowLeft
    })
  ]
})
export class ProjectComponent {
  private data = inject(DataService);
  @Input() urlSlug!: string;
  project = signal<Project | undefined | null> ( undefined);

  async ngOnInit() {
    await this.data.getProjectByUrlSlug(this.urlSlug).then(val => {
      this.project.set(val);
    })
  }
}
