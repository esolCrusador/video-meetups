using Microsoft.Extensions.DependencyInjection;

namespace VideoMeetups.Data.Bootstrap
{
    public static class DataBootstrap
    {
        public static void Bootstrap(IServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton<NameFormatter>();
            serviceCollection.AddScoped(svc => new ElasticProvider("VideoMeetups", svc.GetService<NameFormatter>()));
        }
    }
}
