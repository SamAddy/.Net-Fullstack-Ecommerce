using System.Net;
using System.Text.Json;

namespace EcommerceBackend.Framework.src.Middlewares
{
    public class ErrorHandlerMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null)
                {
                    await HandleExceptionAsync(context, ex.InnerException);
                }
                await HandleExceptionAsync(context, ex);
            }
        }

        private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var errorResponse = new{
                Message = "An error occurred while processing your request.",
                ExceptionMessage = exception.Message,
                ExceptionType = exception.GetType().FullName,
            };

            var jsonErrorREsponse = JsonSerializer.Serialize(errorResponse);
            await context.Response.WriteAsync(jsonErrorREsponse);
        }
    }
}