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
      const res = await axios.get("http://127.0.0.1:5000/store");
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
   <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
   <Global />

























        
      {
      
      
      
// const { register, handleSubmit, setValue, setFocus} = useForm();

// const onSubmit = (e) => {
//   console.log(e)
// }


// const checkCEP =(e) => {
//   const cep = e.target.value.replace(/\D/g, '');
//   fetch(`https://viacep.com.br/ws/${cep}/json/`)
//   .then(res => res.json()).then(data => {
//     setValue('rua', data.logradouro);
//     setValue('bairro', data.bairro);
//     setValue('cidade', data.localidade);
//     setValue('uf', data.uf);
//     setFocus('numero')



//   })
// }
      
      
      
      
      
      
      
      /* <form onSubmit = {handleSubmit(onSubmit)}>

    
   <label>
    CEP:
    <input type='text' {...register("cep")} onBlur={checkCEP}/>
   </label>

    <label>
      Rua:
      <input type='text' {...register("rua")}/>
    </label>
      
      <label>
        Número:
        <input type='text' {...register("numero")}/>
      </label>
      

        <label>
          Bairro:
          <input type='text' {...register("bairro")}/>
        </label>
                
          <label>
            Cidade:
            <input type='text' {...register("cidade")}/>
          </label>

            <label>
              Estado:
              <input type='text' {...register("uf")}/>
            </label>

        <div>   
        <button type='submit'>Enviar</button>
        </div>


   </form> */}
     
    </>

 
  );
}

export default App;
