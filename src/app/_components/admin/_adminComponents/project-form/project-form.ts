import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../../../_data/data-service';
import { Project } from '../../../../_data/models';
import { provideTablerIcons, TablerIconComponent } from "angular-tabler-icons";
import { IconChevronDown, IconChevronRight, IconChevronUp, IconFileText, IconPlayerPlay, IconTrash } from 'angular-tabler-icons/icons';
@Component({
  selector: 'app-project-form',
  imports: [ReactiveFormsModule, TablerIconComponent],
  templateUrl: './project-form.html',
  styles: ``,
  providers: [
    provideTablerIcons({
      IconChevronDown, IconChevronRight,
      IconTrash, IconFileText, IconPlayerPlay,
      IconChevronUp
    }),
  ]
})
export class ProjectForm implements OnInit {
  @Input() project: Project = {
    title: "",
    subtitle: "",
    description: "",
    displayType: 'writeup',
    id: "",
    isLive: false,
  };
  @Output() onDelete = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<Partial<Project>>();
  data = inject(DataService);
  fb = inject(FormBuilder);
  isOpen = signal(false);
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.project?.title || "", Validators.required],
      subtitle: [this.project?.subtitle || "", Validators.required],
      description: [this.project?.description || ""],
      displayType: [this.project?.displayType, Validators.required],
      id: [this.project?.id || ""]
    })
  }

  toggle() { this.isOpen.update(v => !v); }

  setDisplayType(type: 'writeup' | 'demo') {
    this.form.controls['displayType'].setValue(type);
  }

  save() {
    if (this.form.valid) {
      Object.assign(this.project, this.form.value);
      this.isOpen.set(false);
    }
  }
}
