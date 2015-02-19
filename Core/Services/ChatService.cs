using Core.Models;
using System;

namespace Core.Services
{
    public interface IChatService
    {
        void Send(ChatMessage chatMessage);
        void Receive(ChatMessage chatMessage);
    }

    public class ChatService : IChatService
    {
        
        public void Send(ChatMessage chatMessage)
        {
            throw new NotImplementedException();
        }

        public void Receive(ChatMessage chatMessage)
        {
            throw new NotImplementedException();
        }
    }
}
