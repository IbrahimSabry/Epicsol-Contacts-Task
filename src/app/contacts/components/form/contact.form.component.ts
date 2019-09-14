import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { MatSnackBar } from '@angular/material';
import { Contact } from '../../models/contactDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { LabelService } from '../../services/labels.service';
import { Label } from '../../models/labelDTO';
import { Phone } from '../../models/phoneDTO';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact.form.component.html',
  styleUrls: ['./contact.form.component.scss']
})
export class ContactFormComponent implements OnInit {

  contactForm: FormGroup;
  contact = new Contact;
  labels:Label[];
  contact_validation_messages = {
    'name': [
      { type: 'required', message: 'Contact Name is Required' },
    ],
    'email': [
      { type: 'pattern', message: 'Wrong Email Format' },
    ],
    'phoneNumber': [
      { type: 'required', message: 'Phone Number is Required' },
      { type: 'pattern', message: 'Wrong Phone Number' },
    ],
    'phoneLabel': [
      { type: 'pattern', message: 'Phone Label is Required' },
    ]
  };

  constructor(public formBuilder: FormBuilder,
    public contactService: ContactService,
    public labelsService:LabelService,
    public snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.intiateForm();
    if (this.activatedRoute.snapshot.params['id']) {
      this.activatedRoute.params.subscribe(p => {
        this.contact.id = p["id"]
        this.getLabels();
        if(this.contact.id != 0){
          this.getContact();
        }
        else {
          const linesFormArray = this.contactForm.get("phones") as FormArray;
          linesFormArray.push(this.phone);
        }
      })
    }
    else {
      this.router.navigateByUrl('/Contacts');
    }
  }
  intiateForm = () => {
    this.contactForm = this.formBuilder.group({
      id: [this.contact.id],
      name: [this.contact.name, [Validators.required]],
      email: [this.contact.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$')],
      phones: this.formBuilder.array([]),
    });
  }
  get phone(): FormGroup{
    return this.formBuilder.group({
      number: ["", [Validators.required,Validators.pattern('^(0|[0-9][0-9]*)$')]],
      label: ["select",Validators.pattern('^(?!.*select).*$')]
    })
  }
  getContact = () => {
    this.contactService.contactsSource.subscribe(contacts => {
      if (contacts.length) {
        this.contact = contacts.find(u => u.id == this.contact.id);
        for (let v = 0; v < this.contact.phones.length; v++){
          const linesFormArray = this.contactForm.get("phones") as FormArray;
          linesFormArray.push(this.phone);
        }
        this.contactForm.patchValue(this.contact);
      }
      else {
        this.router.navigateByUrl("/Contacts");
      }
    })
  }
  getLabels = () => {
    this.labelsService.getLabels().subscribe((res) => {
      this.labels = res;
    });
  }
  deletePhone =(phoneIndex) =>{
    const linesFormArray = this.contactForm.get("phones") as FormArray;
    linesFormArray.removeAt(phoneIndex);
  }
  addPhone =() =>{
    const linesFormArray = this.contactForm.get("phones") as FormArray;
    linesFormArray.push(this.phone);
  }
  save = () => {
    if(this.contact.id != 0){
      this.contactService.updateContact(this.contactForm.getRawValue());
      this.contactForm.reset();
      this.router.navigateByUrl("/Contacts");
      this.snackBar.open("Contact Updated Successfully", "OK");
    }
    else{
      this.contactService.addNewContact(this.contactForm.getRawValue());
      this.contactForm.reset();
      this.router.navigateByUrl("/Contacts");
      this.snackBar.open("New Contact Added Successfully", "OK");
    }
  }
  cancel = () => {
    this.router.navigateByUrl("/Contacts");
  }
  canDeactivate = () => {
    if (this.contactForm.dirty) {
      return confirm("Discard Changes for: " + this.contact.name);
    }
    return true;
  }
}
