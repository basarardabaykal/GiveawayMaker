using System.Threading.Tasks;
using BusinessLayer.Dtos;
using BusinessLayer.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers;
[ApiController]
[Route("api/[controller]")]
public class ParticipatorController : Controller
{
  private readonly IParticipatorService _participatorService;

  public ParticipatorController(IParticipatorService participatorService)
  {
    _participatorService = participatorService;
  }

  [HttpPost]
  public async Task<IActionResult> JoinGiveaway([FromBody] JoinGiveawayRequestDto requestDto)
  {
    var result = await _participatorService.JoinGiveaway(requestDto);
    return StatusCode(result.StatusCode, result);
  }
    
}
