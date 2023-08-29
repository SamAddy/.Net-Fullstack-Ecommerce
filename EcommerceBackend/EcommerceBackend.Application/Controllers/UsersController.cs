using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using EcommerceBackend.Business.src.Dtos.UserDtos;
using EcommerceBackend.Business.src.Services.Abstractions;
using EcommerceBackend.Domain.src.Common;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EcommerceBackend.Application.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UsersController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }
        
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<ReadUserDto>>> GetAllUsersAsync([FromQuery] QueryOptions queryOptions)
        {
            var users = await _userService.GetAllUsersAsync(queryOptions);
            return Ok(users);
        }

        [HttpPost]
         public async Task<ActionResult<ReadUserDto>> CreateUserAsync([FromBody] CreateUserDto createUserDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _userService.CreateUserAsync(createUserDto);
            return Ok(user);
        }

        [HttpGet("{id:Guid}")]
        [Authorize]
        public async Task<ActionResult<ReadUserDto>> GetUserByIdAsync(Guid id)
        {
            var requestingUserId = User.FindFirst(ClaimTypes.NameIdentifier);

            if (requestingUserId == null || !Guid.TryParse(requestingUserId.Value, out var requestUserId))
            {
                return Forbid();
            }
            
            if (requestUserId == id)
            {
                var user = await _userService.GetUserByIdAsync(id);
                if (user == null)
                {
                    return NotFound();
                }
                return Ok(user);
            }
            return Forbid();
        }

        [HttpGet("Email/{email}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ReadUserDto>> GetUserByEmailAsync(string email)
        {
            var user = await _userService.GetUserByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpDelete("{id:Guid}")]
        [Authorize]
        public async Task<ActionResult<bool>> DeleteUserAsync(Guid id)
        {
            var requestingUserIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (requestingUserIdClaim == null || !Guid.TryParse(requestingUserIdClaim.Value, out var requestingUserId))
            {
                return Forbid();
            }

            if (User.IsInRole("Admin") || requestingUserId == id)
            {
                var result = await _userService.DeleteUserByIdAsync(id);
                if (!result)
                {
                    return NotFound();
                }
                return true;
            }
            return Forbid();
        }

        [HttpPut("{id:Guid}")]
        [Authorize]
        public async Task<ActionResult<ReadUserDto>> UpdateUserAsync(Guid id, [FromBody]UpdateUserDto userDto)
        {
            var requestUserIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (requestUserIdClaim == null || !Guid.TryParse(requestUserIdClaim.Value, out var UpdateRequestingUserId))
            {
                return Forbid();
            }
            
            if (UpdateRequestingUserId == id)
            {
                var user = await _userService.UpdateUserAsync(id, userDto);
                if (user == null)
                {
                    return BadRequest();
                }
                var readUserDto = _mapper.Map<ReadUserDto>(user);
                return Ok(readUserDto);
            }
            return Forbid();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("Admin/")]
        public async Task<ActionResult<ReadUserDto>> CreateAdminAsync([FromBody]CreateUserDto userDto)
        {
            var adminUser = await _userService.CreateAdminAsync(userDto);
            return Ok(adminUser);
        }
    }
}