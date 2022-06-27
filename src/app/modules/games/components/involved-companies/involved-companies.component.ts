import { Component, Input, OnInit } from '@angular/core';
import { Company, InvolvedCompany } from '../../state/games.interface';

@Component({
  selector: 'app-involved-companies',
  templateUrl: './involved-companies.component.html',
  styleUrls: ['./involved-companies.component.scss'],
})
export class InvolvedCompaniesComponent implements OnInit {
  @Input() companies: InvolvedCompany[];

  developers: Partial<Company>[] = [];
  publishers: Partial<Company>[] = [];

  constructor() {}

  ngOnInit() {
    for (let company of this.companies) {
      if (company.developer) {
        this.developers.push(company.company);
      }

      if (company.publisher) {
        this.publishers.push(company.company);
      }
    }
  }
}
