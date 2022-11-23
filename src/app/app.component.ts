import { Component, OnInit } from "@angular/core";
import { AnalyticsService } from "./@core/utils/analytics.service";
import { SeoService } from "./@core/utils/seo.service";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-app",
  template: "<router-outlet></router-outlet>",
})
export class AppComponent implements OnInit {
  constructor(
    private analytics: AnalyticsService,
    private seoService: SeoService,
    private router: Router
  ) {
    console.log("I AM IN THE APP COMPONENT");
    if (
      localStorage.getItem("userData") == "" ||
      localStorage.getItem("userData") == null
    ) {
      this.router.navigate(["/auth/login"]);
      console.log("NO AGENT ID");
    } else {
      console.log("COMPANY ID FOUND");
      this.router.navigate(["/pages/iot-dashboard"]);
    }
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }
}
