import React, {useState} from "react";
import {  useQuery } from '@apollo/client';
import { USER_QUERY} from "../utils/queries";
import { Container } from '@mui/material';
import ModalButton from '../components/DashboardModal/Button';
import ModalComponent from '../components/DashboardModal/DashboardModal'



const UserDashboard = () => {
    const { loading, data } = useQuery(USER_QUERY); // loading is set to ? initally, once we get data back loading is then set to ?
    const userData = data?.user || []; // when loading is equal to true, the data from the user query is then return to userData
    const [isModalOpen, setIsModalOpen] = useState(false);
    //
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
    //
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    if (loading) {
        return <h2>LOADING...</h2>;
      }
    return (
        <Container maxWidth="sm">
            <ModalButton openModal={handleOpenModal} />
            <ModalComponent handleOpen={isModalOpen} handleClose={handleCloseModal} />
        </Container>
    )
};

export default UserDashboard;