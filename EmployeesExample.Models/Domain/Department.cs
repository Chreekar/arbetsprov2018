using System;
using System.Collections.Generic;
using System.Text;
using ServiceStack.DataAnnotations;

namespace EmployeesExample.Models.Domain
{
    /// <summary>
    /// En avdelning som en anställd tillhör
    /// </summary>
    public class Department
    {
        [PrimaryKey]
        [AutoIncrement]
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        [Index(Unique = true)]
        public string Name { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime? DateModified { get; set; }
    }
}
