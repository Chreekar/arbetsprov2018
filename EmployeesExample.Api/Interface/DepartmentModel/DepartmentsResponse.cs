using System;
using System.Collections.Generic;
using System.Text;
using EmployeesExample.Models.Business;

namespace EmployeesExample.Api.Interface.DepartmentModel
{
    public class DepartmentsResponse
    {
        public List<DepartmentDTO> Departments { get; set; }
    }
}
