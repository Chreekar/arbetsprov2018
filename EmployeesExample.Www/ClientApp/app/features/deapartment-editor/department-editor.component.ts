import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

import { Department } from '../departments/departments.service';

@Component({
    selector: 'ee-department-editor',
    templateUrl: './department-editor.component.html'
})
export class DepartmentEditorComponent implements OnChanges, OnInit
{
    @Input() department: Department;
    @Output() onCancel = new EventEmitter();
    @Output() onSave = new EventEmitter<OnSaveArgs>();

    name: string;

    ngOnInit()
    {
        this.reset();
    }

    ngOnChanges()
    {
        if (this.department)
        {
            this.name = this.department.name;
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
            id: this.department ? this.department.id : null,
            name: this.name
        };

        this.onSave.emit(args);
        this.reset();
    }

    //Helpers

    reset()
    {
        this.name = null;
    }
}

export interface OnSaveArgs
{
    id?: number;
    name: string;
}
