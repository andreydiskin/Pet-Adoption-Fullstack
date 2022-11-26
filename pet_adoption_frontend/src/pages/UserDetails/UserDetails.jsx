import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OwnerPetsGrid from "../../components/common/OwnerPetsGrid";
import UserTable from "../../components/common/UserTable/UserTable";
import { useState } from "react";
import {
  getFullUserDataService,
  getUserPetsAll,
} from "../../services/usersApiCalls";
import Loader from "../../components/common/Loader/Loader";
import { toastContext } from "../../context/toastContext";

export default function UserDetails() {
  const [user, setUser] = useState(null);
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { openToast } = useContext(toastContext);
  const { id } = useParams();
  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        await getFullUserDataService(id, setUser);
        await getUserPetsAll(id, setPets);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);

        openToast(error.message, "error");
      }
    };

    getUser();
  }, []);

  const navigate = useNavigate();
  const userHeaders = [
    "Id",
    "Email",
    "First Name",
    "Last Name",
    "Phone Number",
    "Bio",
  ];

  const goToPetPage = (id) => {
    navigate(`/search/${id}`);
  };

  if (!user || isLoading) {
    return <Loader />;
  }

  const tableData = [
    user._id,
    user.email,
    user.firstName,
    user.lastName,
    user.phoneNumber,
    user.bio,
  ];
  return (
    <div>
      <UserTable data={tableData} headers={userHeaders} id={id} />
      <OwnerPetsGrid
        showStatus={false}
        userDogs={pets.own}
        redirectCallback={goToPetPage}
        noDataMsg="This user currently have no pets"
        gridColumns={3}
      />
    </div>
  );
}
