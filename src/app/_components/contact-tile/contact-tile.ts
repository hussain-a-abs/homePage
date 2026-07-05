import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { provideTablerIcons, TablerIconComponent } from "angular-tabler-icons";
import { IconSend } from 'angular-tabler-icons/icons';
@Component({
  selector: 'app-contact-tile',
  imports: [ReactiveFormsModule, TablerIconComponent],
  templateUrl: './contact-tile.html',
  styles: ``,
  providers: [
    provideTablerIcons({
      IconSend
    })
  ]
})
export class ContactTile {
  // private fb = inject(FormBuilder);
  // form = this.fb.group({
  //   email: ['', [Validators.required, Validators.email]],
  //   subject: ['', Validators.required],
  //   message: ['', Validators.required],
  // })

  private http = inject(HttpClient);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });

  sending = signal(false);
  sent = signal(false);
  error = signal(false);

  submit() {
    // trim before checking validity 
    Object.keys(this.form.controls).forEach(key => {
      const ctrl = this.form.get(key);
      ctrl?.setValue(ctrl.value.trim(), {})
      this.form.updateValueAndValidity();
    })

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.sending.set(true);
    this.error.set(false);

    this.http.post('/api/contactForm', this.form.value).subscribe({
      next: () => {
        this.sent.set(true);
        this.sending.set(false);
        this.form.reset();
      },
      error: () => {
        this.error.set(true);
        this.sending.set(false);
      }
    });
  }

}
