import { MdModeEdit } from "react-icons/md";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";
const EditButtonNav = () => {
    const { user } = useUser();
    const [isTutor, setIsTutor] = useState(false);
    useEffect(() => {
        const email = String(user?.primaryEmailAddress);
        axios
          .post("http://localhost:3001/findTutor", { email })
          .then((response) => {
            if (response.data === "found") {
              setIsTutor(true);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }, [user]);

    if (!isTutor){
        return;
    }
    return (
        <MdModeEdit className='nav-icons'/>
    );
}
export default EditButtonNav;
