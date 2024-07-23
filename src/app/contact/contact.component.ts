import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    text: new FormControl('', [Validators.required])
  });

  newsletterForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  hasSignedUp: boolean = false;
  hasSubmittedFeedback: boolean = false;

  constructor(private apiService: ApiService) {}

  submitNewsletterForm() {
    this.apiService.sendSignupEmail(this.newsletterForm.value.name, this.newsletterForm.value.email).subscribe((message: any) => {
      console.log(message);
    });
    this.newsletterForm.setValue({name: '',email: '' })
    this.hasSignedUp = true;

  }

  submitContactForm() {
    this.apiService.sendContactEmail(this.contactForm.value.name, this.contactForm.value.email, this.contactForm.value.text).subscribe((message: any) => {
      console.log(message);
    });
    this.contactForm.setValue({name: '', email: '', text: ''})
    this.hasSubmittedFeedback = true;
    


    // TODO add contact service and form validation
  }
  
  
}
