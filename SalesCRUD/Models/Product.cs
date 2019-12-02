using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SalesCRUD.Models
{
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductId { get; set; }

        [Required(ErrorMessage = "Product Name is required")]
        [StringLength(50)]
        public string ProductName { get; set; }

        [Required(ErrorMessage = "Price is required")]
        [Range(0.000001, 10000000, ErrorMessage = "Salary must be between 0.000001 and 10000000")]
        public decimal ProductPrice { get; set; }
        public  ICollection<Sale> Sales { get; set; }
    }
}
