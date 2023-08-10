using AutoMapper;
using EcommerceBackend.Business.src.Dtos.UserDtos;
using EcommerceBackend.Business.src.Services.Abstractions;
using EcommerceBackend.Domain.src.Common;
using EcommerceBackend.Domain.src.Entities;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult<IEnumerable<ReadUserDto>>> GetAllUsers([FromQuery] QueryOptions queryOptions)
        {
            var users = await _userService.GetAllUsersAsync(queryOptions);
            return Ok(users);
        }

        [HttpPost]
         public async Task<ActionResult<ReadUserDto>> CreateUser([FromBody] CreateUserDto createUserDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _userService.CreateUserAsync(createUserDto);
            return Ok(user);
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<ReadUserDto>> GetUserById(Guid id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet("byEmail/{email}")]
        public async Task<ActionResult<ReadUserDto>> GetUserByEmail(string email)
        {
            var user = await _userService.GetUserByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult<bool>> DeleteUser(Guid id)
        {
            var result = await _userService.DeleteUserByIdAsync(id);
            if (!result)
            {
                NotFound();
                return false;
            }
            return true;
        }

        [HttpPut("{id:Guid}")]
        public async Task<ActionResult<ReadUserDto>> UpdateUser(Guid id, [FromBody]UpdateUserDto userDto)
        {
            var user = await _userService.UpdateUserAsync(id, userDto);
            if (user == null)
            {
                return BadRequest();
            }
            var readUserDto = _mapper.Map<ReadUserDto>(user);
            return Ok(readUserDto);
        }

        [HttpPost("Admin/")]
        public async Task<ActionResult<ReadUserDto>> CreateAdmin([FromBody]CreateUserDto userDto)
        {
            var admin = await _userService.CreateAdminAsync(userDto);
            return Ok(admin);
        }
    }
}