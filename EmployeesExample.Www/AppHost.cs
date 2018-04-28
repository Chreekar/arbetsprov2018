using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeesExample.Api.Interface.DepartmentModel;
using EmployeesExample.Api.Interface.EmployeeModel;
using EmployeesExample.Api.Services;
using EmployeesExample.Framework.Repositories;
using EmployeesExample.Models.Domain;
using Funq;
using Microsoft.AspNetCore.Hosting;
using ServiceStack;
using ServiceStack.Api.Swagger;
using ServiceStack.Data;
using ServiceStack.OrmLite;
using ServiceStack.Validation;

namespace EmployeesExample.Www
{
    public class AppHost : AppHostBase
    {
        private IHostingEnvironment _environment;

        public AppHost(IHostingEnvironment environment) : base("EmployeesExample.Www", typeof(EmployeeService).Assembly)
        {
            _environment = environment;

            //DepartmentService
            Routes
                .Add<GetDepartments>("/departments", "GET")
                .Add<GetDepartment>("/departments/{Id}", "GET")
                .Add<CreateDepartment>("/departments", "POST")
                .Add<UpdateDepartment>("/departments/{Id}", "PUT")
                .Add<DeleteDepartment>("/departments/{Id}", "DELETE");

            //EmployeeService
            Routes
                .Add<FindEmployees>("/employees/search", "POST")
                .Add<GetEmployee>("/employees/{Id}", "GET")
                .Add<CreateEmployee>("/employees", "POST")
                .Add<UpdateEmployee>("/employees/{Id}", "PUT")
                .Add<DeleteEmployee>("/employees/{Id}", "DELETE");
        }

        public override void Configure(Container container)
        {
            bool isDevelopment = _environment.IsDevelopment();

            /* Generella inställningar */

            SetConfig(new HostConfig
            {
                DebugMode = isDevelopment,
                DefaultContentType = MimeTypes.Json,
                EnableFeatures = isDevelopment ? Feature.All : Feature.All.Remove(Feature.Metadata),
                HandlerFactoryPath = "api"
            });

            if (isDevelopment)
            {
                Plugins.Add(new SwaggerFeature());
            }

            /* Databas */

            var connectionFactory = new OrmLiteConnectionFactory(":memory:", SqliteDialect.Provider);

            using (var db = connectionFactory.Open())
            {
                db.CreateTable<Department>();
                db.CreateTable<Employee>();
            }

            container.Register<IDbConnectionFactory>(connectionFactory);

            /* Providers */

            foreach (var repositoryType in typeof(EmployeeRepository).Assembly.GetTypes().Where(t => t.IsClass && !t.IsNested && t.Namespace == "EmployeesExample.Framework.Repositories"))
            {
                //Registrera automatiskt alla klasser i Framework.Repositories
                container.RegisterAutoWiredType(repositoryType);
            }

            /* Validering */

            Plugins.Add(new ValidationFeature());
        }
    }
}
