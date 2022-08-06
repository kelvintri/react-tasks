import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Flex,
  IconButton,
  Heading,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export default function TaskLists() {
  const [APIData, setAPIData] = useState([]);
  const url = "https://young-woodland-74082.herokuapp.com/tasks";

  useEffect(() => {
    axios
      .get(url)
      .then((resp) => {
        setAPIData(resp.data.data.data);
      });
  }, [APIData]);

  const setData = (data) => {
    let { id, taskname, assignee, taskdone, deadline} = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("Task Name", taskname);
    localStorage.setItem("Assignee", assignee);
    localStorage.setItem("Taskdone", JSON.stringify(taskdone));
    localStorage.setItem("Task Deadline", deadline);
    console.log(data);
  };
  const onDelete = (id) => {
    axios.delete(`https://young-woodland-74082.herokuapp.com/task/${id}`)
  }
  

  return (
    <Flex width="full" align="center" justifyContent="space-between" >
      <Box p={2} my={4} mx="auto">
        <Box textAlign='center'>
        <Heading>Task Lists</Heading>
        </Box>
        <TableContainer textAlign="center" display='flex'>
          <Table variant="striped" colorScheme="purple">
            <Thead>
              <Tr>
                <Th>Task Name</Th>
                <Th>Assignee</Th>
                <Th>TaskDone?</Th>
                <Th>Deadline</Th>
                <Th textAlign="center">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {APIData.map((data) => {
                return (
                  <Tr key={data.id}>
                    <Td>{data.taskname}</Td>
                    <Td>{data.assignee}</Td>
                    <Td>
                      <Checkbox
                        borderColor="purple"
                        colorScheme="blue"
                        isChecked={data.taskdone}
                      />
                    </Td>
                    <Td>
                      {data.deadline}
                    </Td>
                    <Td>
                      <Link to={'/updatetask'}>
                        <IconButton
                          mr={2}
                          colorScheme="blue"
                          aria-label="update"
                          icon={<EditIcon />}
                          onClick={() => setData(data)}
                        />
                      </Link>
                      <IconButton
                        colorScheme="red"
                        aria-label="delete"
                        icon={<DeleteIcon />}
                      onClick={() => onDelete(data.id)}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
}
