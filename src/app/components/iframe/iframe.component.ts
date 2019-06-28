import {Component, Input, OnInit} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as url from 'url';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})

export class IframeComponent implements OnInit {
  // @ViewChild('iframeSpinner') spinner: MatProgressSpinner;
  safeUrl: SafeResourceUrl;
  showSpinner = true;

  constructor(public sanitizer: DomSanitizer) {
  }

  @Input()
  set url(stringUrl: url) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.location.protocol + '//' + window.location.hostname + stringUrl);
  }

  ngOnInit() {
  }

  onIframeLoad() {
    this.showSpinner = false;
  }

}
