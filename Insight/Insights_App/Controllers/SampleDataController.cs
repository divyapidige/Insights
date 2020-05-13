using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Insights_Core.Interfaces;


namespace Insights_App.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : ControllerBase
    {
        public SampleDataController(ISample obj)
        {
            Sampleobj = obj;
        }

        public ISample Sampleobj { get; }

        [HttpGet]
        public string[] Get()
        {
            return Sampleobj.test();
        }
    }
}
