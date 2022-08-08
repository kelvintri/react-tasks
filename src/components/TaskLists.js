import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  Stack,
  Button,
  Icon,
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
  useToast
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, CheckIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function TaskLists() {
  const [APIData, setAPIData] = useState([]);
  const [requestData, setRequestData] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  const toast = useToast();
  const url = "https://young-woodland-74082.herokuapp.com/tasks";

  useEffect(() => {
    axios.get(url).then((resp) => {
      setAPIData(resp.data.data.data);
      setIsLoading(false);
    });
  }, [requestData]);

  const setData = (data) => {
    let { id, taskname, assignee, taskdone, deadline } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("Task Name", taskname);
    localStorage.setItem("Assignee", assignee);
    localStorage.setItem("Taskdone", JSON.stringify(taskdone));
    localStorage.setItem("Task Deadline", deadline);
  };

  const deleteData = (id) => {
    axios
      .delete(`https://young-woodland-74082.herokuapp.com/task/${id}`)
      .then((resp) => {
        toast({
          title: "Task Deleted!",
          description: "Task has been deleted successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setRequestData(new Date());
      });
  };

  const setTaskdone = (id) => {
    axios
      .put(`https://young-woodland-74082.herokuapp.com/task/${id}/done`, {
        taskdone: true,
      })
      .then((resp) => {
        toast({
          title: "Task marked as done!",
          description: "Task has been marked as done successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setRequestData(new Date());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Flex width="full" justifyContent="space-between" pt={20} position='relative' mb="70">
      <Box mx="auto">
        <Stack display="flex">
          <Heading mb={2} textAlign="center">
            Task List
          </Heading>
          <Stack direction={["column", "row"]} spacing="24px">
            <Link to={"/createtask"}>
              <Button
                leftIcon={<Icon as={FaPlus} size="2rem" />}
                colorScheme="blue"
                variant="solid"
                bg="purple.400"
              >
                Create Task
              </Button>
            </Link>
          </Stack>
        </Stack>
        <TableContainer textAlign="center" width="100%">
          <Table variant="striped" colorScheme="purple" size="lg">
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
              {isLoading ? (
                <Tr>
                  <Td colSpan="5">
                    <CircularProgress display='flex' justifyContent='center' isIndeterminate color="purple.500" thickness='10px' size='40px'/>
                  </Td>
                </Tr>
              ) : (
                APIData?.sort((a,b) => a.taskdone - b.taskdone  || a.deadline.localeCompare(b.deadline)).map((data) => {
                  return (
                    <Tr key={data.id}>
                      <Td>{data.taskname}</Td>
                      <Td>{data.assignee}</Td>
                      <Td textAlign="center">
                        {data.taskdone ? (
                          <CheckIcon color="green.500"/>
                        ) : (
                          <Checkbox
                            borderColor="purple"
                            colorScheme="blue"
                            isChecked={data.taskdone}
                            onChange={(e) => {
                              setTaskdone(data.id);
                            }}
                          />
                        )}
                      </Td>
                      {data.deadline === "" ? (
                        <Td textAlign='center'>-</Td>
                      ) : (
                        <Td textAlign="center">{data.deadline}</Td>
                      )}
                      <Td>
                        {data.taskdone === true ? (
                            <IconButton
                              mr={2}
                              colorScheme="green"
                              aria-label="done"
                              icon={<CheckIcon />}
                            />
                        ) : (
                          <Link to={"/updatetask"}>
                            <IconButton
                              mr={2}
                              colorScheme="blue"
                              aria-label="update"
                              icon={<EditIcon />}
                              onClick={() => setData(data)}
                            />
                          </Link>
                        )}
                        <IconButton
                          colorScheme="red"
                          aria-label="delete"
                          icon={<DeleteIcon />}
                          onClick={() => deleteData(data.id)}
                        />
                      </Td>
                    </Tr>
                  );
                }))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
}
