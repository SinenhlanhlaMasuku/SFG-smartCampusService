import { Component, OnInit } from '@angular/core';
import { LabUsageData, BookingTrendData } from '../../models/analytics.model';
import { AnalyticsService } from '../../Services/analytics.service';
import { Chart, ChartOptions, ChartType, ChartData } from 'chart.js'; // Import Chart.js

@Component({
  selector: 'app-analyze-data',
  templateUrl: './analyze-data.component.html',
  styleUrls: ['./analyze-data.component.css'],
})
export class AnalyzeDataComponent implements OnInit {
  labUsageData: LabUsageData[] = [];
  bookingTrendData: BookingTrendData[] = [];

  // Chart configurations
  public labUsageChart: Chart | undefined;
  public bookingTrendChart: Chart | undefined;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadLabUsageData();
    this.loadBookingTrendData();
  }

  loadLabUsageData(): void {
    this.analyticsService.getLabUsage().subscribe((data) => {
      this.labUsageData = data;
      this.renderLabUsageChart();
    });
  }

  loadBookingTrendData(): void {
    this.analyticsService.getBookingTrends().subscribe((data) => {
      this.bookingTrendData = data;
      this.renderBookingTrendChart();
    });
  }

  renderLabUsageChart(): void {
    const labNames = this.labUsageData.map((data) => data.labName);
    const usagePercentages = this.labUsageData.map((data) => data.usagePercentage);

    this.labUsageChart = new Chart('labUsageCanvas', {
      type: 'bar' as ChartType,
      data: {
        labels: labNames,
        datasets: [
          {
            label: 'Lab Usage (%)',
            data: usagePercentages,
            backgroundColor: 'rgba(54, 162, 235, 0.8)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    });
  }

  renderBookingTrendChart(): void {
    const months = this.bookingTrendData.map((data) => data.month);
    const bookingCounts = this.bookingTrendData.map((data) => data.bookingCount);

    this.bookingTrendChart = new Chart('bookingTrendCanvas', {
      type: 'line' as ChartType,
      data: {
        labels: months,
        datasets: [
          {
            label: 'Booking Count',
            data: bookingCounts,
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false,
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
  }
}