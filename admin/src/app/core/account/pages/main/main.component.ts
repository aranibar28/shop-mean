import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/core/sales/services/sale.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  public total_earnings = 0;
  public total_earnings_month = 0;
  public count_sales = 0;
  public total_earnings_before_month = 0;
  public count_sales_before_month = 0;

  constructor(private saleService: SaleService) {}

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.saleService.kpi_mounth_earnings().subscribe({
      next: (res) => {
        this.total_earnings = res.total_earnings;
        this.total_earnings_month = res.total_earnings_month;
        this.count_sales = res.count_sales;
        this.total_earnings_before_month = res.total_earnings_before_month;
        this.count_sales_before_month = res.count_sales_before_month;

        const ctx = <HTMLCanvasElement>document.getElementById('myChart');
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: [
              'Enero',
              'Febrero',
              'Marzo',
              'Abril',
              'Mayo',
              'Junio',
              'Julio',
              'Agosto',
              'Septiembre',
              'Octubre',
              'Noviembre',
              'Diciembre',
            ],
            datasets: [
              {
                label: 'meses',
                data: [
                  res.january,
                  res.february,
                  res.march,
                  res.april,
                  res.may,
                  res.june,
                  res.july,
                  res.august,
                  res.september,
                  res.october,
                  res.november,
                  res.december,
                ],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      },
    });
  }
}
