using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using VideoMeetups.Logic.Contracts;
using VideoMeetups.Logic.Services;

namespace VideoMeetups.Logic.Bootstrap
{
    public static class LogicBootstrap
    {
        public static void Bootstrap(IServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton<PasswordManager>();
            serviceCollection.AddTransient<IUserService, UserService>();
        }
    }
}
