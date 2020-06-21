using IdentityModel;
using IdentityServer4;
using IdentityServer4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> Ids =>
            new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };

        public static IEnumerable<ApiResource> Apis =>
            new List<ApiResource>
            {
                new ApiResource(IdentityServerConstants.LocalApi.ScopeName),
                new ApiResource("CatalogApi"),
                new ApiResource("OrderApi"),
                new ApiResource("CartApi"),
                new ApiResource("PaymentApi")
            };

        public static IEnumerable<Client> Clients =>
            new List<Client>
            {
                new Client
                {
                    ClientId = "react_client",
                    // GrantType.ResourceOwnerPassword for development
                    AllowedGrantTypes = {
                        GrantType.AuthorizationCode
                    },
                    RedirectUris = { "http://localhost:3000/#/signin-oidc"},
                    PostLogoutRedirectUris = { "http://localhost:3000/#/logout" },
                    AllowedScopes = {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.LocalApi.ScopeName,
                        "CatalogApi",
                        "OrderApi",
                        "CartApi",
                        "PaymentApi"
                    },
                    RequirePkce = true,
                    RequireConsent = false,
                    RequireClientSecret = false,
                    AccessTokenLifetime = 3600 * 24 * 365
                }
            };
    }
}
