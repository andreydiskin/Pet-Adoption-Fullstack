const yup = require("yup");

petTypeRegex = /Dog|Cat|Fish|Hamster|Turtle/;
petStatusRegex = /Adopted|Fostered|Available/;
let petsSchema = yup.object({
  restiction: yup
    .string("Dietary restrictions must be a string")
    .required("Must have Dietary restrictions field"),
  color: yup.string("Color must be a string").required("Must have a color"),
  breed: yup.string("Breed must be a string").required("Must have breed field"),

  bio: yup.string("Bio must be a string").required("Must have a bio"),
  hypoallergenic: yup
    .boolean("Hypoallergenic must be a true/false")
    .required("Hypoallergenic is required"),
  pic: yup.mixed().required("Picture is required"),
  type: yup
    .string("Has to be a string")
    .matches(
      petTypeRegex,
      "Type must be one of the Dog,Cat,Fish,Hamster,Turtle"
    )
    .required("Adoption Status is required"),
  height: yup
    .number("Only numbers")
    .positive("Must be a positive number")
    .required("Height is required"),
  weight: yup
    .number("Only numbers")
    .positive("Must be a positive number")
    .required("Weight is required"),
  adoptionStatus: yup
    .string("Has to be a string")
    .matches(
      petStatusRegex,
      "AdoptionStatus must be one of the Adopted,Fostered,Available"
    )
    .required("Adoption Status is required"),
  petName: yup
    .string("Has to be name")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .required("Height is required"),
});

let petsSchemaUpdate = yup.object({
  restiction: yup.string("Dietary restrictions must be a string"),
  color: yup.string("Color must be a string"),
  breed: yup.string("Breed must be a string"),

  bio: yup.string("Bio must be a string"),
  hypoallergenic: yup.boolean("Hypoallergenic must be a true/false"),
  pic: yup.mixed(),
  type: yup
    .string("Has to be a string")
    .matches(
      petTypeRegex,
      "Type must be one of the Dog,Cat,Fish,Hamster,Turtle"
    ),
  height: yup.number("Only numbers").positive("Must be a positive number"),
  weight: yup.number("Only numbers").positive("Must be a positive number"),
  adoptionStatus: yup
    .string("Has to be a string")
    .matches(
      petStatusRegex,
      "AdoptionStatus must be one of the Adopted,Fostered,Available"
    ),
  petName: yup
    .string("Has to be name")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
});

const petStatusAdoptRegex = /Adopted|Fostered/;

let adoptOrFoster = yup.object({
  adoptionStatus: yup
    .string("Has to be a string")
    .matches(
      petStatusAdoptRegex,
      "AdoptionStatus must be one of the Adopted,Fostered,Available"
    )
    .required("Adoption Status is required"),
});
module.exports = { petsSchema, petsSchemaUpdate, adoptOrFoster };
