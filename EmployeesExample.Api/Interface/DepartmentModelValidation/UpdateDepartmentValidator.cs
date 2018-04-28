using System;
using System.Collections.Generic;
using System.Text;
using EmployeesExample.Api.Interface.DepartmentModel;
using ServiceStack.FluentValidation;

namespace EmployeesExample.Api.Interface.DepartmentModelValidation
{
    public class UpdateDepartmentValidator : AbstractValidator<UpdateDepartment>
    {
        public UpdateDepartmentValidator()
        {
            RuleFor(r => r.Id)
                .GreaterThan(0);

            RuleFor(r => r.Name)
                .NotEmpty();
        }
    }
}
