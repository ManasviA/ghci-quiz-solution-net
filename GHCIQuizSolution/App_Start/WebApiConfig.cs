using NLog;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace GHCIQuizSolution
{
  public static class WebApiConfig
  {
    private static Logger logger = LogManager.GetCurrentClassLogger();

    public static void Register(HttpConfiguration config)
    {
      var env = ConfigurationManager.AppSettings["isProdEnvironment"];
      logger.Info("Prod Environment is " + env);

      if(!"true".Equals(env)) {
        config.EnableCors(new EnableCorsAttribute(
              origins: "*",
              headers: "*",
              methods: "*"));
        // Web API configuration and services
      }

      // Web API routes
      config.MapHttpAttributeRoutes();

      config.Routes.MapHttpRoute(
          name: "DefaultApi",
          routeTemplate: "api/{controller}/{id}",
          defaults: new { id = RouteParameter.Optional }
      );
    }
  }
}
