import {Injectable} from "@angular/core";
import {AngularFire, FirebaseListObservable} from "angularfire2";
import 'rxjs/add/operator/map';

@Injectable()

export class FirebaseService
{

    businesses: FirebaseListObservable<Business[]>;
    categories: FirebaseListObservable<Category[]>;

    constructor(private af: AngularFire) {}

        getBusinesses(category: string = null)
        {
            if (category != null)
            {
                this.businesses = this.af.database.list('businesses', {
                    query:{
                        orderByChild: 'category',
                        equalTo: category
                    }
                }) as FirebaseListObservable<Business[]>;
            }
            else
            {
                this.businesses = this.af.database.list('businesses') as FirebaseListObservable<Business[]>;
            }
            return this.businesses;
        }

        getCategories()
        {
            this.categories = this.af.database.list('categories') as FirebaseListObservable<Category[]>;
            return this.categories;
        }

        addBusiness(newBusiness)
        {
            return this.businesses.push(newBusiness);
        }

        updateBusiness(key, updBusiness)
        {
            return this.businesses.update(key, updBusiness);
        }

        deleteBusiness(key)
        {
            this.businesses.remove(key);
        }
}

export interface Business
{
    $key?: string,
    category?: string,
    city?: string,
    company?: string,
    description?: string,
    email?: string,
    phone?: string,
    street_address?: string,
    years_in_business?: number
}

export interface Category
{
    $key?: string,
    name?: string
}