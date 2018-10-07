import { Component, OnInit } from '@angular/core';
import { FirebaseService, Category, Business } from "./services/firebase.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  businesses: Business[];
  categories: Category[];

  activeKey: string;
  appState: string;

  activeCompany:string;
  activeCategory:string;
  activeYearsInBusiness:number;
  activeDescription:string;
  activePhone:string;
  activeEmail:string;
  activeStreetAddress:string;
  activeCity:string;

  constructor(private firebaseService: FirebaseService){}

  ngOnInit()
  {
    this.appState = "default";
    this.firebaseService.getBusinesses()
        .subscribe(businesses => {
          this.businesses = businesses
        });

    this.firebaseService.getCategories()
        .subscribe(categories => {
          this.categories = categories
        });
  }

  changeState(state, key = null)
  {
    if(key != null)
    {
      this.activeKey = key;
    }
    this.appState = state;
  }

  filterCategory(category)
  {
    this.firebaseService.getBusinesses(category)
        .subscribe(businesses => {
          this.businesses = businesses
        });
  }

  addBusiness(
      company: string,
      category: string,
      years_in_business: number,
      description: string,
      phone: string,
      email: string,
      street_address: string,
      city: string)
  {
    var created_at = new Date().toString();
    var newBusiness = {
      company: company,
      category: category,
      years_in_business: years_in_business,
      description: description,
      phone: phone,
      email: email,
      street_address: street_address,
      city: city,
      created_at: created_at
    };
    //console.log(newBusiness);
    this.firebaseService.addBusiness(newBusiness);
    this.changeState('default');
  }

  showEdit(business)
  {
    this.changeState('edit', business.$key);
    this.activeCompany =          business.company;
    this.activeCategory =         business.category;
    this.activeYearsInBusiness =  business.years_in_business;
    this.activeDescription =      business.description;
    this.activePhone =            business.phone;
    this.activeEmail =            business.email;
    this.activeStreetAddress =    business.street_address;
    this.activeCity =             business.city;
  }

  updateBusiness(){
    var updBusiness = {
      company:this.activeCompany,
      category:this.activeCategory,
      years_in_business:this.activeYearsInBusiness,
      description:this.activeDescription,
      phone:this.activePhone,
      email:this.activeEmail,
      street_address: this.activeStreetAddress,
      city: this.activeCity
    };

    this.firebaseService.updateBusiness(this.activeKey, updBusiness);

    this.changeState('default');
  }

  deleteBusiness(key){
    this.firebaseService.deleteBusiness(key);
    this.changeState('default');
  }

}
