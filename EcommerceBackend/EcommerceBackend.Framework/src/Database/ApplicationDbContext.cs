using EcommerceBackend.Domain.src.Entities;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace EcommerceBackend.Framework.src.Database
{
    public class ApplicationDbContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders{ get; set; }
        public DbSet<Inventory> Inventory { get; set; }
        public DbSet<Image> Images { get; set; }

        public ApplicationDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }
    
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var builder = new NpgsqlDataSourceBuilder(_configuration.GetConnectionString("DefaultConnection"));
            optionsBuilder.UseNpgsql(builder.Build()).UseSnakeCaseNamingConvention();
        }   

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.HasIndex(u => u.Email).IsUnique();
                entity.Property(u => u.FirstName).IsRequired();
                entity.Property(u => u.LastName).IsRequired();
                entity.Property(u => u.Email).IsRequired();
                entity.Property(u => u.Password).IsRequired();
            });

            modelBuilder.Entity<Product>(entity => 
            {
                entity.HasKey(p => p.Id);
            });

            modelBuilder.Entity<Category>(entity => 
            {
                entity.HasKey(c => c.Id);
                entity.HasIndex(c => c.Name).IsUnique();
                // entity.Property(c => c.Image).IsRequired();
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(o => o.Id);
                
            });

            modelBuilder.Entity<OrderItem>(entity => 
            {
                entity.HasKey(orderItem => new { orderItem.OrderId, orderItem.ProductId });

                entity.HasOne(orderItem => orderItem.Order)
                    .WithMany(order => order.OrderItems)
                    .HasForeignKey(orderItem => orderItem.OrderId);
                
                entity.HasOne(orderItem => orderItem.Product)
                    .WithMany()
                    .HasForeignKey(orderItem => orderItem.ProductId);
            });
        }
    }
}