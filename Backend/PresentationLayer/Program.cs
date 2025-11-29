using Microsoft.AspNetCore.Mvc;
using PresentationLayer.Middlewares;
using BusinessLayer.Repositories.Interfaces;
using BusinessLayer.Repositories.Concretes;
using BusinessLayer.Services.Interfaces;
using BusinessLayer.Services.Concretes;
using BusinessLayer.Profiles;
using BusinessLayer.Repositories.Interfaces;
using BusinessLayer.Repositories.Concretes;
using DataLayer;
using Microsoft.EntityFrameworkCore;
using System.IO;
using Microsoft.OpenApi.Models;

// Env
DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Swagger setup
builder.Services.AddSwaggerGen(o =>
    o.SwaggerDoc("v1", new OpenApiInfo { Title = "GiveawayMaker API", Version = "v1" })
);

// Db Context
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// AutoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// CORS
var frontendUrl = builder.Configuration["FRONTEND_URL"];
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend",
        policy => policy.WithOrigins(frontendUrl)
                         .AllowAnyHeader()
                         .AllowAnyMethod()
                         .AllowCredentials());
});

// Dependency Injection
builder.Services.AddScoped(typeof(IGiveawayRepository), typeof(GiveawayRepository));
builder.Services.AddScoped(typeof(IGiveawayService), typeof(GiveawayService));
builder.Services.AddScoped(typeof(IParticipatorRepository), typeof(ParticipatorRepository));
builder.Services.AddScoped(typeof(IParticipatorService), typeof(ParticipatorService));

var app = builder.Build();

// global exception handler middleware
app.UseMiddleware<GlobalExceptionHandlerMiddleware>();

// CORS
app.UseCors("Frontend");

// Run swagger
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();

