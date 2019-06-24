import {DataSource} from '@angular/cdk/table';
import {MatPaginator, MatSort} from '@angular/material';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export class SimpleDataSource implements DataSource<any> {
  filterChange = new BehaviorSubject('');

  get filter() {
    return this.filterChange.value;
  }

  set filter(filter: string) {
    this.filterChange.next(filter);
  }

  filteredData: any[] = [];
  renderedData: any[] = [];

  private dataSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(public database: any,
              public paginator: MatPaginator) {
              // public sort: MatSort) {
    // super();
    this.loadData(this.database);
    // this.filterChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  connect(): Observable<any[]> {
    // const displayDataChanges = [
    //   this.dataSubject.dataChange,
    //   // this.sort.sortChange,
    //   this.filterChange,
    //   this.paginator.page
    // ];
    //
    // return merge(...displayDataChanges).pipe(
    //   map( () => {
    //     this.filteredData = this.database.data.slice().filter((el: any) => {
    //       const searchStr = el.name.toLowerCase();
    //       return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
    //     });
    //
    //     // const sortedData = this.sortData(this.filteredData.slice());
    //     const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    //     this.renderedData = this.filteredData.splice(startIndex, this.paginator.pageSize);
    //
    //     return this.renderedData;
    //   }));
    return this.dataSubject.asObservable();
  }

  disconnect() {}

  loadData(data) {
    this.dataSubject.next(data);
  }

  // sortData(data: any[]): any[] {
  //   if (this.sort.active || this.sort.direction === '') {
  //     return data;
  //   }
  //
  //   return data.sort((a, b) => {
  //     const propertyA: number | string = a[this.sort.active];
  //     const propertyB: number | string = b[this.sort.active];
  //
  //     const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
  //     const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
  //
  //     return (valueA < valueB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
  //   });
  // }
}
