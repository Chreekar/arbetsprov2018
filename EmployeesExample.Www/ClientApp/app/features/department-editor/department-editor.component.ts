import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

import { Department } from '../departments/departments.service';
import { SaveStatus } from '../../framework/enums';

@Component({
    selector: 'ee-department-editor',
    templateUrl: './department-editor.component.html'
})
export class DepartmentEditorComponent implements OnChanges, OnInit
{
    @Input() department: Department;
    @Input() saveStatus: SaveStatus;
    
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
        if (this.saveStatus == 'Idle')
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
    name: string;
}
