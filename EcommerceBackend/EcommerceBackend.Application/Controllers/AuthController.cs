using System.Security.Claims;
using EcommerceBackend.Business.src.Dtos.UserDtos;
using EcommerceBackend.Business.src.Services.Abstractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceBackend.Application.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserService _userService;

        public AuthController(IAuthService authService, IUserService userService)
        {
            _authService = authService;
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> AuthenticateUserAsync([FromBody] UserCredentialsDto userCredentials)
        {
            return Ok(await _authService.AutheticateUser(userCredentials));
        }

        [HttpPost("token")]
        [Authorize]
        public async Task<ActionResult<string>> RefreshTokenAsync([FromBody] string token)
        {
            return Ok(await _authService.RefreshToken(token));
        }

        [HttpGet("profile")]
        [Authorize]
        public async Task<ActionResult<ReadUserDto>> GetUserProfileAsync()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
            {
                return Unauthorized();
            }

            var user = await _userService.GetUserByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
    }
}