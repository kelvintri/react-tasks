import React, { useState } from "react";
import {
  Textarea,
  Flex,
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

export default function CreateTask() {
  let navigate = useNavigate();

  const [taskName, setTaskName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [taskdone, setTaskdone] = useState(false);

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

  return (
    <>
      <Flex width="full" align="center" justifyContent="center">
        <Box p={10}>
          <Box textAlign="center">
            <Heading>Create Task</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={(e) => e.preventDefault()}>
              <FormControl>
                <FormLabel>Task Name</FormLabel>
                <Textarea value={taskName} onChange={handleTaskNameChange} />
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Assignee</FormLabel>
                <Input value={assignee} onChange={handleAssigneeChange} />
              </FormControl>
              <Checkbox
                value={taskdone}
                borderColor="purple"
                onChange={handleTaskdoneChange}
              >
                Task Done?
              </Checkbox>
              <Button
                bg="purple.300"
                width="full"
                mt={4}
                type="submit"
                onClick={postData}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
}
