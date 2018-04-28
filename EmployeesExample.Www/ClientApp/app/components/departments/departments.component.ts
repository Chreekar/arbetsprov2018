import { Component, OnInit } from '@angular/core';

import { Department, DepartmentsService } from './departments.service';
import { HttpResponseStatus } from '../../framework/backend.service';

@Component({
    selector: 'departments',
    templateUrl: './departments.component.html'
})
export class DepartmentsComponent implements OnInit
{
    departments: Department[];

    constructor(private departmentsService: DepartmentsService) 
    {
    }

    ngOnInit()
    {
        this.departmentsService.getDepartments()
            .subscribe(departments =>
            {
                this.departments = departments;
            },
            (error: HttpResponseStatus) =>
            {
                alert(error.message);
                this.departments = [];
            });
    }
}
