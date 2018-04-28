﻿using System;
using System.Collections.Generic;
using System.Text;

namespace EmployeesExample.Api.Interface.EmployeeModel
{
    public class CreateEmployee
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Title { get; set; }

        public int DepartmentId { get; set; }
    }
}
