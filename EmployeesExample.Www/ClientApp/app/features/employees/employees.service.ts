import { Injectable } from '@angular/core';

import { BackendService } from '../../framework/backend.service';
import { Department } from '../departments/departments.service';

/**
 * Hanterar all logik kring anställda
 */
@Injectable()
export class EmployeesService
{
    constructor(private backend: BackendService) 
    {
    }

    /**
     * Filtrera listan enligt en sökfras
     * @param employees Listan som ska filtreras
     * @param query Sökfrasen som ska matcha en del av förnamn eller efternamn
     */
    filterEmployees(employees: Employee[], query: string)
    {
        let q = query.toLowerCase();

        return employees.filter(x => x.firstName.toLowerCase().indexOf(q) >= 0 || x.lastName.toLowerCase().indexOf(q) >= 0);
    }

    /**
     * Sök efter anställda
     * @param departmentId Alla hämtas om denna inte anges
     */
    getEmployees(departmentId?: number)
    {
        return this.backend.post<Employee[]>('/employees/search', { departmentId }, (data: EmployeesResponse) => data.employees);
    }

    /**
     * Hämta en specifik anställd
     */
    getEmployee(employeeId: number)
    {
        return this.backend.get<Employee>('/employees/' + employeeId, (data: EmployeeResponse) => data.employee);
    }

    /**
     * Skapa en anställd
     * @returns Den skapade anställda
     */
    createEmployee(firstName: string, lastName: string, title: string, departmentId: number)
    {
        return this.backend.post<Employee>('/employees', { firstName, lastName, title, departmentId }, (data: EmployeeResponse) => data.employee);
    }

    /**
     * Uppdatera en specifik anställd
     * @returns Den uppdaterade anställda
     */
    updateEmployee(employeeId: number, firstName: string, lastName: string, title: string, departmentId: number)
    {
        return this.backend.put<Employee>('/employees/' + employeeId, { firstName, lastName, title, departmentId }, (data: EmployeeResponse) => data.employee);
    }

    /**
     * Ta bort en specifik anställd
     * @returns Den borttagna anställda
     */
    deleteEmployee(employeeId: number)
    {
        return this.backend.delete<Employee>('/employees/' + employeeId, (data: EmployeeResponse) => data.employee);
    }
}

interface EmployeeResponse
{
    employee: Employee;
}

interface EmployeesResponse
{
    employees: Employee[];
}

export interface Employee
{
    id: number;
    firstName: string;
    lastName: string;
    title: string;
    department: Department;
}