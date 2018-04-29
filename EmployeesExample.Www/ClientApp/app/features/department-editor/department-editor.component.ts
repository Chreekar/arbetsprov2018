import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

import { Department } from '../departments/departments.service';

@Component({
    selector: 'ee-department-editor',
    templateUrl: './department-editor.component.html'
})
export class DepartmentEditorComponent implements OnChanges, OnInit
{
    @Input() department: Department;
    @Input() isSaving: boolean;
    
    @Output() onCancel = new EventEmitter();
    @Output() onSave = new EventEmitter<OnSaveArgs>();

    isDirty: boolean;

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

    markAsDirty()
    {
        this.isDirty = true;
    }

    save()
    {
        let args = {
            id: this.department ? this.department.id : null,
            name: this.name
        };

        this.onSave.emit(args);
    }

    //Helpers

    private reset()
    {
        this.isDirty = false;

        this.name = null;
    }
}

export interface OnSaveArgs
{
    id?: number;
    name: string;
}
