import {Component, Input, OnInit} from '@angular/core';
import { Application } from '../../service/class/application';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as url from 'url';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})

export class IframeComponent implements OnInit {
  @Input() url: url;
  safeUrl: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) {
    console.log(this.url);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  ngOnInit() {
  }

}
