using Microsoft.Extensions.DependencyInjection;
using VideoMeetups.Data.Repositories;
using VideoMeetups.Logic.Repositories;

namespace VideoMeetups.Data.Bootstrap
{
    public static class DataBootstrap
    {
        public static void Bootstrap(IServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton<NameFormatter>();
            serviceCollection.AddScoped(svc => new ElasticProvider("VideoMeetups", svc.GetService<NameFormatter>()));
            serviceCollection.AddTransient<IUserRepository, UserRepository>();
            serviceCollection.AddTransient<IEventsRepository, EventsRepository>();
        }
    }
}
