import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { createClient, updateClient } from '../../service/apicall';
import { toast } from 'react-toastify';

export default function CreateClientMode({ setOpen, funcCallAfterUpdate, editClient, seteditClient }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    mobile: '',
    email: '',
    pincode: '',
    gst: '',
  });

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      mobile: '',
      email: '',
      pincode: '',
      gst: '',
    });
    seteditClient({})
  };

  // ✅ Submit form
  const createClientFunc = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      let data="" 
      let toastMessage=""
      if(!editClient._id){
          data = await createClient(payload);
          toastMessage="Added Successfully"
      }else{
          data = await updateClient(payload,editClient._id);
          toastMessage="Update Successfully"
      }
      console.log("data", data);

      if (data.status === 200) {
        funcCallAfterUpdate();
        toast.success(toastMessage);
        resetForm();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Prepopulate form when editing
  useEffect(() => {
    if (editClient?._id) {
      setFormData({
        name: editClient.name || '',
        address: editClient.address || '',
        mobile: editClient.mobile || '',
        email: editClient.email || '',
        pincode: editClient.pincode || '',
        gst: editClient.gst || '',
      });
    }
  }, [editClient]);

  return (
    <div className='border border-gray-300 rounded shadow'>
      <Typography fontSize={22} className='text-center p-4'>Add Client</Typography>

      <form onSubmit={createClientFunc}>
        <div className='my-2 w-full px-5'>
          <TextField
            required
            value={formData.name}
            onChange={handleChange}
            name="name"
            label="Name"
            variant="outlined"
            className='w-full'
            inputProps={{ maxLength: 70 }}
          />
        </div>

        <div className='my-2 px-5'>
          <TextField
            required
            value={formData.address}
            onChange={handleChange}
            name="address"
            label="Address"
            variant="outlined"
            className='w-full'
            inputProps={{ maxLength: 70 }}
          />
        </div>

        <div className='my-2 px-5'>
          <TextField
            required
            value={formData.pincode}
            onChange={handleChange}
            name="pincode"
            label="Pincode"
            variant="outlined"
            className='w-full'
            inputProps={{ maxLength: 6 }}
          />
        </div>

        <div className='my-2 px-5'>
          <TextField
            value={formData.mobile}
            onChange={handleChange}
            name="mobile"
            label="Mobile"
            variant="outlined"
            className='w-full'
            inputProps={{ maxLength: 10, pattern: "^[0-9]{10}$" }}
          />
        </div>

        <div className='my-2 px-5'>
          <TextField
            required
            value={formData.email}
            onChange={handleChange}
            name="email"
            type="email"
            label="Email"
            variant="outlined"
            className='w-full'
            inputProps={{
              pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
            }}
          />
        </div>

        <div className='my-2 px-5'>
          <TextField
            value={formData.gst}
            onChange={handleChange}
            name="gst"
            label="GST"
            variant="outlined"
            className='w-full'
            inputProps={{
              pattern: "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$",
            }}
          />
        </div>

        <div className='px-5 my-3 flex justify-center'>
          <Button variant="contained" type='submit'>Submit</Button>
          <Button variant="contained" style={{marginLeft:"20px"}} onClick={resetForm}>Clear</Button>

        </div>
      </form>
    </div>
  );
}
