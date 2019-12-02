using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SalesCRUD.Models
{
    public class Customer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CustomerId { get; set; }

        [Required(ErrorMessage = "Customer Name is required")]
        [StringLength(50)]
        public string CustomerName { get; set; }

        [Required(ErrorMessage = "Customer Address is required")]
        [StringLength(300)]
        public string CustomerAddress { get; set; }
        public  ICollection<Sale> Sales { get; set; }


    }
}
