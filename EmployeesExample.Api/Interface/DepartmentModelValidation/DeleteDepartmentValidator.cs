using System;
using System.Collections.Generic;
using System.Text;
using EmployeesExample.Api.Interface.DepartmentModel;
using ServiceStack.FluentValidation;

namespace EmployeesExample.Api.Interface.DepartmentModelValidation
{
    public class DeleteDepartmentValidator : AbstractValidator<DeleteDepartment>
    {
        public DeleteDepartmentValidator()
        {
            RuleFor(r => r.Id)
                .GreaterThan(0);
        }
    }
}
