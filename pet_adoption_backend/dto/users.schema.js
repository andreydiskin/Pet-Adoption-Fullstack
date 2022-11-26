const yup = require("yup");

let userRegistrationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
      "Password is not STRONG enough-should contain letters and number!"
    )
    .required("Password is required"),
  firstName: yup
    .string("Enter your first name.")
    .required("First Name is required!"),
  lastName: yup
    .string("Enter your last name.")
    .required("Last Name is required!"),
  phoneNumber: yup
    .string("Enter your phone number")
    .required("Phone number is required"),
  bio: yup.string("Bio have to be a string"),
});

let userLoginSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
      "password is not STRONG enough-should contain letters and number!"
    ),
});

let userUpdateSchema = yup.object({
  email: yup.string("Enter your email").email("Enter a valid email"),
  password: yup
    .string("Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
      "password is not STRONG enough-should contain letters and number!"
    ),
  firstName: yup.string("Enter your first name."),
  lastName: yup.string("Enter your last name."),
  phoneNumber: yup
    .string("enter your phone number")
    .required("phone number is required"),
  bio: yup.string("enter your phone number"),
});

module.exports = {
  userRegistrationSchema,
  userLoginSchema,
  userUpdateSchema,
};
