import { Component } from '@angular/core';

import { Employee, EmployeesService } from './employees.service';
import { HttpResponseStatus } from '../../framework/backend.service';

@Component({
    selector: 'ee-employees',
    templateUrl: './employees.component.html'
})
export class EmployeesComponent
{
    employees: Employee[];

    constructor(private employeesService: EmployeesService) 
    {
    }

    ngOnInit()
    {
        this.employeesService.getEmployees()
            .subscribe(employees =>
            {
                this.employees = employees;
            },
            (error: HttpResponseStatus) =>
            {
                alert(error.message);
                this.employees = [];
            });
    }
}
