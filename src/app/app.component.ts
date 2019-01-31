import { Component, OnInit } from '@angular/core';
import { ItemService } from './item.service'
import { BehaviorSubject } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { IItem } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ ItemService ],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public errorMsg

  //hard code first item
  items = new BehaviorSubject<{[name:string]: any}>({})

  tableDataSource = new BehaviorSubject<any[]>([])

  closeResult: string

  responseCode: string

  item:IItem[]

  constructor(private itemService: ItemService, private modalService: NgbModal) {}

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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  createItem(addItemId:string, addItemDescription:string, addItemLastSold:string, addItemShelfLife:string, 
    addItemDepartment:string, addItemPrice:string, addItemUnit:string, addItemXFor:string, addItemCost:string) {
      this.itemService.createItem(addItemId, addItemDescription, addItemLastSold, addItemShelfLife,
        addItemDepartment, addItemPrice, addItemUnit, addItemXFor, addItemCost)
        .subscribe(data => this.item = data, error => this.errorMsg = error)
  }

  fileChange(event): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
        const file = fileList[0];
        this.itemService.createItemsFromFile(file)
        .subscribe(data => this.items.next(data),
               error => this.errorMsg = error)
    }
}
}
