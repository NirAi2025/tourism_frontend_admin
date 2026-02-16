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
import { GetGuiders, UpdateGuiderStatus } from '../../api/apiService';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { NavLink } from 'react-router-dom';
import SkeltonLoader from '../../component/SkeltonLoader';
import { Modal } from 'react-bootstrap';

const Guiders = () => {

  const [listdata, setListData] = useState([])
  const [loading, setLoading] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [status, setStatus] = useState('1');
    const [feedback, setFeedback] = useState('');
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);




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


const UpdateHandel = async ()=>{
 

  try {
    // Call the API to update the guider status
    const payload = {
      guideId: selectedItem.id,
      status: parseInt(status),
      remarks: feedback,
    };
    const response = await UpdateGuiderStatus(payload);
    if (response?.data?.success) {
      console.log('Guider status updated successfully');
      // Optionally, you can refresh the guider list or update the UI accordingly
      GetData(); // Refresh the guider list after updating status
    } else {
      console.error('Failed to update guider status:', response?.data?.message);
    }
    console.log('API response:', response);
  } catch (error) {
    console.error('Error updating guider status:', error);
  }

  handleClose();
}




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
            <TableCell >Approve</TableCell>
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
                {item?.status == 1 ?
                  <Button variant="outlined" size="small" color="success">
                    Approved
                </Button>
                :
                  <Button variant="outlined" size="small" color="error">
                    Pending
                </Button>

              }
              
          </TableCell>
          <TableCell>
           
             <Button variant="outlined" size="small" color="primary" onClick={() => { setSelectedItem(item); handleOpen(); }}>Update Status</Button>
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
     
     <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Status Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Here you can update the status for guider listing</p>
          <div className='form-group mb-3'>
            <select className='form-control' id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="1">Approved</option>
              <option value="0">Rejected</option>
            </select>
          </div>
          <div className='form-group mb-3'>
            <label htmlFor="feedback">Feedback (optional)</label>
            <textarea className='form-control' id="feedback" rows="3" value={feedback} onChange={(e) => setFeedback(e.target.value)}></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>UpdateHandel()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Guiders