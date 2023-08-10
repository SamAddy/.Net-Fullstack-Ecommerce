using AutoMapper;
using EcommerceBackend.Business.src.Dtos.CategoryDtos;
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
        private readonly ICategoryRepository _categoryRepository;

        public ProductService(IProductRepository productRepository, IMapper mapper, ISanitizerService sanitizerService, ICategoryRepository categoryRepository)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _sanitizerService = sanitizerService;
            _categoryRepository = categoryRepository;   
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

                var productDtoProperties = typeof(CreateProductDto).GetProperties();
                foreach (var property in productDtoProperties)
                {
                    var dtoValue = property.GetValue(sanitizedDto);
                    if (property.Name.ToLower() == "imageurl")
                    {
                        Console.WriteLine($"{property.Name} : value is {dtoValue}");
                    }
                    if (dtoValue is null or (object)"")
                    {
                        throw new ArgumentException($"{property.Name} is required.");
                    }
                }

                var category = await _categoryRepository.GetByIdAsync(sanitizedDto.CategoryId);
                if (category == null)
                {
                    throw new ArgumentException($"Category with ID {sanitizedDto.CategoryId} not found.");
                }
                var newProduct = _mapper.Map<Product>(sanitizedDto);
                newProduct = await _productRepository.AddAsync(newProduct);

                // var category = await _categoryRepository.GetByIdAsync(newProduct.CategoryId);
                var readProductDto = _mapper.Map<ReadProductDto>(newProduct);
                readProductDto.Category = _mapper.Map<ReadCategoryDto>(category);
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
            var product = await _productRepository.GetByIdAsync(productId);
            return await _productRepository.DeleteByIdAsync(product.Id);
        }

        public async Task<IEnumerable<ReadProductDto>> GetAllProductsAsync(QueryOptions queryOptions)
        {
            var products = await _productRepository.GetAllAsync(queryOptions);
            var readProductDtos = new List<ReadProductDto>();

            foreach (var product in products)
            {
                var readProductDto = _mapper.Map<ReadProductDto>(product);

                var category = await _categoryRepository.GetByIdAsync(product.CategoryId);
                readProductDto.Category = _mapper.Map<ReadCategoryDto>(category);
                readProductDtos.Add(readProductDto);
            }
            return readProductDtos;
        }

        public async Task<ReadProductDto> GetProductByIdAsync(Guid productId)
        {
            var product = await _productRepository.GetByIdAsync(productId) 
                ?? throw new ArgumentException($"Product with ID {productId} not found.");
            var category = await _categoryRepository.GetByIdAsync(product.CategoryId);
            var readProductDto = _mapper.Map<ReadProductDto>(product);
            readProductDto.Category = _mapper.Map<ReadCategoryDto>(category);
            return readProductDto;
        }

        public async Task<ReadProductDto> UpdateProductAsync(Guid productId, UpdateProductDto updateProductDto)
        {
            try 
            {
                var sanitizedDto = _sanitizerService.SanitizeDto(updateProductDto);
                
                var existingProduct = await _productRepository.GetByIdAsync(productId) 
                    ?? throw new ArgumentException($"No Product with ID `{productId}` was found.");
                
                var existingProductDto = _mapper.Map<UpdateProductDto>(existingProduct);

                var updateProductDtoProperties = typeof(UpdateProductDto).GetProperties();
                foreach (var property in updateProductDtoProperties)
                {
                    var dtoValue = property.GetValue(sanitizedDto);
                    if (dtoValue is null or (object)"")
                    {
                        throw new ArgumentException($"{property.Name} is required.");        
                    }
                    
                    var product = existingProductDto.GetType().GetProperty(property.Name);
                    product.SetValue(existingProductDto, dtoValue);
                
                }
                _mapper.Map(existingProductDto, existingProduct);

                var updateProduct = await _productRepository.UpdateAsync(existingProduct.Id, existingProduct);
                var category = await _categoryRepository.GetByIdAsync(existingProduct.CategoryId);

                var readProductDto = _mapper.Map<ReadProductDto>(updateProduct);
                readProductDto.Category = _mapper.Map<ReadCategoryDto>(category);
                return readProductDto;
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }
                throw;
            }
        }
    }
}