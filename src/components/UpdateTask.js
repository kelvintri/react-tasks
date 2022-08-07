import React, { useState, useEffect } from "react";
import {
  Textarea,
  VStack,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UpdateTask() {
  let navigate = useNavigate();

  const [id, setID] = useState(null);
  const [taskname, setTaskName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [taskdone, setTaskdone] = useState(false);
  const [taskDeadline, setTaskDeadline] = useState("");

  const url = `https://young-woodland-74082.herokuapp.com/task/${id}`;


  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setTaskName(localStorage.getItem("Task Name"));
    setAssignee(localStorage.getItem("Assignee"));
    setTaskdone(JSON.parse(localStorage.getItem("Taskdone")));
    setTaskDeadline(localStorage.getItem("Task Deadline"));
  }, []);


  const updateAPIData = () => {
    axios
      .put(url, {
        taskname: taskname,
        assignee: assignee,
        taskdone: taskdone,
        deadline: taskDeadline,
      })
      .then(function (response) {
        navigate("../", { replace: true });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(taskDeadline)
  return (
    <>
    <VStack
    as="form"
    mx="auto"
    w={{ base: "90%", md: 500 }}
    pt={10}
    justifyContent="center"
    onSubmit={(e) => e.preventDefault()}
  >
      {/* <Flex width="full" align="center" justifyContent="center" pt={10}>
        <Box p={10}> */}
          <Box textAlign="center" pt={10} mb={5}>
            <Heading>Update Task</Heading>
          </Box>
          <Box my={4} textAlign="left">
              <FormControl>
                <FormLabel>Task Name</FormLabel>
                <Textarea
                  value={taskname}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Assignee</FormLabel>
                <Input
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                />
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Deadline</FormLabel>
                <Input
                  value={taskDeadline}
                  type="date"
                  onChange={(e) => setTaskDeadline(e.target.value)}
                />
              </FormControl>
              <Checkbox
                value={taskdone}
                isChecked={taskdone}
                onChange={(e) => setTaskdone(e.target.checked)}
                borderColor="purple"
              >
                Task Done?
              </Checkbox>
              <Button
                bg="purple.300"
                colorScheme="blue"
                width="full"
                mt={4}
                type="submit"
                onClick={updateAPIData}
              >
                Update
              </Button>
          </Box>
        {/* </Box>
      </Flex> */}
      </VStack>
    </>
  );
}
