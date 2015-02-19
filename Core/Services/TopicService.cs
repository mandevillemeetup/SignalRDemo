using System;
using System.Collections.Generic;
using System.Linq;
using Core.Models;

namespace Core.Services
{
    public interface ITopicService
    {
        IEnumerable<Topic> GetAll();
        Topic Add(Topic topic);
        void Remove(string topicId);
    }

    public class TopicService : ITopicService
    {
        private IList<Topic> _topics;

        public TopicService()
        {
            _topics = new List<Topic>()
            {
                new Topic {Id = Guid.NewGuid().ToString(), Title = "Learn SignalR", Info = "Some interesting SignalR stuff"},
                new Topic {Id = Guid.NewGuid().ToString(), Title = "AngularJS", Info = "Some interesting AngularJS stuff"},
                new Topic {Id = Guid.NewGuid().ToString(), Title = "Angular UI Router", Info = "Some interesting Angular UI Router stuff"},
                new Topic {Id = Guid.NewGuid().ToString(), Title = "ASP.Net", Info = "Some interesting ASP.Net stuff"},
                new Topic {Id = Guid.NewGuid().ToString(), Title = "NodeJS", Info = "Some interesting NodeJS stuff"}
            };
        }


        public IEnumerable<Topic> GetAll()
        {
            return _topics;
        }

        public Topic Add(Topic topic)
        {
            topic.Id = Guid.NewGuid().ToString();
            _topics.Add(topic);
            return topic;
        }

        public void Remove(string topicId)
        {
            var topic = _topics.First(p => p.Id == topicId);
            _topics.Remove(topic);
        }
    }
}
