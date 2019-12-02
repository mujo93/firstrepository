using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SalesCRUD.Models
{
    public class Store
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int StoreId { get; set; }

        [Required(ErrorMessage = "Employee Name is required")]
        [StringLength(50)]
        public string StoreName { get; set; }

        [Required(ErrorMessage = "Store Address is required")]
        [StringLength(300)]
        public string StoreAddress { get; set; }
        public ICollection<Sale> Sales { get; set; }

    }
}
