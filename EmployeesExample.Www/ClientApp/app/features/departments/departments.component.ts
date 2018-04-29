import { Component, OnInit } from '@angular/core';

import { OnSaveArgs } from '../department-editor/department-editor.component';
import { Department, DepartmentsService } from './departments.service';
import { HttpResponseStatus } from '../../framework/backend.service';
import { SaveStatus } from '../../framework/enums';

@Component({
    selector: 'ee-departments',
    templateUrl: './departments.component.html',
    styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit
{
    departments: Department[];
    departmentSaveStatus: SaveStatus;
    editingDepartment: Department;

    constructor(private departmentsService: DepartmentsService) 
    {
        this.departmentSaveStatus = 'Idle';
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
                    
                    if (this.editingDepartment && department.id == this.editingDepartment.id)
                    {
                        this.cancelEditingDepartment();
                    }
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
        this.departmentSaveStatus = 'Saving';

        if (this.editingDepartment)
        {
            //Redigera existerande avdelning
            this.departmentsService.updateDepartment(this.editingDepartment.id, args.name)
                .flatMap(department => this.departmentsService.getDepartments())
                .subscribe(departments =>
                {
                    this.departmentSaveStatus = 'Idle';
                    this.departments = departments;
                    this.cancelEditingDepartment();
                },
                (error: HttpResponseStatus) =>
                {
                    this.departmentSaveStatus = 'Error';
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
                    this.departmentSaveStatus = 'Idle';
                    this.departments = departments;
                    this.cancelEditingDepartment();
                },
                (error: HttpResponseStatus) =>
                {
                    this.departmentSaveStatus = 'Error';
                    alert(error.message);
                });
        }
    }

    setEditingDepartment(department: Department)
    {
        this.departmentSaveStatus = 'Idle';
        this.editingDepartment = department;
    }
}
