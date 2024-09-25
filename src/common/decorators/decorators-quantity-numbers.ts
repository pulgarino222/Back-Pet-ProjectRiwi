import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

// Custom decorator function to validate if a string contains exactly the specified number of digits
export function IsDigits(digitCount: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDigits', // Name of the decorator
      target: object.constructor, // The constructor of the class the decorator is applied to
      propertyName: propertyName, // The name of the property being decorated
      options: validationOptions, // Optional validation options
      constraints: [digitCount], // Constraints for the validator (in this case, the expected digit count)
      validator: {
        // Validation logic
        validate(value: any, args: ValidationArguments) {
          const [expectedDigitCount] = args.constraints;
          // Create a regex to match exactly the expected number of digits
          const regex = new RegExp(`^\\d{${expectedDigitCount}}$`);
          // Check if the value is a string and matches the regex
          return typeof value === 'string' && regex.test(value);
        },
        // Custom error message
        defaultMessage(args: ValidationArguments) {
          const [expectedDigitCount] = args.constraints;
          return `${args.property} must be a ${expectedDigitCount}-digit number`;
        },
      },
    });
  };
}
