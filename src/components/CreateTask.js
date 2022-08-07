import React, { useState } from "react";
import {
  Textarea,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateTask() {
  let navigate = useNavigate();

  const [taskName, setTaskName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [taskdone, setTaskdone] = useState(false);
  const [deadline, setDeadline] = useState("");

  const url = "https://young-woodland-74082.herokuapp.com/task";
  const customHeaders = {
    "content-type": "application/json",
  };
  const postData = () => {
    axios
      .post(
        url,
        {
          taskname: taskName,
          assignee: assignee,
          taskdone: taskdone,
          deadline: deadline,
        },
        customHeaders
      )
      .then(function (response) {
        if (response.status === 201) {
          alert("Task Created!");
        }
        navigate("../", { replace: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleTaskNameChange = (e) => setTaskName(e.target.value);
  const handleAssigneeChange = (e) => setAssignee(e.target.value);
  const handleTaskdoneChange = (e) => setTaskdone(!taskdone);
  const handleTaskDeadlineChange = (e) => setDeadline(e.target.value);

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
        {/* <Flex width="full" align="center" justifyContent="center" pt={20}>
          <Box > */}
        <Box textAlign="center" pt={10}>
          <Heading>Create Task</Heading>
        </Box>
        <Box textAlign="left">
          <FormControl>
            <FormLabel>Task Name</FormLabel>
            <Textarea value={taskName} onChange={handleTaskNameChange} />
          </FormControl>
          <FormControl mt={6}>
            <FormLabel>Assignee</FormLabel>
            <Input value={assignee} onChange={handleAssigneeChange} />
          </FormControl>
          <FormControl mt={6}>
            <FormLabel>Deadline</FormLabel>
            <Input
              value={deadline}
              onChange={handleTaskDeadlineChange}
              size="md"
              type="date"
            />
          </FormControl>
          <Checkbox
            mt={6}
            justifyContent="center"
            value={taskdone.toString()}
            borderColor="purple"
            onChange={handleTaskdoneChange}
          >
            Task Done?
          </Checkbox>
          <Button
            colorScheme="blue"
            bg="purple.400"
            width="full"
            mt={4}
            type="submit"
            onClick={postData}
          >
            Submit
          </Button>
        </Box>
      </VStack>
      {/* </Box>
      </Flex> */}
    </>
  );
}
