using System;
using System.Collections.Generic;
using System.Text;
using Insights_Core.Interfaces;


namespace Insights_Infrastructure.Repositories
{
    public class Sample : ISample
    {
        string[] ISample.test()
        {
            string[] data = new[]  {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
            return data;
        }
    }
}
