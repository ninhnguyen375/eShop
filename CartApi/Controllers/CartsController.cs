using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using CartApi.Domain.Models;
using CartApi.Domain.Services;
using CartApi.Infrastructure.Constant;
using Cart = CartApi.Domain.Models.Cart;
using CartItem = CartApi.Domain.Models.CartItem;

namespace CartApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartsController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartsController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(string id)
        {
            var cart = await _cartService.GetByAsync(id);

            return Ok(cart);
        }

        [HttpPut]
        public async Task<Cart> Update(Cart cart)
        {
            return await _cartService.UpdateAsync(cart.Id, cart);
        }

        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            await _cartService.DeleteAsync(id);
        }
    }
}