
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using NotificationEngine.Hubs;
using NotificationEngine.Models;

namespace NotificationEngine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RefreshController : ControllerBase
    {
        private IHubContext<RefreshHub> hubContext_{ get; set; }

        public RefreshController(IHubContext<RefreshHub> hubcontext)
        {
            hubContext_ = hubcontext;
        }

        [HttpPost("Clients")]
        public async Task<IActionResult> RefreshClients()
        {
            await this.hubContext_.Clients.All.SendAsync("RefreshClient", DateTime.Now.ToLongDateString());
            return Ok("success");
        }

    }
}
