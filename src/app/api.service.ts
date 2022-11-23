import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  server: string = "https://allumrah.com/ad/"; //Live Server for AD Assignment

  constructor(public http: HttpClient) {
    console.log("HELLO AUTH SERVICE PROVIDER");
  }

  postData(body, file) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json; charset=UTF-8",
    });
    let options = {
      headers: headers,
    };
    return this.http
      .post(this.server + file, JSON.stringify(body), options)
      .map((res) => res);
  }
}
