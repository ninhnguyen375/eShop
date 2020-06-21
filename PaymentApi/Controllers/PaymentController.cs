using System;
using System.IO;
using System.Threading.Tasks;
using MassTransit;
using MessageTypes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Stripe;

namespace PaymentApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly ILogger<PaymentController> _logger;
        private readonly IBus _bus;

        public PaymentController(ILogger<PaymentController> logger, IBus bus)
        {
            _logger = logger;
            _bus = bus;
        }

        [HttpPost]
        [Route("webhook")]
        [AllowAnonymous]
        public async Task<ActionResult> Webhook()
        {
            Console.WriteLine("webhook run");
            const string secret = "whsec_9Ylk3AV0pn6IML69W9g83fiQAZq5Y612";
            try
            {
                var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

                var stripeEvent = EventUtility.ConstructEvent(json,
                    Request.Headers["Stripe-Signature"], secret);

                PaymentIntent intent = null;

                switch (stripeEvent.Type)
                {
                    case "payment_intent.succeeded":
                        intent = (PaymentIntent)stripeEvent.Data.Object;
                        _logger.LogInformation("Succeeded: {ID}", intent.Id);
                        // Fulfil the customer's purchase
                        Console.WriteLine("webhook run success");
                        await _bus.Publish(new PaymentOrderSuccessMessage{
                            PaymentIntentId = intent.Id
                        });

                        break;
                    case "payment_intent.payment_failed":
                        intent = (PaymentIntent)stripeEvent.Data.Object;
                        _logger.LogInformation("Failure: {ID}", intent.Id);

                        // Notify the customer that payment failed

                        break;
                    default:
                        // Handle other event types

                        break;
                }
                return new EmptyResult();

            }
            catch (StripeException)
            {
                // Invalid Signature
                return BadRequest();
            }
        }
    }
}