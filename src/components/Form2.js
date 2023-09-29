import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";



const Label = styled.label`
display: flex;
align-items: flex-end;
gap: 5px;
background-color: #fff;
padding: 5px;
box-shadow: 0px 0px 5px #ccc;
border-radius: 5px;
`;





const Form2 = () => {

    const {register, handleSubmit, setValue} = useForm();

    const onSubmit =(e) => {
        console.log(e);

    }

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

    return(
 <form onSubmit={handleSubmit(onSubmit)}>
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
        <input type="text" name="cidade " {...register("cidade")}/>
        </Label>
    <Label>
        Estado:
        <input type="text" {...register("estado")}/>
        </Label>

 </form>

    );
}

export default Form2;