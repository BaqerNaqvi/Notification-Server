using Microsoft.AspNetCore.SignalR;
using NotificationEngine.Models;

namespace NotificationEngine.Hubs
{
    public class RefreshHub : Hub
    {
        public async Task SendMessage(ChatMessage chatMessage)
        {
            await Clients.All.SendAsync("ReceiveMessage", chatMessage);
        }
    }
}
