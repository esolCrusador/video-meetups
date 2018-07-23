using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using VideoMeetups.Data.Bootstrap;
using VideoMeetups.Logic.Bootstrap;

namespace VideoMeetups.Data.Init
{
    class Program
    {
        private static readonly CancellationTokenSource _cancellationTokenSource;

        private static ServiceProvider Bootstrap()
        {
            IServiceCollection serviceCollection = new ServiceCollection();
            LogicBootstrap.Bootstrap(serviceCollection);
            DataInitBootstrap.Bootstrap(serviceCollection);
            serviceCollection.AddTransient<Initializer>();

            return serviceCollection.BuildServiceProvider();
        }

        static Program()
        {
            _cancellationTokenSource = new CancellationTokenSource();
        }

        static void Main(string[] args)
        {
            var erviceLocator = Bootstrap();

            
            Console.CancelKeyPress += Console_CancelKeyPress;

            var initializer = erviceLocator.GetRequiredService<Initializer>();
            Console.WriteLine("Please wait");
            initializer.Initialize(_cancellationTokenSource.Token).Wait();

            Console.WriteLine("Press any key to continue");
            Console.ReadKey();
        }

        private static void Console_CancelKeyPress(object sender, ConsoleCancelEventArgs e)
        {
            _cancellationTokenSource.Cancel();
        }
    }
}
