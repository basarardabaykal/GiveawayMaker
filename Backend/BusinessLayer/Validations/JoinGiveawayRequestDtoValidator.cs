using BusinessLayer.Dtos;
using FluentValidation;
using PhoneNumbers;

namespace BusinessLayer.Validations
{
    public class JoinGiveawayRequestDtoValidator : AbstractValidator<JoinGiveawayRequestDto>
    {
        public JoinGiveawayRequestDtoValidator()
        {
            RuleFor(x => x.FullName)
                .NotEmpty().WithMessage("Full name is required.")
                .MaximumLength(200);

            RuleFor(x => x.PhoneNumber)
                .NotEmpty().WithMessage("Phone number is required.")
                .Must(BeValidInternationalPhone).WithMessage("Phone number must be a valid international number including country code.");
        }

        private bool BeValidInternationalPhone(string? phone)
        {
            if (string.IsNullOrWhiteSpace(phone)) return false;
            var raw = phone.Trim();
            if (!raw.StartsWith("+")) raw = "+" + raw;
            try
            {
                var util = PhoneNumberUtil.GetInstance();
                var parsed = util.Parse(raw, "ZZ");
                return util.IsValidNumber(parsed);
            }
            catch
            {
                return false;
            }
        }
    }
}
