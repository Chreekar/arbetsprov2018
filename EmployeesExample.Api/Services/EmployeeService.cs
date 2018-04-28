using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using EmployeesExample.Api.Interface.EmployeeModel;
using EmployeesExample.Framework.Repositories;
using EmployeesExample.Models.Business;
using EmployeesExample.Models.Domain;
using EmployeesExample.Models.Mappers;
using ServiceStack;

namespace EmployeesExample.Api.Services
{
    /// <summary>
    /// Sköter all hantering av anställda
    /// </summary>
    public class EmployeeService : Service
    {
        public EmployeeRepository EmployeeRepository { get; set; }

        public DepartmentRepository DepartmentRepository { get; set; }

        /// <summary>
        /// Sök efter anställda
        /// </summary>
        public EmployeesResponse Post(FindEmployees request)
        {
            List<Employee> employees;

            if (request.DepartmentId.HasValue)
            {
                employees = EmployeeRepository.GetEmployees(request.DepartmentId.Value);
            }
            else
            {
                employees = EmployeeRepository.GetEmployees();
            }

            return new EmployeesResponse
            {
                Employees = employees.Map(x => x.ToDto())
            };
        }

        /// <summary>
        /// Hämta en specifik anställd
        /// </summary>
        public EmployeeResponse Get(GetEmployee request)
        {
            var employee = EmployeeRepository.GetEmployee(request.Id);

            if (employee == null)
            {
                Response.StatusCode = (int)HttpStatusCode.NotFound;
                return null;
            }

            return new EmployeeResponse
            {
                Employee = employee.ToDto()
            };
        }

        /// <summary>
        /// Skapa en anställd
        /// </summary>
        /// <returns>Den skapade anställda</returns>
        public EmployeeResponse Post(CreateEmployee request)
        {
            if (!DepartmentRepository.GetDepartments().Any(x => x.Id == request.DepartmentId))
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return null;
            }

            int createdEmployeeId = EmployeeRepository.CreateEmployee(request.FirstName, request.LastName, request.Title, request.DepartmentId);

            return new EmployeeResponse
            {
                Employee = EmployeeRepository.GetEmployee(createdEmployeeId).ToDto()
            };
        }

        /// <summary>
        /// Uppdatera en specifik anställd
        /// </summary>
        /// <returns>Den uppdaterade anställda</returns>
        public EmployeeResponse Put(UpdateEmployee request)
        {
            var employee = EmployeeRepository.GetEmployee(request.Id);

            if (employee == null)
            {
                Response.StatusCode = (int)HttpStatusCode.NotFound;
                return null;
            }

            if (!DepartmentRepository.GetDepartments().Any(x => x.Id == request.DepartmentId))
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return null;
            }

            EmployeeRepository.UpdateEmployee(employee.Id, request.FirstName, request.LastName, request.Title, request.DepartmentId);

            return new EmployeeResponse
            {
                Employee = EmployeeRepository.GetEmployee(employee.Id).ToDto()
            };
        }

        /// <summary>
        /// Ta bort en specifik anställd
        /// </summary>
        /// <returns>Den borttagna anställda</returns>
        public EmployeeResponse Delete(DeleteEmployee request)
        {
            var employee = EmployeeRepository.GetEmployee(request.Id);

            if (employee == null)
            {
                Response.StatusCode = (int)HttpStatusCode.NotFound;
                return null;
            }

            EmployeeRepository.DeleteEmployee(employee.Id);

            return new EmployeeResponse
            {
                Employee = employee.ToDto()
            };
        }
    }
}
