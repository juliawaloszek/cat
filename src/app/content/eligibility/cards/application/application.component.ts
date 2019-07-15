import {Component, Input, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material';
import {Application} from '../../../../service/model/application';
import {Functionality} from '../../../../service/model/functionality';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Privilege} from '../../../../service/model/privilege';

@Component({
  selector: 'app-application-card',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  @Input() application: Application;

  // private _transformer = (node: any) => {
  //   return {
  //     expandable: node instanceof Functionality,
  //     name: node.name,
  //     level: node instanceof Functionality ? 0 : 1
  //   };
  // }
  // treeControl = new FlatTreeControl<Functionality>(
  //   node => node instanceof Functionality ? 0 : 1,
  //   node => !!node.privileges && node.privileges.length > 0);
  // treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.privileges);
  // dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  constructor() {
    // if (this.application && this.application.functionalities) {
    //   this.dataSource.data = this.application.functionalities.functionality;
    // }
  }

  ngOnInit() {
    console.log(this.application);
  }

  setActive(active) {
    console.log(active);
  }

  expand(event) {
    console.log(event);
  }

}
