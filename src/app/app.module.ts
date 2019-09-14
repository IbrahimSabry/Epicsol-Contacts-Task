
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ContactsModule } from './contacts/contacts.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    ContactsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }