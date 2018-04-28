using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using EmployeesExample.Models.Domain;
using Microsoft.Extensions.Logging;
using ServiceStack.Data;
using ServiceStack.OrmLite;

namespace EmployeesExample.Framework.Repositories
{
    /// <summary>
    /// Sköter all databashantering för anställda
    /// </summary>
    public class EmployeeRepository
    {
        public IDbConnectionFactory DbFactory { get; set; }

        public ILogger<EmployeeRepository> Logger { get; set; }

        /// <summary>
        /// Hämta alla anställda
        /// </summary>
        public List<Employee> GetEmployees()
        {
            using (IDbConnection db = DbFactory.OpenDbConnection())
            {
                return db.LoadSelect
                (
                    db.From<Employee>()
                      .OrderBy(x => x.LastName)
                );
            }
        }

        /// <summary>
        /// Hämta alla anställda som tillhör en avdelning
        /// </summary>
        public List<Employee> GetEmployees(int departmentId)
        {
            using (IDbConnection db = DbFactory.OpenDbConnection())
            {
                return db.LoadSelect
                (
                    db.From<Employee>()
                      .Where(x => x.DepartmentId == departmentId)
                      .OrderBy(x => x.LastName)
                );
            }
        }

        /// <summary>
        /// Hämta en specifik anställd
        /// </summary>
        public Employee GetEmployee(int employeeId)
        {
            using (IDbConnection db = DbFactory.OpenDbConnection())
            {
                return db.LoadSingleById<Employee>(employeeId);
            }
        }

        /// <summary>
        /// Skapa en anställd
        /// </summary>
        /// <returns>id på den skapade anställda</returns>
        public int CreateEmployee(string firstName, string lastName, string title, int departmentId)
        {
            using (IDbConnection db = DbFactory.OpenDbConnection())
            {
                var newEmployee = new Employee
                {
                    FirstName = firstName,
                    LastName = lastName,
                    Title = title,
                    DepartmentId = departmentId,
                    DateCreated = DateTime.Now
                };

                int createdEmployeeId = (int)db.Insert(newEmployee, true);

                Logger.LogInformation($"Created employee \"{firstName} {lastName}\" with id {createdEmployeeId}");

                return createdEmployeeId;
            }
        }

        /// <summary>
        /// Uppdatera en specifik anställd
        /// </summary>
        /// <param name="firstName">Det nya förnamnet på den anställda</param>
        /// <param name="lastName">Det nya efternamnet på den anställda</param>
        /// <param name="title">Den nya titeln på den anställda</param>
        /// <param name="departmentId">Den nya avdelningen på den anställda</param>
        public void UpdateEmployee(int employeeId, string firstName, string lastName, string title, int departmentId)
        {
            using (IDbConnection db = DbFactory.OpenDbConnection())
            {
                var storedEmployee = db.SingleById<Employee>(departmentId);

                storedEmployee.FirstName = firstName;
                storedEmployee.LastName = lastName;
                storedEmployee.Title = title;
                storedEmployee.DepartmentId = departmentId;
                storedEmployee.DateModified = DateTime.Now;

                db.Save(storedEmployee);

                Logger.LogInformation($"Updated employee with id {departmentId}");
            }
        }

        /// <summary>
        /// Ta bort en specifik anställd
        /// </summary>
        public void DeleteEmployee(int employeeId)
        {
            using (IDbConnection db = DbFactory.OpenDbConnection())
            {
                db.DeleteById<Employee>(employeeId);

                Logger.LogInformation($"Deleted employee with id {employeeId}");
            }
        }
    }
}
