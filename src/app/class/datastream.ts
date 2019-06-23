import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable, BehaviorSubject} from 'rxjs';

export class DataStream  extends DataSource<any> {
  dataStream: BehaviorSubject<any[]>;

  constructor(private dataTable: any) {
    super();
    this.dataStream = new BehaviorSubject(dataTable);
  }

  // set data(value: any[]) {
  //   console.log(value);
  //   this.dataStream.next(value);
  // }
  //
  // get data(): any[] {
  //   return this.dataStream.value;
  // }
  //
  // addData(data) {
  //   const copiedData = this.data.slice();
  //   data.forEach(item => copiedData.push(item));
  //   this.data = copiedData;
  // }

  connect(collectionViewer: CollectionViewer): Observable<any[] | ReadonlyArray<any>> {
    return undefined;
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }
}
