using System.Threading.Tasks;
using BusinessLayer.Dtos;
using BusinessLayer.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers;
[ApiController]
[Route("api/[controller]")]
public class GiveawayController : Controller
{
  private readonly IGiveawayService _giveawayService;

  public GiveawayController(IGiveawayService giveawayService)
  {
    _giveawayService = giveawayService;
  }

  [HttpPost]
  public async Task<IActionResult> CreateGiveaway([FromBody] CreateGiveawayRequestDto requestDto)
  {
    var result = await _giveawayService.CreateGiveaway(requestDto);
    return StatusCode(result.StatusCode, result);
  }
}
