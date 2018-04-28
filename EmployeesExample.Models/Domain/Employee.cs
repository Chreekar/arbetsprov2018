using System;
using System.Collections.Generic;
using System.Text;
using ServiceStack.DataAnnotations;

namespace EmployeesExample.Models.Domain
{
    /// <summary>
    /// En anställd med personuppgifter
    /// </summary>
    public class Employee
    {
        [PrimaryKey]
        [AutoIncrement]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required]
        [StringLength(50)]
        public string Title { get; set; }

        [ForeignKey(typeof(Department))]
        public int DepartmentId { get; set; }

        [Reference]
        public Department Department { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime? DateModified { get; set; }
    }
}
