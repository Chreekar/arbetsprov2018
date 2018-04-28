using System;
using System.Collections.Generic;
using System.Text;
using EmployeesExample.Api.Interface.EmployeeModel;
using ServiceStack.FluentValidation;

namespace EmployeesExample.Api.Interface.EmployeeModelValidation
{
    public class DeleteEmployeeValidator : AbstractValidator<DeleteEmployee>
    {
        public DeleteEmployeeValidator()
        {
            RuleFor(r => r.Id)
                .GreaterThan(0);
        }
    }
}
