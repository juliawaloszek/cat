import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Functionality} from '../../../../../service/model/functionality';

@Component({
  selector: 'app-functionality',
  templateUrl: './functionality.component.html',
  styleUrls: ['./functionality.component.scss']
})
export class FunctionalityComponent implements OnInit {
  @Output() functionalityCheckChange: EventEmitter<any>;
  @Output() selected = new EventEmitter<any>();
  @Input() functionality: Functionality;
  @Input() checkAble = false;

  constructor() { }

  ngOnInit() {
  }

  expandPanel(panel, event) {
    event.stopPropagation();

    if (!this._isExpansionIndicator(event.target)) {
      this.selected.emit(this.functionality);

      if (panel._expanded) {
        panel.close();
      } else {
        panel.open();
      }
    }
  }

  loadData(item) {
    this.selected.emit(item);
  }

  private _isExpansionIndicator(target: EventTarget): boolean {
    const expansionIndicatorClass = 'mat-expansion-indicator';
    // z niewyjaśnionych powodów kompilator uważa, że target nie ma classList
    // @ts-ignore
    return target.classList && target.classList.contains(expansionIndicatorClass);
  }

}
