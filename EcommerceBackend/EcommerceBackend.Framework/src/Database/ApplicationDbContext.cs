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

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IConfiguration configuration)
        : base(options)
        {
            _configuration = configuration;
        }

        // public ApplicationDbContext(IConfiguration configuration)
        // {
        //     _configuration = configuration;
        // }

        static ApplicationDbContext()
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
            AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
        }
    
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var builder = new NpgsqlDataSourceBuilder(_configuration.GetConnectionString("DefaultConnection"));
            builder.MapEnum<UserRole>();
            builder.MapEnum<OrderStatus>();
            optionsBuilder.AddInterceptors(new TimeStampInterceptor());
            optionsBuilder.UseNpgsql(builder.Build()).UseSnakeCaseNamingConvention();
        }   

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresEnum<UserRole>();
            modelBuilder.HasPostgresEnum<OrderStatus>();
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.HasIndex(u => u.Email).IsUnique();
                entity.Property(u => u.FirstName).IsRequired();
                entity.Property(u => u.LastName).IsRequired();
                entity.Property(u => u.Email).IsRequired();
                entity.Property(u => u.PasswordHash).IsRequired();
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