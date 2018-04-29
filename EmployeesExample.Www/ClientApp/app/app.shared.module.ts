import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './features/app/app.component';
import { BackendService } from './framework/backend.service';
import { DepartmentEditorComponent } from './features/department-editor/department-editor.component';
import { DepartmentsComponent } from './features/departments/departments.component';
import { DepartmentsService } from './features/departments/departments.service';
import { EmployeeEditorComponent } from './features/employee-editor/employee-editor.component';
import { EmployeesComponent } from './features/employees/employees.component';
import { EmployeesService } from './features/employees/employees.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'employees', pathMatch: 'full' },
            { path: 'departments', component: DepartmentsComponent },
            { path: 'employees', component: EmployeesComponent },
            { path: '**', redirectTo: 'employees' }
        ])
    ],
    declarations: [
        AppComponent,
        DepartmentEditorComponent,
        DepartmentsComponent,
        EmployeeEditorComponent,
        EmployeesComponent
    ],
    providers: [
        BackendService,
        DepartmentsService,
        EmployeesService
    ]
})
export class AppModuleShared {
}
