using AutoMapper;
using EcommerceBackend.Business.src.Dtos.CategoryDtos;
using EcommerceBackend.Business.src.Services.Abstractions;
using EcommerceBackend.Domain.src.Abstractions;
using EcommerceBackend.Domain.src.Common;
using EcommerceBackend.Domain.src.Entities;

namespace EcommerceBackend.Business.src.Services.Implementations
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly ISanitizerService _sanitizerService;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository categoryRepository, ISanitizerService sanitizerService, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _sanitizerService = sanitizerService;
            _mapper = mapper;
        }

        public async Task<ReadCategoryDto> CreateCategoryAsync(CreateCategoryDto categoryDto)
        {
            try
            {
                var sanitzedDto = _sanitizerService.SanitizeDto(categoryDto);
            
                var existingCategory = await _categoryRepository.GetCategoryByNameAsync(sanitzedDto.Name);
                if (existingCategory != null)
                {
                    throw new ArgumentException($"There is an existing category with the name `{sanitzedDto.Name}`. ");
                }

                var categoryDtoProperties = typeof(CreateCategoryDto).GetProperties();
                foreach (var property in categoryDtoProperties)
                {
                    var dtoValue = property.GetValue(sanitzedDto);
                    if (dtoValue is null or (object)"")
                    {
                        throw new ArgumentException($"{property.Name} is required.");
                    }
                }
                
                // bool isValidUrl = Validator.IsValidURL(sanitzedDto.Image);

                // if (!isValidUrl)
                // {
                //     throw new ArgumentException("Invalid image URL.");
                // }

                var newCategory = _mapper.Map<Category>(sanitzedDto);
                newCategory = await _categoryRepository.AddAsync(newCategory);

                var readCategoryDto = _mapper.Map<ReadCategoryDto>(newCategory);
                return readCategoryDto;
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null)
                {
                    Console.WriteLine("Inner exception: " + ex.InnerException.Message);
                }
                throw;
            }
        }

        public async Task<bool> DeleteCategoryAsync(Guid categoryId)
        {
            Console.WriteLine("Category id received in service layer");
            var exisitingCategory = await _categoryRepository.GetByIdAsync(categoryId) ?? throw new ArgumentException($"No Category with this ID {categoryId} was found.");
            return await _categoryRepository.DeleteByIdAsync(exisitingCategory.Id);
        }

        public async Task<IEnumerable<ReadCategoryDto>> GetAllCategoriesAsync(QueryOptions queryOptions)
        {
            var categories = await _categoryRepository.GetAllAsync(queryOptions);
            var readCategoryDtos = _mapper.Map<IEnumerable<ReadCategoryDto>>(categories);
            return readCategoryDtos;
        }

        public async Task<ReadCategoryDto> GetCategoryByIdAsync(Guid categoryId)
        {
            var category = await _categoryRepository.GetByIdAsync(categoryId) ?? throw new ArgumentException($"No Category with this ID {categoryId} was found.");
            var readCategoryDto = _mapper.Map<ReadCategoryDto>(category);
            return readCategoryDto;
        }

        public async Task<ReadCategoryDto> UpdateCategoryAsync(Guid categoryId, UpdateCategoryDto categoryDto)
        {   
            var existingCategory = await _categoryRepository.GetByIdAsync(categoryId) ?? throw new ArgumentException("No Category with this ID {categoryId} was found.");

            var existingCategoryDto = _mapper.Map<UpdateCategoryDto>(existingCategory);
            var categoryDtoProperties = typeof(UpdateCategoryDto).GetProperties();
            foreach (var property in categoryDtoProperties)
            {
                var dtoValue = property.GetValue(categoryDto);
                if (dtoValue != null)
                {
                    var category = existingCategoryDto.GetType().GetProperty(property.Name);
                    category.SetValue(existingCategoryDto, dtoValue);
                }
            }
            _mapper.Map(existingCategoryDto, existingCategory);

            existingCategory = await _categoryRepository.UpdateAsync(categoryId, existingCategory);
            var readCategoryDto = _mapper.Map<ReadCategoryDto>(existingCategory);
            return readCategoryDto;
        }
    }
}