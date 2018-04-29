using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using EmployeesExample.Api.Interface.DepartmentModel;
using EmployeesExample.Framework.Repositories;
using EmployeesExample.Models.Business;
using ServiceStack;

namespace EmployeesExample.Api.Services
{
    /// <summary>
    /// Sköter all hantering av avdelningar
    /// </summary>
    public class DepartmentService : Service
    {
        public EmployeeRepository EmployeeRepository { get; set; }

        public DepartmentRepository DepartmentRepository { get; set; }

        /// <summary>
        /// Hämta alla avdelningar
        /// </summary>
        public DepartmentsResponse Get(GetDepartments request)
        {
            return new DepartmentsResponse
            {
                Departments = DepartmentRepository.GetDepartments().Map(x => x.ConvertTo<DepartmentDTO>())
            };
        }

        /// <summary>
        /// Hämta en specifik avdelning
        /// </summary>
        public DepartmentResponse Get(GetDepartment request)
        {
            var department = DepartmentRepository.GetDepartment(request.Id);

            if (department == null)
            {
                Response.StatusCode = (int)HttpStatusCode.NotFound;
                return null;
            }

            return new DepartmentResponse
            {
                Department = department.ConvertTo<DepartmentDTO>()
            };
        }

        /// <summary>
        /// Skapa en avdelning
        /// </summary>
        /// <returns>Den skapade avdelningen</returns>
        public DepartmentResponse Post(CreateDepartment request)
        {
            if (DepartmentRepository.GetDepartments().Any(x => x.Name == request.Name))
            {
                Response.StatusCode = (int)HttpStatusCode.Conflict;
                return null;
            }

            int createdDepartmentId = DepartmentRepository.CreateDepartment(request.Name);

            return new DepartmentResponse
            {
                Department = DepartmentRepository.GetDepartment(createdDepartmentId).ConvertTo<DepartmentDTO>()
            };
        }

        /// <summary>
        /// Uppdatera en specifik avdelning
        /// </summary>
        /// <returns>Den uppdaterade avdelningen</returns>
        public DepartmentResponse Put(UpdateDepartment request)
        {
            var department = DepartmentRepository.GetDepartment(request.Id);

            if (department == null)
            {
                Response.StatusCode = (int)HttpStatusCode.NotFound;
                return null;
            }

            if (DepartmentRepository.GetDepartments().Any(x => x.Name == request.Name))
            {
                Response.StatusCode = (int)HttpStatusCode.Conflict;
                return null;
            }

            DepartmentRepository.UpdateDepartment(department.Id, request.Name);

            return new DepartmentResponse
            {
                Department = DepartmentRepository.GetDepartment(department.Id).ConvertTo<DepartmentDTO>()
            };
        }

        /// <summary>
        /// Ta bort en specifik avdelning
        /// </summary>
        /// <returns>Den borttagna avdelningen</returns>
        public DepartmentResponse Delete(DeleteDepartment request)
        {
            var department = DepartmentRepository.GetDepartment(request.Id);

            if (department == null)
            {
                Response.StatusCode = (int)HttpStatusCode.NotFound;
                return null;
            }

            if (EmployeeRepository.GetEmployees().Any(x => x.DepartmentId == department.Id))
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                Response.StatusDescription = "Department is not empty";
                return null;
            }

            DepartmentRepository.DeleteDepartment(department.Id);

            return new DepartmentResponse
            {
                Department = department.ConvertTo<DepartmentDTO>()
            };
        }
    }
}
