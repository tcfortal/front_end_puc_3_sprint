import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 300%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  word-break: break-all;
  margin-top: 20%;
 
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;


export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;



const Grid = ({stores, setStores, setOnEdit}) => {

const handleEdit = (store) => {
 setOnEdit(store)
};    


const handleDelete = async (id) => {
    await axios
      .delete("http://127.0.0.1:5005/store/" + id)
    .then(({data}) => {
        const newArray = stores.filter((store) => store.id !== id);

        setStores(newArray);
        toast.success(data);

    })
    .catch(({data}) => toast.error(data));

    setOnEdit(null);
};


    return (

        <Table>
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>Complemento</Th>
                </Tr>
            </Thead>
            <Tbody>
                
            {stores.map((item, i) => (
                <Tr key={i}>
                    <Td width="30%">{item.name}</Td>
                    <Td width="30%">{item.complemento}</Td>
                
                    <Td alignCenter width="5%">
                    <FaEdit onClick={() => handleEdit(item)} />
                    </Td>
                    <Td alignCenter width="5%">
                    <FaTrash onClick={() => handleDelete(item.id)} />
                            
                        </Td>
                    </Tr>

                ))}
            </Tbody>
        </Table>
    );
}


export default Grid;