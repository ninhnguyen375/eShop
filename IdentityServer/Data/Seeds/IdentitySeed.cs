using IdentityServer.Infrastructure.Constant;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Data.Seeds
{
    public static class IdentitySeed
    {
        public static async Task SeedRoles(RoleManager<IdentityRole> roleManager)
        {
            if (!roleManager.RoleExistsAsync("manager").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "manager";
                await roleManager.CreateAsync(role);
            }

            if (!roleManager.RoleExistsAsync("seller").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "seller";
                await roleManager.CreateAsync(role);
            }

            if (!roleManager.RoleExistsAsync("shipper").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "shipper";
                await roleManager.CreateAsync(role);
            }

            if (!roleManager.RoleExistsAsync("customer").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "customer";
                await roleManager.CreateAsync(role);
            }
        }
        public static async Task SeedUsers(UserManager<IdentityUser> userManager)
        {
            if (userManager.FindByNameAsync("manager1@gmail.com").Result == null)
            {
                IdentityUser user = new IdentityUser
                {
                    UserName = "manager1@gmail.com",
                    Email = "manager1@gmail.com",
                };

                var result = await userManager.CreateAsync(user, "password123");

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, Roles.Manager);
                }
            }

            if (userManager.FindByNameAsync("seller1@gmail.com").Result == null)
            {
                IdentityUser user = new IdentityUser
                {
                    UserName = "seller1@gmail.com",
                    Email = "seller1@gmail.com",
                };

                var result = await userManager.CreateAsync(user, "password123");

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, Roles.Seller);
                }
            }

            if (userManager.FindByNameAsync("shipper1@gmail.com").Result == null)
            {
                IdentityUser user = new IdentityUser
                {
                    UserName = "shipper1@gmail.com",
                    Email = "shipper1@gmail.com",
                };

                var result = await userManager.CreateAsync(user, "password123");

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, Roles.Shipper);
                }
            }

            if (userManager.FindByNameAsync("customer1@gmail.com").Result == null)
            {
                IdentityUser user = new IdentityUser
                {
                    UserName = "customer1@gmail.com",
                    Email = "customer1@gmail.com",
                };

                var result = await userManager.CreateAsync(user, "password123");

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, Roles.Customer);
                }
            }
        }
    }
}
