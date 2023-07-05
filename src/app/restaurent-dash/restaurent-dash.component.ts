import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormsModule } from '@angular/forms';
import { RestaurentData } from './restaurent.model';
import { ReservationData } from './reservation.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {
  formValue!: FormGroup;
  reserveTableValue!:FormGroup;
  restaurents : any;
  reservations : any = [];
  restaurentModelObj: RestaurentData = new RestaurentData;
  reservationModelObj : ReservationData = new ReservationData;
  name : string = '';
  email : string = '';
  mobile : string = '';
  address : string = '';
  services : string = '';


  guestName : string = '';
  guestEmail : string = '';
  guestMobile : string = '';
  guestAddress : string = '';
  nofPersons : string = '';

  selectedRestaurant : string = '';

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }
  ngOnInit(): void {
    this.getRestaurents();
  }

  clearFormValues(id : any){
    this.guestName = '';
    this.guestEmail = '';
    this.guestAddress = '';
    this.guestMobile = '';
    this.nofPersons = '';

    this.selectedRestaurant = id;
  }

  addRestaurent() {
    if (!this.validateAddRestaurentForm()) {
        alert("Please enter all the fields in the form");
    }
    this.restaurentModelObj.name = this.name;
    this.restaurentModelObj.email = this.email;
    this.restaurentModelObj.mobile = this.mobile;
    this.restaurentModelObj.address = this.address;
    this.restaurentModelObj.services = this.services;

    this.api.saveRestaurent(this.restaurentModelObj).subscribe(res => {
      this.getRestaurents();
    },
      err => {
        this.getRestaurents();
      })
    return true;
      
  };
  
  reserveTable(){

    if (!this.validateForm()){
      alert("Please enter all the fields in the form");
    }else {
      this.reservationModelObj.guestName = this.guestName;
      this.reservationModelObj.guestEmail = this.guestEmail;
      this.reservationModelObj.guestAddress= this.guestAddress;
      this.reservationModelObj.guestMobile = this.guestMobile;
      this.reservationModelObj.nofPersons = this.nofPersons;
    }
    debugger;

    this.api.saveReservation(this.reservationModelObj,this.selectedRestaurant).subscribe(res => {
      debugger;
      alert("Reservation detalis added successfully");
    },
      err => {
        alert("Error while adding Reservation detalis.");
      })
   
  }

  validateForm(){
    if (this.guestName.length <=0 || this.guestEmail.length <=0 || this.guestAddress.length <=0 
      || this.guestMobile.length <=0 
      || this.nofPersons.length <=0)
      return false;
    return true;
      
  }
  
  getRestaurents() {
    this.api.getRestaurents().subscribe(res=> {
      this.restaurents = res;
    })
  }

  validateAddRestaurentForm() {
    if (this.name.length <=0 || this.email.length <=0 || this.address.length <=0 || this.mobile.length <=0 
      || this.services.length <=0)
      return false;
    return true;
  }

  

  deleteRestaurent(id:any){
    this.api.deleteRestaurent(id).subscribe(res => {
      alert("Restaurant details deleted successfully");
      this.getRestaurents();
    },
    err => {
      alert("Restaurant details deleted successfully");
      this.getRestaurents();
    })
  }

  clearRestaurentValues() {
    this.name = '';
    this.email = '';
    this.address = '';
    this.mobile = '';
    this.services = '';

  }

  getReservations(id : any){
    debugger;
    this.api.getReservationsForRest(id).subscribe(res=> {
      debugger;
      this.reservations = res;
    })
  }


}
