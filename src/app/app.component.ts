import { Component, OnInit } from '@angular/core';
import { ItemService } from './item.service'
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ ItemService ],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public errorMsg;

  //hard code first item
  items = new BehaviorSubject<{[name:string]: any}>({
    'Item 1' : {
      id: '743542',
      description: 'banana',
      lastSold: '9/5/2017',
      shelfLife: '4d',
      department: 'Produce',
      price: '$2.99',
      unit: 'lb',
      xfor: '1',
      cost: '$0.44'
    }

  });

  tableDataSource = new BehaviorSubject<any[]>([]);

  constructor(private itemService: ItemService) {}

  title = 'HEB Developer II Programming Challenge';
  displayedColumns = new BehaviorSubject<string[]>(['id', 'description', 'lastSold', 'shelfLife',
                      'department', 'price', 'unit', 'xfor', 'cost', 'delete']);

  //load hard coded item on startup
  ngOnInit() {
    this.items.subscribe(items => {
      this.tableDataSource.next(Object.values(items))
    })

  }

  //get all items from db, handle error
  loadData() {
    this.itemService.getAllItems()
    .subscribe(data => this.items.next(data),
               error => this.errorMsg = error)
  }

  //search db for fields matchig substring, handle error
  findItemsByString(string:String){
    //if no string was given in search, return all items from db
    if (string == null || string == ""){
      this.itemService.getAllItems()
      .subscribe(data => this.items.next(data),
                 error => this.errorMsg = error)
    } else {
      this.itemService.findItemsByString(string)
      .subscribe(data => this.items.next(data),
                 error => this.errorMsg = error)
    }
  }

  deleteItem(itemId:String){
    this.itemService.deleteItem(itemId)
    .subscribe(data => this.items.next(data),
    error => this.errorMsg = error)
  }
}
