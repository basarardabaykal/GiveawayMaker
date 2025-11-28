using Microsoft.AspNetCore.Mvc;
using PresentationLayer.Middlewares;
using BusinessLayer.Repositories.Interfaces;
using BusinessLayer.Repositories.Concretes;
using BusinessLayer.Services.Interfaces;
using BusinessLayer.Services.Concretes;
using BusinessLayer.Profiles;
using DataLayer;
using Microsoft.EntityFrameworkCore;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Env
DotNetEnv.Env.Load();

// Db Context
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// AutoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Dependency Injection
builder.Services.AddScoped(typeof(IGiveawayRepository), typeof(GiveawayRepository));
builder.Services.AddScoped(typeof(IGiveawayService), typeof(GiveawayService));

var app = builder.Build();

// global exception handler middleware
app.UseMiddleware<GlobalExceptionHandlerMiddleware>();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();

