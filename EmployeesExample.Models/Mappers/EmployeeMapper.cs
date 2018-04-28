using System;
using System.Collections.Generic;
using System.Text;
using EmployeesExample.Models.Business;
using EmployeesExample.Models.Domain;
using ServiceStack;

namespace EmployeesExample.Models.Mappers
{
    public static class EmployeeMapper
    {
        public static EmployeeDTO ToDto(this Employee from)
        {
            var to = from.ConvertTo<EmployeeDTO>();

            to.Department = from.Department?.ConvertTo<DepartmentDTO>();

            return to;
        }
    }
}
