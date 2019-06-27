import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSort } from '@angular/material';

export class SimpleDataSource implements DataSource<any> {
  public filteredData: any[] = [];
  private dataSubject = new BehaviorSubject<any[]>([]);
  private filterValue = '';

  constructor(public database: any,
              public sort: MatSort) {

    this.filteredData = this.database;
    this.loadData(this.database);
  }

  get filter() {
    return this.filterValue;
  }

  set filter(filter) {
    this.filterValue = filter;
    this.filterData(filter);
  }

  connect(): Observable<any[]> {
    return this.dataSubject.asObservable();
  }

  disconnect() {}

  loadData(data) {
    this.database = this.filteredData = data;
    this.dataSubject.next(data);
  }

  filterData(value) {
    const me = this;
    const filter = value.toLowerCase();

    this.filteredData = this.database.filter((item: any) => {
      return me.searchInObject(item, filter);
    });

    this.dataSubject.next(this.filteredData);
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

  // w przyszłości to można przenieść do jakichś utilsów czy coś
  searchInObject(object, value): boolean {
    const me = this;

    return !!Object.keys(object).find(key => {
      if (Array.isArray(object[key])) {
        return false;
      } else {
        switch (typeof object[key]) {
          case 'object':
            return me.searchInObject(object[key], value);
          case 'boolean':
            return false;
          default:
            const keyValue = typeof object[key] === 'string' ?
              object[key].toLowerCase() :
              object[key].toString();

            return keyValue.indexOf(value) !== -1;
        }
      }
    });
  }
}
