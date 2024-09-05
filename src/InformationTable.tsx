import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './InformationTable.css'
import ButtonComponent from './Button';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

const InformationData = () => {
    const [data,setData] = useState<User[]>([]);
    const [curretPage, setCurrentPage] = useState(1)


    useEffect(()=>{
        fetchData();
    }, []);

    const fetchData = async() => {

        try {
            const tableData = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
            //console.log(tableData.data);
            setData(tableData.data)
        } catch (error) {
            console.log(error);
        }
    }


    //pagination control logic
    const indexPerpage = 10
    const totalPage = Math.ceil(data.length/indexPerpage);
    //console.log("total page  =====>", totalPage);
    const indexOfLastItem = curretPage * indexPerpage;
    const indexOfFirstItem = indexOfLastItem - indexPerpage;
    const currentItems:User[] = data.slice(indexOfFirstItem,indexOfLastItem);
    console.log("current page item are",currentItems);

    //console.log('get data from api ===>',data)


    const nextPage = () => {
        if(curretPage<totalPage) {
            setCurrentPage(curretPage + 1)
        }
        else {
            alert('You are in the last page');
        }
    }

    const prevPage = () => {
        if(curretPage>1) {
            setCurrentPage(curretPage - 1);
        }
        else {
            alert('You vist in the first page');
        }
    }


    return(
        <>
         <div className='tableContainer'>
            <h1>Information Data</h1>
            <table className='dataTable'>
                <thead>
                    <tr className='tableHead'>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>

                <tbody>
                    {currentItems.map((item) => (
                        <tr key={item.id} className='tableRow'>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <div className='buttonConteiner'>
                {/* <button onClick={prevPage}> Previous </button> */}
                <ButtonComponent lable = 'Previous' onClick = {prevPage} />
                 <span>{curretPage}</span>
                {/* <button onClick={nextPage}> Next </button> */}
                <ButtonComponent lable = 'Next' onClick = {nextPage}/>
            </div>
         </div>
        </>
    )
}

export default InformationData;