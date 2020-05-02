import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [],
  imports: [
    LayoutModule,
    CommonModule,
    MatCardModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatGridListModule,
    MatPaginatorModule
  ],
  exports: [
    LayoutModule,
    CommonModule,
    MatCardModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatGridListModule,
    MatPaginatorModule
  ]
})
export class MaterialModule {}
