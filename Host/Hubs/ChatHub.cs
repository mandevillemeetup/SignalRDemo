using Core.Models;
using Microsoft.AspNet.SignalR;

namespace Host.Hubs
{
    public class ChatHub : Hub
    {
        public void Send(ChatMessage message)
        {
            Clients.All.addMessage(message);
        }

        public void SendNotification(ChatMessage message)
        {
            Clients.All.addNotification(message);
        }
    }
}
