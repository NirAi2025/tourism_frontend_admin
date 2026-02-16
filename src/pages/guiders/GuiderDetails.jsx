import React, { useEffect, useState } from 'react'
import BreadCrames from '../../component/BreadCrames'
import { useParams } from 'react-router-dom'
import { GetGuidersDetails } from '../../api/apiService'
import { Box, Card, CardContent, Grid, styled, Typography } from '@mui/material'
import moment from 'moment/moment'
import SkeltonLoader from '../../component/SkeltonLoader'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Modal } from 'react-bootstrap'

const GuiderDetails = () => {

  const [details, setDetails] = useState("")
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = React.useState('panel1');
  const [open, setOpen] = React.useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

   const handleChange =
    (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    let {id} = useParams()


  const GetData = async ()=>{
    setLoading(true)
      try {
    const res = await GetGuidersDetails(id);
      setLoading(false)
    if(res?.data?.success){
        setDetails(res?.data?.data)
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
         <BreadCrames text="Guiders Details" />
         {loading ? 
        <SkeltonLoader /> 
        :
        
         <Grid container spacing={2}>
            <Grid size={5}>
                <Card>      
      <CardContent>
           <div className='profile-view d-flex gap-3 align-items-start mb-4'>
                <img src={details?.guide_public_profile?.profile_photo} width="100" />
                <div>
                    <h5>{details?.name}</h5>
                     <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {details?.email}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    + {details?.country_code}, {details?.phone}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {moment(details?.profile?.dob).format('DD-MM-YYYY')}
                   
                    </Typography>
                </div>
            </div>
            <h6>Bio</h6>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {details?.guide_public_profile?.bio}
            </Typography>
      </CardContent>
   
    </Card>
             
            </Grid>
            <Grid size={7}>
            
       <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography component="span">
           Personal Profile Information
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className='others-view'>

<div className='form-group'>
                        <strong>Preferred Communication Language</strong>
                        <p>{details?.language_id}</p>
                    </div>
                    <div className='form-group'>
                        <strong>Nationality</strong>
                        <p>{details?.profile?.nationality_country?.name}</p>
                    </div>
                    <div className='form-group'>
                        <strong>Country of Operation</strong>
                        <p>{details?.profile?.tour_country?.name}</p>
                    </div>
         
                    <div className='form-group'>
                        <strong>Primary City</strong>
                        <p>{details?.profile?.base_city?.name}</p>
                    </div>
                    <div className='form-group'>
                        <strong>Years of Experience</strong>
                        <p>{details?.profile?.years_of_experience == null ? 'Not provided' : details?.profile?.years_of_experience}</p>
                    </div>
                    <div className='form-group'>
                        <strong>WhatsApp Number</strong>
                        <p>{details?.whatsapp_number == "" ? 'Not provided' : details?.whatsapp_number}</p>
                    </div>
                   

                </div>
        </AccordionDetails>
      </Accordion>
               <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography component="span">
            Identity Verification
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
            <div className='others-view'>
                {details?.guide_identities?.map((item,i)=>{
                    return (
                          <div className='form-group' key={i}>
                        <strong>{item?.document_category} {item?.document_category === 'government_id' && ('--Id No:' + item?.document_number)} </strong>
                        <div className='document-status'>
                         <object data={item?.document_file}  width="300" height="200"> </object>
                         <a href={item?.document_file} download target='_blank' className='btn btn-sm btn-warning'>Download</a>
                         {item?.document_category === 'government_id' &&
                         <button className='btn btn-sm btn-primary' onClick={()=>handleOpen(true)}>Status Update</button>
                }
                        </div>
                 
                    </div>
                    )
                   
                })}

                   
                </div>
        </AccordionDetails>
      </Accordion>
         <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography component="span">
            Tourism Licenses & Official Permissions
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
            <div className='others-view'>
                {details?.guide_licenses?.map((item,i)=>{
                    return (
                          <div className='form-group' key={i}>
                        <strong>{item?.license_type}  </strong>
                        <div className='document-status'>
                         <object data={item?.document_file}  width="300" height="200"> </object>
                         <a href={item?.document_file} download target='_blank' className='btn btn-sm btn-warning'>Download</a>
                         <button className='btn btn-sm btn-primary'>Status Update</button>
                        </div>
                 
                    </div>
                    )
                   
                })}

                   
                </div>
        </AccordionDetails>
      </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography component="span">
           Insurance & Emergency Information
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className='others-view'>                   
                    <div className='form-group'>
                        <strong>Insurance Provider Name</strong>
                        <p>{details?.guide_insurance?.insurance_provider == null ? "Not Provided" : details?.guide_insurance?.insurance_provider}</p>
                    </div>
                     <div className='form-group'>
                        <strong>Policy Number</strong>
                        <p>{details?.guide_insurance?.policy_number == null ? "Not Provided" : details?.guide_insurance?.policy_number}</p>
                    </div>
                    <div className='form-group'>
                        <strong>Policy Expiry Date</strong>
                        <p>{details?.guide_insurance?.policy_expiry_date == null ? "Not Provided" : moment(details?.guide_insurance?.policy_expiry_date).format('DD-MM-YYYY')}</p>
                    </div>
                    <div className='form-group'>
                        <strong>Emergency Contact Name</strong>
                        <p>{details?.guide_insurance?.emergency_contact_name == null ? "Not Provided" : details?.guide_insurance?.emergency_contact_name}</p>
                    </div>
                     <div className='form-group'>
                        <strong>Emergency Contact Phone</strong>
                        <p>{details?.guide_insurance?.emergency_contact_phone == null ? "Not Provided" : details?.guide_insurance?.emergency_contact_phone}</p>
                    </div>
                     <div className='form-group'>
                        <strong>Personal Liability Insurance</strong>
                        <p>{details?.guide_insurance?.personal_liability_insurance == null ? "Not Provided" :
                          <object data={details?.guide_insurance?.personal_liability_insurance}  width="300" height="200"> </object>
                        }</p>
                    </div>
                </div>
        </AccordionDetails>
      </Accordion>  
       <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Typography component="span">
           Languages & Skills
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className='others-view'>  
              <div className='form-group'>
                        <strong>Languages Spoken</strong>
                          <p>
                        {details?.guide_languages?.map((item,i)=>{
                        
                            return (
                                <span key={i}>{item?.language?.name},</span>
                            )
                        })}
                        </p>
                    </div>                 
                     
                        {details?.guide_certifications?.map((item,i)=>(
                              <div className='form-group' key={i}>
                        <strong>{item?.certification_type}  </strong>
                        <div className='document-status'>
                         <object data={item?.certificate_file}  width="300" height="200"> </object>
                         <a href={item?.certificate_file} download target='_blank' className='btn btn-sm btn-warning'>Download</a>
                       
                        </div>
                 
                    </div>
                        ))}
                        
                    
                </div>
        </AccordionDetails>
      </Accordion> 
       <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6bh-content"
          id="panel6bh-header"
        >
          <Typography component="span">
           Banking & Payout Information
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className='others-view'>                   
                    <div className='form-group'>
                        <strong>Account Holder Name </strong>
                        <p>{details?.guide_payout_account?.account_holder_name == null ? "Not Provided" : details?.guide_payout_account?.account_holder_name}</p>
                    </div>
                     <div className='form-group'>
                        <strong>Account Number</strong>
                        <p>{details?.guide_payout_account?.account_number == null ? "Not Provided" : details?.guide_payout_account?.account_number}</p>
                    </div>
                    <div className='form-group'>
                        <strong>Bank Name</strong>
                        <p>{details?.guide_payout_account?.bank_name == null ? "Not Provided" : details?.guide_payout_account?.bank_name}</p>
                    </div>
                    <div className='form-group'>
                        <strong>IFSC / SWIFT / BIC Code</strong>
                        <p>{details?.guide_payout_account?.routing_code == null ? "Not Provided" : details?.guide_payout_account?.routing_code}</p>
                    </div>
                     <div className='form-group'>
                        <strong>Payout Method</strong>
                        <p>{details?.guide_payout_account?.payout_method == null ? "Not Provided" : details?.guide_payout_account?.payout_method}</p>
                    </div>
                     <div className='form-group'>
                        <strong>Payout Currency</strong>
                        <p>{details?.guide_payout_account?.payout_currency == null ? "Not Provided" : details?.guide_payout_account?.payout_currency}</p>
                    </div>
                      <div className='form-group'>
                        <strong>Tax Residency Country</strong>
                        <p>{details?.guide_payout_account?.tax_residency_country_id == null ? "Not Provided" : details?.guide_payout_account?.tax_residency_country?.name}</p>
                    </div>
                      <div className='form-group'>
                        <strong>Individual Tax ID</strong>
                        <p>{details?.guide_payout_account?.tax_id == null ? "Not Provided" : details?.guide_payout_account?.tax_id}</p>
                    </div>
                </div>
        </AccordionDetails>
      </Accordion>     
            </Grid>
           
            </Grid>
}
<Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Documents Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Here you can update the status of the document and provide feedback to the guider if necessary.</p>
          <div className='form-group mb-3'>
            <label htmlFor="status">Document Status</label>
            <select className='form-control' id="status">
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className='form-group mb-3'>
            <label htmlFor="feedback">Feedback (optional)</label>
            <textarea className='form-control' id="feedback" rows="3"></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default GuiderDetails