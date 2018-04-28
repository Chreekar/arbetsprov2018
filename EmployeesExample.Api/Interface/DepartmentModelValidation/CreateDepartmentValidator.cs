using System;
using System.Collections.Generic;
using System.Text;
using EmployeesExample.Api.Interface.DepartmentModel;
using ServiceStack.FluentValidation;

namespace EmployeesExample.Api.Interface.DepartmentModelValidation
{
    public class CreateDepartmentValidator : AbstractValidator<CreateDepartment>
    {
        public CreateDepartmentValidator()
        {
            RuleFor(r => r.Name)
                .NotEmpty();
        }
    }
}
