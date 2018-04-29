import { Component, OnInit } from '@angular/core';

import { OnSaveArgs } from '../department-editor/department-editor.component';
import { Department, DepartmentsService } from './departments.service';
import { HttpResponseStatus } from '../../framework/backend.service';

@Component({
    selector: 'ee-departments',
    templateUrl: './departments.component.html',
    styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit
{
    departments: Department[];
    editingDepartment: Department;

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

    cancelEditingDepartment()
    {
        this.setEditingDepartment(null);
    }

    deleteDepartment(department: Department)
    {
        if (confirm('Confirm deletion'))
        {
            this.departmentsService.deleteDepartment(department.id)
                .subscribe(department =>
                {
                    this.departments = this.departments.filter(x => x.id != department.id);
                },
                    (error: HttpResponseStatus) =>
                    {
                        alert(error.message);
                    });
        }
    }

    departmentIsEditing(department: Department)
    {
        return this.editingDepartment && this.editingDepartment.id == department.id;
    }

    saveEditingDepartment(args: OnSaveArgs)
    {
        if (args.id)
        {
            //Redigera existerande avdelning
            this.departmentsService.updateDepartment(args.id, args.name)
                .flatMap(department => this.departmentsService.getDepartments())
                .subscribe(departments =>
                {
                    this.departments = departments;
                    this.cancelEditingDepartment();
                },
                    (error: HttpResponseStatus) =>
                    {
                        alert(error.message);
                    });
        }
        else
        {
            //Skapa ny avdelning
            this.departmentsService.createDepartment(args.name)
                .flatMap(department => this.departmentsService.getDepartments())
                .subscribe(departments =>
                {
                    this.departments = departments;
                    this.cancelEditingDepartment();
                },
                    (error: HttpResponseStatus) =>
                    {
                        alert(error.message);
                    });
        }
    }

    setEditingDepartment(department: Department)
    {
        this.editingDepartment = department;
    }
}
