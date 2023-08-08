using AutoMapper;
using EcommerceBackend.Business.src.Dtos.Product;
using EcommerceBackend.Business.src.Services.Abstractions;
using EcommerceBackend.Domain.src.Abstractions;
using EcommerceBackend.Domain.src.Common;
using EcommerceBackend.Domain.src.Entities;

namespace EcommerceBackend.Business.src.Services.Implementations
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly ISanitizerService _sanitizerService;

        public ProductService(IProductRepository productRepository, IMapper mapper, ISanitizerService sanitizerService)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _sanitizerService = sanitizerService;   
        }
        
        public async Task<ReadProductDto> CreateProductAsync(CreateProductDto createProductDto)
        {
            try
            {
                var sanitizedDto =  _sanitizerService.SanitizeDto(createProductDto);

                if (sanitizedDto == null)
                {
                    throw new ArgumentNullException(nameof(createProductDto));
                }

                // var productDtoProperties = typeof(Product).GetProperties();
                // foreach (var property in productDtoProperties)
                // {
                //     var dtoValue = property.GetValue(createProductDto);
                //     if (dtoValue is null or (object)"")
                //     {
                //         throw new ArgumentException($"{property.Name} is required.");
                //     }
                // }

                var newProduct = _mapper.Map<Product>(sanitizedDto);
                newProduct = await _productRepository.AddAsync(newProduct);

                var readProductDto = _mapper.Map<ReadProductDto>(newProduct);
                return readProductDto;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Mapping error: " + ex.Message);

                if (ex.InnerException != null)
                {
                    Console.WriteLine("Inner exception: " + ex.InnerException.Message);
                }
                throw;
            }

        }

        public async Task<bool> DeleteProductByIdAsync(Guid productId)
        {
            var product = await _productRepository.GetByIdAsync(productId) ?? throw new ArgumentException($"No product with this ID {productId} was found.");
            return await _productRepository.DeleteByIdAsync(product.Id);
        }

        public async Task<IEnumerable<ReadProductDto>> GetAllProductsAsync(QueryOptions queryOptions)
        {
            var products = await _productRepository.GetAllAsync(queryOptions);
            var readProductDtos = _mapper.Map<IEnumerable<ReadProductDto>>(products);
            return readProductDtos;
        }

        public async Task<ReadProductDto> GetProductByIdAsync(Guid productId)
        {
            var product = await _productRepository.GetByIdAsync(productId) ?? throw new ArgumentException($"No product with this ID {productId} was found.");
            var readProductDto = _mapper.Map<ReadProductDto>(product);
            return readProductDto;
        }

        public async Task<ReadProductDto> UpdateProductAsync(Guid productId, UpdateProductDto updateProductDto)
        {
            var existingProduct = await _productRepository.GetByIdAsync(productId) ?? throw new ArgumentException($"No product with this ID {productId} was found.");;
            
            var existingProductDto = _mapper.Map<UpdateProductDto>(existingProduct);
            var updateProductDtoProperties = typeof(UpdateProductDto).GetProperties();
            foreach (var property in updateProductDtoProperties)
            {
                var dtoValue = property.GetValue(updateProductDto);
                if (dtoValue != null)
                {
                    var product = existingProductDto.GetType().GetProperty(property.Name);
                    product.SetValue(existingProductDto, dtoValue);
                }
            }
            _mapper.Map(existingProductDto, existingProduct);

            existingProduct = await _productRepository.UpdateAsync(productId, existingProduct);
            var readProductDto = _mapper.Map<ReadProductDto>(existingProduct);
            return readProductDto;
        }
    }
}