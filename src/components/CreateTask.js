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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateTask() {
  let navigate = useNavigate();

  const [taskName, setTaskName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [taskdone, setTaskdone] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
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
          toast({
            title: "Task Created!",
            description: "Task has been created successfully!",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
        navigate("../", { replace: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    if (taskName === "" || assignee === "") {
      setIsValid(false);
    } else {
      postData();
    }
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
        mb="70"
      >
        {/* <Flex width="full" align="center" justifyContent="center" pt={20}>
          <Box > */}
        <Box textAlign="center" pt={10} mb={5}>
          <Heading>Create Task</Heading>
        </Box>
        <Box textAlign="left">
          <FormControl mt={2} isRequired isInvalid={isValid}>
            <FormLabel>Task Name</FormLabel>
            <Textarea value={taskName} onChange={handleTaskNameChange} />
          </FormControl>
          <FormControl mt={6} isRequired isInvalid={isValid}>
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
            onClick={handleSubmit}
            isLoading={isLoading}
            loadingText="Creating..."
            isDisabled={taskName === "" || assignee === ""}
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
