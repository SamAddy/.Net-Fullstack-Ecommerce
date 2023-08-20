using EcommerceBackend.Business.src.Dtos.Product;
using EcommerceBackend.Business.src.Services.Abstractions;
using EcommerceBackend.Domain.src.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceBackend.Application.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<ReadProductDto>> GetAllProducts([FromQuery] QueryOptions queryOptions)
        {
            var products = await _productService.GetAllProductsAsync(queryOptions);
            return Ok(products);
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<ReadProductDto>> GetProductById(Guid id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ReadProductDto>> CreatProduct([FromBody] CreateProductDto product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var newProduct = await _productService.CreateProductAsync(product);
            return Ok(newProduct);
        }

        [HttpPut("{id:Guid}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ReadProductDto>> UpdateProduct(Guid id, [FromBody] UpdateProductDto productDto)
        {
            var product = await _productService.UpdateProductAsync(id, productDto);
            return Ok(product);
        }

        [HttpDelete("{id:Guid}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<bool>> DeleteProductById(Guid id)
        {
            var result = await _productService.DeleteProductByIdAsync(id);
            if (!result)
            {
                NotFound();
                return false;
            }
            return true;
        }
    }
}