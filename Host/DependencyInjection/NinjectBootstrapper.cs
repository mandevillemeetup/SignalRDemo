using Core.Services;
using Microsoft.AspNet.SignalR;
using Ninject;
using Ninject.Modules;

namespace Host.DependencyInjection
{
    public class NinjectBootstrapper
    {
        public static void WireDependencies()
        {
            var kernel = new StandardKernel(new SignalRDemoModule());
            GlobalHost.DependencyResolver = new NinjectSignalRDependencyResolver(kernel);
        }
    }

    public class SignalRDemoModule : NinjectModule
    {
        public override void Load()
        {
            Kernel.Bind<ITopicService>().To<TopicService>().InSingletonScope();
            Kernel.Bind<ICounterService>().To<CounterService>().InSingletonScope();
            // Kernel.Bind<IChatService>().To<ChatService>();
        }
    }
}
