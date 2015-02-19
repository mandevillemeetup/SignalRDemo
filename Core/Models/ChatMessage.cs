using System;

namespace Core.Models
{
    public class ChatMessage
    {
        public string Message { get; set; }
        public string Sender { get; set; }
        public DateTime SentDateTime { get; set; }
    }
}
