import { Injectable } from '@angular/core';
import { Contact } from '../models/contactDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class ContactService {
  contacts: Contact[];
  contactsSource = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
    this.getContacts()
  }

  getContacts = () => {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('MY_SECRET_ENCRYPTED_TOKEN'));
    this.http.get<Contact[]>(environment.baseUrl + 'contacts.json', { headers: headers }).subscribe(contacts => {
      this.contacts = contacts.sort((one, two) => (one.id > two.id ? -1 : 1));
      this.contactsSource.next(this.contacts);
    });
  }
  deleteContacts = (contacts: Contact[]) => {
    let index = this.contacts.length;
    while (index--) {
      if (contacts.find(contact => contact.id == this.contacts[index].id)) {
        this.contacts.splice(index, 1);
      }
    }
    this.contactsSource.next(this.contacts);
  }
  updateContact = (contact: Contact) => {
    this.contacts[this.contacts.findIndex(u => u.id == contact.id)] = contact;
    this.contactsSource.next(this.contacts);
  }
  addNewContact = (contact: Contact) => {
    contact.id=this.contacts[0].id +1;
    this.contacts.unshift(contact);
    this.contactsSource.next(this.contacts);
  }
}
