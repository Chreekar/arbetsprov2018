import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

import { Department } from '../departments/departments.service';
import { Employee } from '../employees/employees.service';

@Component({
    selector: 'ee-employee-editor',
    templateUrl: './employee-editor.component.html'
})
export class EmployeeEditorComponent implements OnChanges, OnInit
{
    @Input() employee: Employee;
    @Input() departments: Department[];
    @Output() onCancel = new EventEmitter();
    @Output() onSave = new EventEmitter<OnSaveArgs>();

    firstName: string;
    lastName: string;
    title: string;
    departmentId: number;

    ngOnInit()
    {
        this.reset();
    }

    ngOnChanges()
    {
        if (this.employee)
        {
            this.firstName = this.employee.firstName;
            this.lastName = this.employee.lastName;
            this.title = this.employee.title;
            this.departmentId = this.employee.department.id;
        }
        else
        {
            this.reset();
        }
    }

    cancel()
    {
        this.onCancel.emit(null);
        this.reset();
    }

    save()
    {
        let args = {
            id: this.employee ? this.employee.id : null,
            firstName: this.firstName,
            lastName: this.lastName,
            title: this.title,
            departmentId: this.departmentId
        };

        this.onSave.emit(args);
    }

    //Helpers

    reset()
    {
        this.firstName = null;
        this.lastName = null;
        this.title = null;
        this.departmentId = null;
    }
}

export interface OnSaveArgs
{
    id?: number;
    firstName: string;
    lastName: string;
    title: string;
    departmentId: number;
}
