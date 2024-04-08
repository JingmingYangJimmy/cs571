import { Button, Container, Form, Row } from "react-bootstrap";
import React, { useState, useEffect } from 'react'; 
import Student from "./Student";
import { Col,Pagination } from 'react-bootstrap';  


const Classroom = () => {
    const [students, setStudents] = useState([]);
    const [shownStudents, setShownStudents] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchMajor, setSearchMajor] = useState("");
    const [searchInterest, setSearchInterest] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 24;

    const resetSearch = () => {
        setSearchName("");
        setSearchMajor("");
        setSearchInterest("");
        setShownStudents(students); // display all students
        setCurrentPage(1); // ** Reset to page 1
    };
    const totalPages = Math.ceil(shownStudents.length / itemsPerPage); 
 
    
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    }
    
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    }


    useEffect(() =>{
        
            const fetchStudents =fetch("https://cs571.org/api/f23/hw4/students",{
                headers:{
                    'X-CS571-ID': 'bid_5bea493b1f9dbf184ad489e0df83d3635ebd1fa40eeae35c9d810f986d39fe13'
                }
            })
            .then(response=>
                response.json())
            .then(data=>{
                setStudents(data);
            })
        },[])

        useEffect(()=>{
            const filteredStudents= students.filter(student=>(
                (student.name.first.toLowerCase()+" "+student.name.last.toLowerCase()).includes(searchName.trim().toLowerCase())&&
                student.major.toLowerCase().includes(searchMajor.trim().toLowerCase())&&
                student.interests.some(interest => interest.toLowerCase().
                includes(searchInterest.trim().toLowerCase()))
            )  
            )
        setShownStudents(filteredStudents);
        setCurrentPage(1);
    }, [searchName, searchMajor, searchInterest, students]);
        
    
    
   

    return <div>
        <h1>Badger Book - Fall 2023</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName"
            value={searchName}
            onChange={(e)=>setSearchName(e.target.value)}/>

            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor"
            value={searchMajor}
            onChange={(e)=>setSearchMajor(e.target.value)}/>

            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest"
            value={searchInterest}
            onChange={(e)=>setSearchInterest(e.target.value)}/>
            <br />
            <Button variant="neutral" onClick={resetSearch}>Reset Search</Button>
            <p>There are {shownStudents.length} student(s) matching your search.</p>
        </Form>
        <Container fluid>
            <Row>
                {shownStudents.slice((currentPage-1)*itemsPerPage,currentPage*itemsPerPage).map(student=>(
                <Col xs={12} sm={6} md={4} lg={3} xl={2} key={student.id}>
                    <Student
                        name={student.name}
                        major={student.major}
                        credit={student.numCredits}
                        isFromWI={student.fromWisconsin}
                        interests={student.interests}
                        />
                        </Col>
                ))}
            </Row>
            <Row className="justify-content-center mt-3">
                    <Pagination>
                        <Pagination.Prev onClick={handlePrevious} disabled={currentPage === 1 ||
                        shownStudents.length===0}>
                            Previous </Pagination.Prev>
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <Pagination.Item 
                                key={index}
                                active={index + 1 === currentPage}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={handleNext} disabled={currentPage === totalPages || shownStudents.length === 0} >
                            Next </Pagination.Next>
                    </Pagination>
                </Row>
        </Container>
    </div>

}

export default Classroom;