import { NgModule } from '@angular/core';

import { ContactsRoutingModule } from './contacts-routing.module'
import { ContactsListComponent } from './components/list/contacts.list.component';
import { ContactFormComponent } from './components/form/contact.form.component';

import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ContactInterceptorService } from './services/httpInterceptor';

@NgModule({
  declarations: [
    ContactsListComponent,
    ContactFormComponent],
  imports: [
    SharedModule,
    ContactsRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ContactInterceptorService, multi: true },
  ]
})
export class ContactsModule { }
