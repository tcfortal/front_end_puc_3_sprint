import axios from "axios";
import React, {useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify"
import { useForm } from "react-hook-form";

const FormContainer = styled.form`
display: block;
align-items: flex-end;
gap: 20px;
flex-wrap: wrap;
background-color: #fff;
padding: 10px;
box-shadow: 0px 0px 5px #ccc;
border-radius: 5px;
`;


const InputArea = styled.div`
display: flex;
flex-direction: column;


`;

const Input = styled.input`
width: 120px;
padding: 0 80px;
border: 1px solid #bbb;
border-radius: 5px;
height: 40px;

`;




const Label = styled.label`
display: flex;
align-items: flex-end;
gap: 5px;
background-color: #fff;
padding: 5px;
box-shadow: 0px 0px 5px #ccc;
border-radius: 5px;
`;


const Button = styled.button`
padding: 10px;
width: 40%;
cursor: pointer;
border-radius: 5px;
border: none;
background-color: #2c73d2;
color: white;
height: 42px;
margin: 10px 15px 10px 83px;
`;

const Form = ({getStores, onEdit, setOnEdit}) => {

    const {register, setValue} = useForm();

    const checkCEP = (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        console.log(cep)
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json()).then(data => {
            console.log(data);
            setValue('rua', data.logradouro);
            setValue('bairro', data.bairro);
            setValue('cidade', data.localidade);
            setValue('estado', data.uf);

      
        });
      }



    const ref = useRef();

    useEffect(() => {
        if (onEdit){
            const store = ref.current;

            store.name.value = onEdit.name;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const store = ref.current;
     

        if(
            !store.name.value
        ){
            return toast.warn("preencha todos os campos")
        }

        if (onEdit) {
            await axios.put("http://127.0.0.1:5005/store/" + onEdit.id, {
                name: store.name.value
            }).then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        } else {
           const cidade = document.getElementById("cidade").value
            await axios.post("http://127.0.0.1:5005/store", {
                name: store.name.value,
                complemento: cidade
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        }

        store.name.value = "";

        setOnEdit(null)
        getStores();


    };
    

    return(
        
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            
            <InputArea>
              <Label>Nome</Label>
              <Input name="name" />
            </InputArea>

           
         
            
    <Label>
        CEP:
        <input type="text" {...register("cep")} onBlur={checkCEP}/>
    </Label>
    <Label>
        Rua:
        <input type="text" {...register("rua")}/>
        </Label>
    <Label>
        Numero:
        <input type="text" {...register("numero")}/>
        </Label>
    <Label>
        Bairro:
        <input type="text" {...register("bairro")}/>
        </Label>
    <Label>
        Cidade:
        <input type="text" id="cidade"{...register("cidade")}/>
        </Label>
    <Label>
        Estado:
        <input type="text" {...register("estado")}/>
        </Label>


          
            <Button type="submit"> SALVAR </Button>
       
        </FormContainer>

       
    );
}

export default Form;