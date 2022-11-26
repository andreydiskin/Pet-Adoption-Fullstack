import React, { useState, useEffect, useContext } from "react";
import "./EditPetPage.css";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { CardMedia } from "@mui/material";
import MyForm from "../../components/common/myForm/MyForm";
import * as yup from "yup";
import { uploadImage } from "../../services/apicalls";
import { imagesBaseUrl, seeMorePetBaseUrl } from "../../Lib/config";
import Loader from "../../components/common/Loader/Loader";
import { getPetByIdService, updatePetById } from "../../services/petsApiCalls";
import { toastContext } from "../../context/toastContext";

export default function EditPetPage() {
  let { id } = useParams();
  const { openToast } = useContext(toastContext);
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const getPetById = async () => {
      try {
        await getPetByIdService(id, setPet);
      } catch (error) {
        openToast(error.message, "error");
      }
    };
    getPetById();
  }, [id]);

  const chooseFile = async (e) => {
    try {
      const imgName = await uploadImage(e.target);
      await updatePetById(id, { pic: imgName }, setPet);
      openToast("Image uploaded", "success");
      return imgName;
    } catch (error) {
      openToast(error.message, "error");
    }
  };

  const updatePet = async (data) => {
    try {
      await updatePetById(id, data, setPet);
      openToast("Pet updated", "success");
      navigate(seeMorePetBaseUrl + id);
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
      label: "Type ",
    },
    {
      options: [
        { value: "Fostered", optionName: "foster" },
        { value: "Adopted", optionName: "adopted" },
        { value: "Available", optionName: "available" },
      ],
      type: "select",
      ref: "adoptionStatus",
      label: "Adoption Status ",
    },
    { onFilePick: chooseFile, type: "file", ref: "pic", label: "Picture" },
    { type: "text", ref: "breed", label: "Breed" },
    { type: "text", ref: "color", label: "Color" },
    {
      options: [
        { value: true, optionName: "yes" },
        { value: false, optionName: "no" },
      ],
      type: "select",
      ref: "hypoallergenic",
      label: "Hypoallergenic ",
    },
    { type: "text", ref: "bio", label: "Bio" },
    { type: "text", ref: "restiction", label: "Restriction" },
  ];

  const petTypeRegex = /Dog|Cat|Fish|Hamster|Turtle/;
  const petStatusRegex = /Adopted|Fostered|Available/;
  let petsSchema = yup.object({
    restiction: yup
      .string("Dietary restrictions must be a string")
      .required("Must have Dietary restrictions field"),
    color: yup.string("Color must be a string").required("Must have a color"),
    breed: yup
      .string("Breed must be a string")
      .required("Must have breed field"),

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
      .required("Type is required"),
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
      .required("Pet's name is required"),
  });

  if (!pet) {
    return <Loader />;
  }
  return (
    <>
      <CardMedia
        component="img"
        className="editPagePetImg"
        image={imagesBaseUrl + pet.pic}
        alt="green iguana"
      />
      <Box className="editPetFormCon">
        <MyForm
          validationSchema={petsSchema}
          header={"Edit Pet"}
          inputs={inputs}
          submitMsg={"save"}
          deafultConfig={pet}
          callback={updatePet}
        />
      </Box>
    </>
  );
}
