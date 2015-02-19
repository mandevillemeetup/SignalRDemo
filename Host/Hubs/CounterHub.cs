using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Core.Services;
using Microsoft.AspNet.SignalR;

namespace Host.Hubs
{
    public class CounterHub : Hub
    {
        private readonly ICounterService _counterService;

        public CounterHub(ICounterService counterService)
        {
            _counterService = counterService;
        }

        public void StartCounter(int total)
        {
            _counterService.SetValue(0);
            _counterService.SetTotalRecords(total);

            for (var i = 0; i < total; i++)
            {
                Thread.Sleep(100);

                _counterService.SetValue(i + 1);
                Clients.All.updateCount(_counterService.GetCurrentCount());
            }

            _counterService.SetValue(0);
            _counterService.SetTotalRecords(0);
        }

        public void GetCount()
        {
            var currentCount = _counterService.GetCurrentCount();
            var totalRecords = _counterService.GetTotalRecords();

            Clients.All.sendCurrentCount(new Tuple<int, int>(currentCount, totalRecords));
        }
    }

}
