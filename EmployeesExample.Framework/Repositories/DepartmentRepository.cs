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
    /// Sköter all databashantering för avdelningar
    /// </summary>
    public class DepartmentRepository
    {
        public IDbConnectionFactory DbFactory { get; set; }

        public ILogger<DepartmentRepository> Logger { get; set; }

        /// <summary>
        /// Hämta alla avdelningar
        /// </summary>
        public List<Department> GetDepartments()
        {
            using (IDbConnection db = DbFactory.OpenDbConnection())
            {
                return db.Select
                (
                    db.From<Department>()
                      .OrderBy(x => x.Name)
                );
            }
        }

        /// <summary>
        /// Hämta en specifik avdelning
        /// </summary>
        public Department GetDepartment(int departmentId)
        {
            using (IDbConnection db = DbFactory.OpenDbConnection())
            {
                return db.SingleById<Department>(departmentId);
            }
        }

        /// <summary>
        /// Skapa en avdelning
        /// </summary>
        /// <returns>id på den skapade avdelningen</returns>
        public int CreateDepartment(string name)
        {
            using (IDbConnection db = DbFactory.OpenDbConnection())
            {
                var newDepartment = new Department
                {
                    Name = name,
                    DateCreated = DateTime.Now
                };

                int createdDepartmentId = (int)db.Insert(newDepartment, true);

                Logger.LogInformation($"Created department \"{name}\" with id {createdDepartmentId}");

                return createdDepartmentId;
            }
        }

        /// <summary>
        /// Uppdatera en specifik avdelning
        /// </summary>
        /// <param name="name">Det nya namnet på avdelningen</param>
        public void UpdateDepartment(int departmentId, string name)
        {
            using (IDbConnection db = DbFactory.OpenDbConnection())
            {
                var storedDepartment = db.SingleById<Department>(departmentId);

                storedDepartment.Name = name;
                storedDepartment.DateModified = DateTime.Now;

                db.Save(storedDepartment);

                Logger.LogInformation($"Updated department with id {departmentId}");
            }
        }

        /// <summary>
        /// Ta bort en specifik avdelning
        /// </summary>
        public void DeleteDepartment(int departmentId)
        {
            using (IDbConnection db = DbFactory.OpenDbConnection())
            {
                db.DeleteById<Department>(departmentId);

                Logger.LogInformation($"Deleted department with id {departmentId}");
            }
        }
    }
}
