import React, { useState } from "react";
import { Button, HStack, IconButton, Input, Select, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useSearch } from "../hooks/useSearch";

const EmployeeTable = ({ data }) => {

    const [employees, setEmployees] = useState(data);
    const [sortOrder, setSortOrder] = useState("asc");
    const [gender, setGender] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSort = () => {

        const sortedEmployees = [...employees].sort((a, b) => {
            return sortOrder === 'asc' ? a.salary - b.salary : b.salary - a.salary;
        });

        setEmployees(sortedEmployees);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');

    }

    const handleDelete = (id) => {
        setEmployees(employees.filter((emp) => emp.id !== id));
    }

    const handleEdit = (id, field, value) => {

        const updatedEmployees = employees.map((emp) =>
            emp.id === id ? { ...emp, [field]: value } : emp
        );

        setEmployees(updatedEmployees);

    }

    const filterEmployees = employees.filter((emp) =>
        gender ? emp.gender === gender : true
    );

    const searchedEmployees = useSearch(filterEmployees, searchQuery);

    return (

        <>

            <HStack mb={4}>

                <Input placeholder="Search by name" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

                <Select placeholder="Filter by gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Agender">Agender</option>
                    <option value="Genderfluid">Genderfluid</option>
                </Select>

                <Button onClick={handleSort}>Sort by Salary ({sortOrder})</Button>

            </HStack>

            <Table variant="simple">

                <Thead>

                    <Tr>

                        <Th>ID</Th>
                        <Th>First Name</Th>
                        <Th>Last Name</Th>
                        <Th>Email</Th>
                        <Th>Gender</Th>
                        <Th>Salary</Th>
                        <Th>Actions</Th>

                    </Tr>

                </Thead>

                <Tbody>

                    {searchedEmployees.map((emp) => (

                        <Tr key={emp.id}>

                            <Td>{emp.id}</Td>

                            <Td>
                                <Input value={emp.first_name} onChange={(e) => handleEdit(emp.id, "first_name", e.target.value)} />
                            </Td>

                            <Td>
                                <Input value={emp.last_name} onChange={(e) => handleEdit(emp.id, "last_name", e.target.value)} />
                            </Td>

                            <Td>
                                <Input value={emp.email} onChange={(e) => handleEdit(emp.id, "email", e.target.value)} />
                            </Td>

                            <Td>{emp.gender}</Td>

                            <Td>
                                <Input value={emp.salary} onChange={(e) => handleEdit(emp.id, "salary", e.target.value)} />
                            </Td>

                            <Td>
                                <IconButton icon={<DeleteIcon />} onClick={() => handleDelete(emp.id)} aria-label="Delete" />
                            </Td>

                        </Tr>

                    ))}

                </Tbody>

            </Table>

        </>

    )

}

export default EmployeeTable;