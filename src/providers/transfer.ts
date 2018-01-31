import { Injectable } from '@angular/core';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';

import { APIHOST } from '../configs';
import { AuthService } from './auth';
import { Utils } from './utils';

@Injectable()
export class TransferService {
  public fileTransfer: TransferObject

  constructor(
    private transfer: Transfer, 
    private authService: AuthService) {
    this.fileTransfer = transfer.create();
  }

  uploadTruckLogo(path){
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'truck-image.jpg',
      chunkedMode: false,
      mimeType: "image/jpg",
      headers: this.authService.simpleHeaders
    };

    return this.fileTransfer.upload(path, APIHOST+'truck/image', options);
  }

}
