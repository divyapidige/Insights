using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;

namespace Insight_App.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class userController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public userController(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            
        }

        [HttpGet]
        public ActionResult getUserId() {
            string userName = _httpContextAccessor.HttpContext.User.Identity.Name;
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            return new JsonResult(userName);
        }
    }
}