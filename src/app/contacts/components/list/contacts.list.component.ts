import { Component, OnInit, ViewChild } from '@angular/core';
import { Contact } from '../../models/contactDTO';
import { ContactService } from '../../services/contact.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts.list.component.html',
  styleUrls: ['./contacts.list.component.scss']
})
export class ContactsListComponent implements OnInit {

  contacts = new Array<Contact>();
  selectedContacts  = new Array<Contact>();

  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;

  dataSource: MatTableDataSource<Contact>;
  displayedColumns = ['selected','name', 'email', 'phone1', 'phone2', 'Actions'];


  constructor(public contactService: ContactService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts = () => {
    this.contactService.contactsSource.subscribe(result => {
      this.contacts = result;
      this.organizeContacts();
    });
  }

  deleteContacts = (contact?: Contact) => {
    if (confirm("Are you sure to delete the selected Contact/Contacts" )) {
      if(contact)
        this.selectedContacts.push(contact);
      this.contactService.deleteContacts(this.selectedContacts);
      this.selectedContacts = new Array<Contact>();
      this.organizeContacts();
      this.snackBar.open("Selected Contact/Contacts deleted Successfully", "OK");
    }
  }

  search = (filterValue: string) => {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }
  
  toggleCheck = (contact: Contact) => {
    this.contacts.find(u => u == contact).selected = !this.contacts.find(u => u == contact).selected;
    this.selectedContacts = this.contacts.filter(u => u.selected);
  }

  organizeContacts(){
    this.dataSource = new MatTableDataSource(this.contacts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }
}