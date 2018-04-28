using System;
using System.Collections.Generic;
using System.Text;

namespace EmployeesExample.Models.Business
{
    /// <summary>
    /// En avdelning som en anställd tillhör, med bara de egenskaper som är intressanta för frontend
    /// </summary>
    public class DepartmentDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }
    }
}
