using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
using System;
using System.Diagnostics;
using System.Security.Claims;
using System.Text;
using VideoMeetups.Data.Bootstrap;
using VideoMeetups.Logic.Bootstrap;
using VideoMeetups.Logic.Contracts;
using VideoMeetups.Logic.DomainModels.Account;
using VideoMeetups.Models;

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
            services.Configure<BarrierOptions>(options =>
            {
                options.SecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("51BDEAFE-C65E-4D72-86D9-35E46D19A5FF"));
                options.SecurityAlgorithm = SecurityAlgorithms.HmacSha256;
                options.Issuer = "Local";
            });
            services.AddAuthentication()
                .AddFacebook("Facebook", opts =>
                {
                    opts.AppId = "564864066973412";
                    opts.AppSecret = "770e2c75bf5434570f67a862bcc99ad1";
                })
                .AddJwtBearer("Bearer", options =>
                {
                    options.SaveToken = true;
                    options.ClaimsIssuer = "Local";
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidIssuer = "Local",
                        ValidateIssuerSigningKey = true,
                        ValidateAudience = false,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("51BDEAFE-C65E-4D72-86D9-35E46D19A5FF")),
                    };
                });

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddUserManager<CustomUserManager>()
                .AddUserStore<CustomUserStore>()
                .AddRoleStore<CustomRoleStore>()
                .AddDefaultTokenProviders();
            services.AddTransient<IUserContextContainer, UserContextContainer>();

            services.AddMvc().AddJsonOptions(opts=>
            {
                opts.SerializerSettings.DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Utc;
                opts.SerializerSettings.ContractResolver = new DefaultContractResolver();
            });
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
            app.Use(async (context, next) =>
            {
                if (!context.User.Identity.IsAuthenticated)
                {
                    var jwtAuthResult = await context.AuthenticateAsync(JwtBearerDefaults.AuthenticationScheme);
                    if (jwtAuthResult.Succeeded)
                        context.User = jwtAuthResult.Principal;
                }

                await next();
            });

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
