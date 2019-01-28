import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { IItem } from './item'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  getAllItemsUrl = 'http://localhost:8080/hebdev2/services/v1/Items/FindAllItems';
  findItemsUrl = 'http://localhost:8080/hebdev2/services/v1/Items/FindItemsByString/';
  deleteItemUrl = 'http://localhost:8080/hebdev2/services/v1/Items/DeleteItem/';

  constructor(private http:HttpClient) {
  }

  //get a list of all items in db
  getAllItems(): Observable<IItem[]> {
    return this.http.get<IItem[]>(this.getAllItemsUrl).catch(this.errorHandler)   
  }

  //use string to search and only return items with fields matching substring
  findItemsByString(string: String): Observable<IItem[]> {
    return this.http.get<IItem[]>(this.findItemsUrl+string)   
  }

  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error")
  }

  deleteItem(itemId: String): Observable<IItem[]>  {
    return this.http.delete<IItem[]>(this.deleteItemUrl+itemId).catch(this.errorHandler)
  }
}
