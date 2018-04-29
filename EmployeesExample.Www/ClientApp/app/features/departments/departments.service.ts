import { Injectable } from '@angular/core';

import { BackendService } from '../../framework/backend.service';

/**
 * Hanterar all logik kring avdelningar
 */
@Injectable()
export class DepartmentsService
{
    constructor(private backend: BackendService) 
    {
    }

    /**
     * Hämta alla avdelningar
     */
    getDepartments()
    {
        return this.backend.get<Department[]>('/departments', (data: DepartmentsResponse) => data.departments);
    }

    /**
     * Hämta en specifik avdelning
     */
    getDepartment(departmentId: number)
    {
        return this.backend.get<Department>('/departments/' + departmentId, (data: DepartmentResponse) => data.department);
    }

    /**
     * Skapa en avdelning
     * @returns Den skapade avdelningen
     */
    createDepartment(name: string)
    {
        return this.backend.post<Department>('/departments', { name }, (data: DepartmentResponse) => data.department);
    }

    /**
     * Uppdatera en specifik avdelning
     * @returns Den uppdaterade avdelningen
     */
    updateDepartment(departmentId: number, name: string)
    {
        return this.backend.put<Department>('/departments/' + departmentId, { name }, (data: DepartmentResponse) => data.department);
    }

    /**
     * Ta bort en specifik avdelning
     * @returns Den borttagna avdelningen
     */
    deleteDepartment(departmentId: number)
    {
        return this.backend.delete<Department>('/departments/' + departmentId, (data: DepartmentResponse) => data.department);
    }
}

interface DepartmentResponse
{
    department: Department;
}

interface DepartmentsResponse
{
    departments: Department[];
}

export interface Department
{
    id: number;
    name: string;
}