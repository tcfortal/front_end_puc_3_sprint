import { useEffect, useState } from 'react';
import axios from 'axios';
import {format} from "date-fns"
import React from 'react';
import {useForm} from 'react-hook-form'
import Global from './styles/global';
import styled from "styled-components"
import { toast, ToastContainer } from  "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Form from './components/Form';
import Grid from "./components/Grid";
import Form2 from './components/Form2';



const Container = styled.div`
width: 100%;
max-width: 800px;
margin-top: 20px;
display: flex;
flex-direction: column;
align-items: center;
gap: 10px;
`;


const Title = styled.h2`
`;




function App() { 

  const [stores, setStores] = useState([]);
  const [onEdit, setOnEdit] = useState(null);


  const getStores = async () => {
    try{
      const res = await axios.get("http://127.0.0.1:5005/store");
      setStores(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    getStores();
  }, [setStores])

  return (
    <>

    <Container>
    <Title> USUÁRIOS</Title>
    <Form onEdit={onEdit} setOnEdit={setOnEdit} getStores={getStores} />
    <Grid stores={stores} setStores={setStores} setOnEdit={setOnEdit} />
    </Container>
    <Container>
      
    </Container>
   <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
   <Global />

     </>

 
  );
}

export default App;
