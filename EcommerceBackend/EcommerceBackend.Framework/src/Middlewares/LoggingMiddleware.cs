namespace EcommerceBackend.Framework.src.Middlewares
{
    public class LoggingMiddleWare : IMiddleware
    {
        private readonly ILogger<LoggingMiddleWare> _logger;

        public LoggingMiddleWare(ILogger<LoggingMiddleWare> logger)
        {
                _logger = logger;
        }
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            // Console.WriteLine($"Incoming request: {context.Request.Path} {context.User.Identities} {context.Request.QueryString} ");
            // await context.Response.WriteAsync("Request should end here.");

            var originalResponseBody = context.Response.Body;

            using var responseBodyStream = new MemoryStream();
            context.Response.Body = responseBodyStream;

            try
            {
                // var requestInfo = $"{context.Request.Method} {context.Request.Path} {context.Request.QueryString}";
                // _logger.LogInformation($"Request: {requestInfo}, User-Agent: {context.Request.Headers["User-Agent"]}, Remote IP: {context.Connection.RemoteIpAddress} ");
                _logger.LogInformation("{Timestamp:yyyy-MM-dd HH:mm:ss.fff} - Request: {Method} {Path}{QueryString}, User-Agent: {UserAgent}, Remote IP: {RemoteIpAddress}",
                    DateTime.Now, context.Request.Method, context.Request.Path, context.Request.QueryString, context.Request.Headers["User-Agent"], context.Connection.RemoteIpAddress);

                await next(context);

                responseBodyStream.Seek(0, SeekOrigin.Begin);
                // var responseBody = await new StreamReader(responseBodyStream).ReadToEndAsync();
                // var responseInfo = $"Status: {context.Response.StatusCode}";
                _logger.LogInformation("Response: {ResponseInfo}, Content: {ResponseBody}",
                    context.Response.StatusCode, await new StreamReader(responseBodyStream).ReadToEndAsync());
            }
            catch (Exception ex)
            {
                _logger.LogError("An error occurred while processing the request.", ex);
                throw;
            }
            finally
            {
                responseBodyStream.Seek(0, SeekOrigin.Begin);
                await responseBodyStream.CopyToAsync(originalResponseBody);
            }
        }
    }
}