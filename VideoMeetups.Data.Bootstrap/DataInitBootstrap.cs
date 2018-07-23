using Microsoft.Extensions.DependencyInjection;
using VideoMeetups.Data.Init;

namespace VideoMeetups.Data.Bootstrap
{
    public static class DataInitBootstrap
    {
        public static void Bootstrap(IServiceCollection serviceCollection)
        {
            DataBootstrap.Bootstrap(serviceCollection);

            serviceCollection.AddTransient<IDataInitializer, InitializeUsers>();
            serviceCollection.AddTransient<PropertyMetadataResolver>();
        }
    }
}
