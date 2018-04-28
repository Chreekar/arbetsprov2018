using System;
using System.Collections.Generic;
using System.Text;

namespace EmployeesExample.Models.Business
{
    /// <summary>
    /// En anställd med personuppgifter, med bara de egenskaper som är intressanta för frontend
    /// </summary>
    public class EmployeeDTO
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Title { get; set; }

        public DepartmentDTO Department { get; set; }
    }
}
