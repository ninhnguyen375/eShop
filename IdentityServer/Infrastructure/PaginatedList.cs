using System;
using System.Collections.Generic;
using System.Linq;
using IdentityServer.DTO.Response;
using Microsoft.AspNetCore.Identity;

namespace IdentityServer.Infrastructure
{
    public class PaginatedList<T> : List<T> {
        public static ListResponseDTO Create (IEnumerable<T> source, int current, int pageSize) {
            int total = source.Count<T> ();
            var items = source.Skip ((current - 1) * pageSize).Take<T> (pageSize);
            int totalPage = (int) Math.Ceiling (total / (double) pageSize);
            var count = items.Count ();

            return new ListResponseDTO {
                Data = (IEnumerable<object>)items,
                Current = current,
                PageSize = pageSize,
                Count = count,
                Total = total,
                TotalPage = totalPage
            };
        }
        public static ListResponseDTO ApplyWithSource (IEnumerable<object> source, ListResponseDTO list) {
            return new ListResponseDTO {
                Data = source,
                Current = list.Current,
                PageSize = list.PageSize,
                Count = list.Count,
                Total = list.Total,
                TotalPage = list.TotalPage
            };
        }
   }
}