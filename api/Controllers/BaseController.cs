using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using koudouApi.Data;
using koudouApi.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{    
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController<T> : ControllerBase
    where T : BaseEntity
    {
        protected readonly KoudouContext context;

        public BaseController()
        {
        }

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<T>>> Get()
        //{
        //    return await context.Set<T>().ToListAsync();
        //}
	
        [HttpGet("{id}")]
        public async Task<ActionResult<T>> GetOne(int id)
        {
            var element = await context.Set<T>().FindAsync(id);

            if (element == null)
            {
                return NotFound();
            }

            return element;
        }

        [HttpPost]
        public async Task<ActionResult<T>> Post(T element)
        {
            context.Set<T>().Add(element);
            await context.SaveChangesAsync();

            return CreatedAtAction("Get", new { id = element.Id }, element);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, T element)
        {
            if (id != element.Id)
            {
                return BadRequest();
            }

            context.Entry(element).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ElementExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<T>> Delete(int id)
        {
            var element = await context.Set<T>().FindAsync(id);
            if (element == null)
            {
                return NotFound();
            }

            context.Set<T>().Remove(element);
            await context.SaveChangesAsync();

            return element;
        }

        private bool ElementExists(int id)
        {
            return context.Set<T>().Any(e => e.Id == id);
        }
    }
}