import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContactsListComponent } from './components/list/contacts.list.component';
import { ContactFormComponent } from './components/form/contact.form.component';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';

const routes: Routes = [
  { path: 'Contacts', component: ContactsListComponent },
  { path: 'Contacts/:id', component: ContactFormComponent, canDeactivate :[CanDeactivateGuard] },
  { path: '**', component: ContactsListComponent }, // wiledcard path used when no other path match
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers:[CanDeactivateGuard]
})
export class ContactsRoutingModule { }
