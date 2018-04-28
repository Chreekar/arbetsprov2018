import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { EmployeesComponent } from './components/employees/employees.component';

@NgModule({
    declarations: [
        AppComponent,
        DepartmentsComponent,
        EmployeesComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'employees', pathMatch: 'full' },
            { path: 'departments', component: DepartmentsComponent },
            { path: 'employees', component: EmployeesComponent },
            { path: '**', redirectTo: 'employees' }
        ])
    ]
})
export class AppModuleShared {
}
