using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesCRUD.Models
{
    public class SaleContext:DbContext
    {
      /*  public SaleContext()
        {

        }*/
        
        public SaleContext(DbContextOptions<SaleContext>options):base(options)
        {

        }

        public DbSet<Sale> Sales { get; set; }
        public DbSet<Customer> Customers { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Store> Stores { get; set; }

        
    }
}
