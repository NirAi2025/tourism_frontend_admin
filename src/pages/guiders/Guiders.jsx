import React, { useEffect, useState } from 'react'
import BreadCrames from '../../component/BreadCrames'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { GetGuiders } from '../../api/apiService';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { NavLink } from 'react-router-dom';
import SkeltonLoader from '../../component/SkeltonLoader';

const Guiders = () => {

  const [listdata, setListData] = useState([])
  const [loading, setLoading] = useState(false)




  const GetData = async ()=>{
    setLoading(true)
      try {
    const res = await GetGuiders();
      setLoading(false)
    if(res?.data?.success){
      setListData(res?.data?.data)
    }
  
  } catch (err) {
    console.error(err.message);
      setLoading(false)
  }


  }

useEffect(()=>{
  GetData()
},[])






  return (
    <div>
        <BreadCrames text="Guiders" />
        {loading ? 
              <SkeltonLoader />
              :
             <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sl</TableCell>
            <TableCell >Name</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >Phone</TableCell>
            <TableCell >Status</TableCell>
            <TableCell >Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {listdata?.map((item, index)=>{
          return (
              <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                 <TableCell component="th" scope="row">
               {index + 1}
              </TableCell>
              <TableCell>
               {item?.name}
              </TableCell>
              <TableCell > {item?.email}</TableCell>
              <TableCell>+ {item?.country_code}, {item?.phone}</TableCell>
              <TableCell>
                <Button variant="outlined" size="small" color="error">
                    Pending
                    </Button>
          </TableCell>
          <TableCell>
            <NavLink to={`/guiders/${item?.id}`}><RemoveRedEyeIcon /></NavLink>
          </TableCell>
            </TableRow>
          )
         })}
          
        
        </TableBody>
      </Table>
     
    </TableContainer>
      }
     
     
    </div>
  )
}

export default Guiders