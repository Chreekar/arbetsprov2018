import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { OnSaveArgs } from '../employee-editor/employee-editor.component';
import { Department, DepartmentsService } from '../departments/departments.service';
import { Employee, EmployeesService } from './employees.service';
import { HttpResponseStatus } from '../../framework/backend.service';

@Component({
    selector: 'ee-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit
{
    departments: Department;
    employees: Employee[];
    editingEmployee: Employee;
    filteredEmployees: Employee[];
    query: string;

    constructor(private departmentsService: DepartmentsService, private employeesService: EmployeesService) 
    {
    }

    ngOnInit()
    {
        Observable.forkJoin([
            this.departmentsService.getDepartments(),
            this.employeesService.getEmployees()
        ])
            .subscribe(results =>
            {
                this.departments = results[0];
                this.employees = results[1];
            },
                (error: HttpResponseStatus) =>
                {
                    alert(error.message);
                    this.employees = [];
                });
    }

    cancelEditingEmployee()
    {
        this.setEditingEmployee(null);
    }

    deleteEmployee(employee: Employee)
    {
        if (confirm('Confirm deletion'))
        {
            this.employeesService.deleteEmployee(employee.id)
                .subscribe(employee =>
                {
                    this.employees = this.employees.filter(x => x.id != employee.id);
                },
                    (error: HttpResponseStatus) =>
                    {
                        alert(error.message);
                    });
        }
    }

    employeeIsEditing(employee: Employee)
    {
        return this.editingEmployee && this.editingEmployee.id == employee.id;
    }

    getFilteredEmployees()
    {
        if (this.query && this.query.length > 0)
        {
            return this.employeesService.filterEmployees(this.employees, this.query);
        }
        else
        {
            return this.employees;
        }
    }

    saveEditingEmployee(args: OnSaveArgs)
    {
        if (args.id)
        {
            //Redigera existerande anställd
            this.employeesService.updateEmployee(args.id, args.firstName, args.lastName, args.title, args.departmentId)
                .flatMap(department => this.employeesService.getEmployees())
                .subscribe(employees =>
                {
                    this.employees = employees;
                    this.cancelEditingEmployee();
                },
                    (error: HttpResponseStatus) =>
                    {
                        alert(error.message);
                    });
        }
        else
        {
            //Skapa ny anställd
            this.employeesService.createEmployee(args.firstName, args.lastName, args.title, args.departmentId)
                .flatMap(employee => this.employeesService.getEmployees())
                .subscribe(employees =>
                {
                    this.employees = employees;
                    this.cancelEditingEmployee();
                },
                    (error: HttpResponseStatus) =>
                    {
                        alert(error.message);
                    });
        }
    }

    setEditingEmployee(employee: Employee)
    {
        this.editingEmployee = employee;
    }
}
