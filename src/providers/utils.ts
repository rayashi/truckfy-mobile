import { Injectable } from '@angular/core';

@Injectable()
export class Utils {
  static PHONE_MASK = ['(',/[1-9]/,/\d/,')',' ',/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/];

  constructor() {}

  static unMaskMoney(amount: string): number{
    if(!amount) return 0;
    let i = amount.split(',')[0].replace(/\D+/g, '');
    let d = amount.split(',')[1] || '00';
    return parseFloat(i.concat('.').concat(d));
  }

  static maskMoney(amount: number): string{
    if(!amount) return 'R$ ';
    let i = String(amount).replace('.',',');
    return 'R$ '.concat(i);
  }

  static unMaskPhone(phone: string): string{
    return phone.replace(/\D+/g, '');
  }

  static maskPhone(phone: string): string{
    if(phone){
      return `(${phone.slice(0,2)}) ${phone.slice(2)}`;
    }else{
      return '';
    }
  }
}
