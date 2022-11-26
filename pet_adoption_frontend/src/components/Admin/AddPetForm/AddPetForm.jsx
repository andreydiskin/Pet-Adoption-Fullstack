import React, { useContext } from "react";
import MyForm from "../../common/myForm/MyForm";
import * as yup from "yup";
import { uploadImage } from "../../../services/apicalls";
import { useNavigate } from "react-router-dom";
import { addPetService } from "../../../services/petsApiCalls";
import { toastContext } from "../../../context/toastContext";

export default function AddPetForm() {
  const navigate = useNavigate();
  const { openToast } = useContext(toastContext);

  const chooseFile = async (e) => {
    try {
      const imgName = uploadImage(e.target);
      openToast("Image uploaded", "success");
      return imgName;
    } catch (error) {
      openToast(error.message, "error");
    }
  };

  const addPet = async (data) => {
    try {
      await addPetService(data, (id) => navigate(`/search/${id}`));
      openToast("Pet added", "success");
    } catch (error) {
      openToast(error.message, "error");
    }
  };
  const inputs = [
    { type: "text", ref: "petName", label: "Pet Name" },
    { type: "number", ref: "height", label: "Height" },
    { type: "number", ref: "weight", label: "Weight" },
    {
      options: [
        { optionName: "dog", value: "Dog" },
        { optionName: "cat", value: "Cat" },
        { optionName: "fish", value: "Fish" },
        { optionName: "hamster", value: "Hamster" },
        { optionName: "turtle", value: "Turtle" },
      ],
      type: "select",
      ref: "type",
      label: "Type",
    },
    {
      options: [
        { optionName: "foster", value: "Fostered" },
        { optionName: "adopted", value: "Adopted" },
        { optionName: "available", value: "Available" },
        ,
      ],
      type: "select",
      ref: "adoptionStatus",
      label: "Adoption Status",
    },
    { onFilePick: chooseFile, type: "file", ref: "pic", label: "Picture" },
    { type: "text", ref: "breed", label: "Breed" },
    { type: "text", ref: "color", label: "Color" },
    {
      options: [
        { optionName: "yes", value: true },
        { optionName: "no", value: false },
      ],
      type: "select",
      ref: "hypoallergenic",
      label: "Hypoallergenic",
    },
    { type: "text", ref: "bio", label: "Bio" },
    { type: "text", ref: "restiction", label: "Restriction" },
  ];

  const configInputs = {
    petName: "",
    height: "",
    weight: "",
    type: "",
    adoptionStatus: "",
    pic: [],
    breed: "",
    color: "",
    hypoallergenic: "",
    bio: "",
    restiction: "",
  };

  const petTypeRegex = /Dog|Cat|Fish|Hamster|Turtle/;
  const petStatusRegex = /Adopted|Fostered|Available/;
  let petsSchema = yup.object({
    restiction: yup
      .string("Dietary restrictions must be a string")
      .required("Must have Dietary restrictions field"),
    color: yup.string("Color must be a string").required("must have a color"),
    breed: yup
      .string("Breed must be a string")
      .required("Must have breed field"),

    bio: yup.string("Bio must be a string").required("Must have a bio"),
    hypoallergenic: yup
      .boolean("Hypoallergenic must be a yes/no")
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
      .string("has to be name")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .required("The pet's name is required"),
  });

  return (
    <MyForm
      validationSchema={petsSchema}
      header={"Add pet"}
      inputs={inputs}
      submitMsg={"Submit"}
      deafultConfig={configInputs}
      callback={addPet}
    />
  );
}
