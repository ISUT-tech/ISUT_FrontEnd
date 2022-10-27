import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }
  public exportAsExcel(json: any[], excelFileName: string): void {
    var excelData: any = [];
    for (var i = 0; i < json.length; i++) {
      var jsonData = {
        "S.No.": i + 1,
        "Niche": json[i].niche,
        "Company Name": json[i].companyName,
        "City": json[i].city,
        "State": json[i].state,
        "Phone Number": json[i].phoneNumber,
        "Email": json[i].email.split(",").join("\n"),
        "Website": json[i].websiteLink,
        "Contact Url": json[i].contactForm,
        "Create Date": json[i].createdAt,
        "Update Date": json[i].updatedAt,
        "Basic Details": json[i].basicDetails
      };
      excelData.push(jsonData);
      console.log(json[i].email.split(",").join("\n"));
    }
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}