import Table from 'react-bootstrap/Table';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col,  } from 'react-bootstrap';

function App() {
   
  const [show, setShow] = useState(false);
  const [postdataOpen,setpostdataOpen]=useState("")
  const handleClose = () =>  { setShow(false); setpostdataOpen("")};
  const handleShow = () => setShow(true);
  
  const [userData, setUserData] = useState([]);
 
  const callgetApi = async () => {
    try {
      let response = await fetch("http://localhost:8000/api/", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }); 
      let data = await response.json();
      setUserData(data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  
  const deleteApi = async (id) => {
    try {
      let response = await fetch(`http://localhost:8000/api/delete/${id}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },

        method:"DELETE"
      }); 
      if (response.ok) {
        const x = await response.json();
        callgetApi();
       
      } else {
        console.error('Failed to submit data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  const UpdateApi = async (id) => {
    try { 
      const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
     
    if(!firstName || !lastName || !email){
      alert("please fill you form!")
      return;
   }
      let response = await fetch(`http://localhost:8000/api/update/${id}`, {
        headers: {
          "Content-Type": "application/json", 
          "Access-Control-Allow-Origin": "*",
        },
        
        method:"PATCH",
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email: email }),

      }); 
      if (response.ok) {
        const x = await response.json();
        callgetApi();
        handleClose();
      } else {
        console.error('Failed to submit data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setpostdataOpen("")
  }


  

  const handleSubmit = async () => {
   
    try {
      const firstName = document.getElementById('first_name').value;
      const lastName = document.getElementById('last_name').value;
      const email = document.getElementById('email').value;
      if(!firstName || !lastName || !email){
         alert("please fill you form!")
         return;
      }

      // false||false||false
      const response = await fetch('http://localhost:8000/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email: email }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Response:', responseData);
        callgetApi();
        handleClose();
      } else {
        console.error('Failed to submit data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting data:', error.message);
    }

      handleClose();
    } 

  useEffect(() => {
    callgetApi();
  }, []);


  const handleDelete=(id)=>{
    if(id){
      deleteApi(id)
    }

  }

  return (
    
    <div className="App">
        <h1>Student Management System</h1>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter User Detail</Modal.Title>
        </Modal.Header>
        <Form className="m-3" >
      <Form.Group className="mb-3" controlId="first_name">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="email" placeholder="Enter First Name" defaultValue={postdataOpen && userData?.filter((item)=>item?._id===postdataOpen
          )[0]?.first_name }/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="last_name">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Last Name" defaultValue={postdataOpen && userData?.filter((item)=>item?._id===postdataOpen
          )[0]?.last_name}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter Email Address" defaultValue={postdataOpen && userData?.filter((item)=>item?._id===postdataOpen
          )[0]?.email }/>
      </Form.Group>

      
    </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} >
            Close
          </Button>
          <Button variant="primary" onClick={()=>postdataOpen ? UpdateApi(postdataOpen): handleSubmit()}  className="ms-4 ">
          Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Table bordered >
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Roll No.</th>
          <th>Action</th>

          
        </tr>
      </thead>
      <tbody>
        {userData.map((user, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>{ "PCM" + index + 204 
            + index}</td>

            <td className='icon'>
              <FaEdit onClick={()=>{setpostdataOpen(user?._id) 
                handleShow()} } />
               <MdDeleteForever onClick={()=>handleDelete(user?._id)}/>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>  
    <Row className="justify-content-end ">
    <Col xs="auto">
      <Button variant="primary" className="my-button" style={{ marginRight: "30px" }}  onClick={handleShow}>
        ADD New Student
      </Button>
    </Col>
  </Row>
    </div>
  );
}

export default App;
