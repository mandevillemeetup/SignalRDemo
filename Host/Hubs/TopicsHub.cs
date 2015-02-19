using System;
using System.Diagnostics;
using System.Threading;
using Core.Models;
using Core.Services;
using Microsoft.AspNet.SignalR;

namespace Host.Hubs
{
    public class TopicsHub : Hub
    {
        private readonly ITopicService _topicService;
        private readonly ICounterService _counterService;

        public TopicsHub(ITopicService topicService, ICounterService counterService)
        {
            _topicService = topicService;
            _counterService = counterService;
        }

        public void Add(Topic topic)
        {
            var newtopic = _topicService.Add(topic);
            Clients.All.topicAdded(newtopic);
        }

        public void Get()
        {
            Clients.All.topicsLoaded(_topicService.GetAll());
        }

        public void Remove(string topicId)
        {
            _topicService.Remove(topicId);
            Clients.All.topicRemoved(topicId);
        }

        
    }
}
