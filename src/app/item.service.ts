import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { IItem } from './item'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {


  getAllItemsUrl = 'http://localhost:8080/hebdev2/services/v1/Items/FindAllItems'
  findItemsUrl = 'http://localhost:8080/hebdev2/services/v1/Items/FindItemsByString/'
  deleteItemUrl = 'http://localhost:8080/hebdev2/services/v1/Items/DeleteItem/'
  addItemUrl = 'http://localhost:8080/hebdev2/services/v1/Items/CreateItem/'
  createItemsFromFileUrl = 'http://localhost:8080/hebdev2/services/v1/Items/CreateItemsFromFile/'

  constructor(private http:HttpClient) {
  }

  //get a list of all items in db
  getAllItems(): Observable<IItem[]> {
    return this.http.get<IItem[]>(this.getAllItemsUrl).catch(this.errorHandler)   
  }

  //use string to search and only return items with fields matching substring
  findItemsByString(string: String): Observable<IItem[]> {
    
    return this.http.post<IItem[]>(this.findItemsUrl, string, httpOptions)   
  }

  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error")
  }

  deleteItem(itemId: String): Observable<IItem[]>  {
    return this.http.delete<IItem[]>(this.deleteItemUrl+itemId).catch(this.errorHandler)
  }

  createItem(addItemId:string, addItemDescription:string, addItemLastSold:string, addItemShelfLife:string, 
    addItemDepartment:string, addItemPrice:string, addItemUnit:string, addItemXFor:string, addItemCost:string) {
    let item: IItem
    //item.itemId = addItemId
    item = {
      id: addItemId,
      description: addItemDescription,
      lastSold: addItemLastSold,
      shelfLife: addItemShelfLife,
      department: addItemDepartment,
      price: addItemPrice,
      unit: addItemUnit,
      xfor: addItemXFor,
      cost: addItemCost

      }
    return this.http.post<IItem[]>(this.addItemUrl, item, httpOptions)
    .catch(this.errorHandler)

    }

    createItemsFromFile(file:File){
      return this.http.post(this.createItemsFromFileUrl, file, httpOptions)
      .catch(this.errorHandler)
    }
}
