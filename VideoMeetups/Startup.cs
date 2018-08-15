using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using VideoMeetups.Data.Bootstrap;
using VideoMeetups.Logic.Bootstrap;
using VideoMeetups.Models.Account;

namespace VideoMeetups
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            LogicBootstrap.Bootstrap(services);
            DataBootstrap.Bootstrap(services);

            services.AddLogging(loggingBuilder => loggingBuilder.AddConsole());

            services.AddAuthentication()
                .AddFacebook(opts =>
                {
                    opts.AppId = "564864066973412";
                    opts.AppSecret = "770e2c75bf5434570f67a862bcc99ad1";
                })
                .AddCookie(opts =>
                {
                    opts.Cookie.Name = "VMAuth";
                });
            services.AddIdentity<ApplicationUserModel, IdentityRole>()
                .AddUserManager<CustomUserManager>()
                .AddUserStore<CustomUserStore>()
                .AddRoleStore<CustomRoleStore>()
                .AddDefaultTokenProviders();

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
