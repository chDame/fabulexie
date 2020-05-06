import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortnumber'
})
export class ShortnumberPipe implements PipeTransform {

  transform(value: number): string {
    let readablenum:string = "0";
        
    if(value>1000000000000){
      readablenum = String(Math.round(value/10000000000)/100) + " T";
    }else if(value>1000000000){
        readablenum = String(Math.round(value/10000000)/100) + " G";
    }else if(value>1000000){
        readablenum = String(Math.round(value/10000)/100) + " M";
    }else if(value>1000){
        readablenum = String(Math.round(value/10)/100) + " K";
    }else{
        readablenum = String(value)+ " ";   
    }
    return readablenum; 
  }

}
