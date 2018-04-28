using System;
using System.Collections.Generic;
using System.Text;
using EmployeesExample.Api.Interface.EmployeeModel;
using ServiceStack.FluentValidation;

namespace EmployeesExample.Api.Interface.EmployeeModelValidation
{
    public class CreateEmployeeValidator : AbstractValidator<CreateEmployee>
    {
        public CreateEmployeeValidator()
        {
            RuleFor(r => r.FirstName)
                .NotEmpty()
                .MaximumLength(50);

            RuleFor(r => r.LastName)
                .NotEmpty()
                .MaximumLength(50);

            RuleFor(r => r.Title)
                .NotEmpty()
                .MaximumLength(50);

            RuleFor(r => r.DepartmentId)
                .GreaterThan(0);
        }
    }
}
