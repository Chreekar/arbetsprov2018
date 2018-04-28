using System;
using System.Collections.Generic;
using System.Text;
using EmployeesExample.Models.Business;

namespace EmployeesExample.Api.Interface.EmployeeModel
{
    public class EmployeesResponse
    {
        public List<EmployeeDTO> Employees { get; set; }
    }
}
