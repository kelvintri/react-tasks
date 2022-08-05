import React, { useState, useEffect } from "react";
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

export default function UpdateTask() {
  let navigate = useNavigate();

  const [id, setID] = useState(null);
  const [taskname, setTaskName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [taskdone, setTaskdone] = useState(false);

  const url = `https://young-woodland-74082.herokuapp.com/task/${id}`;

  console.log(taskdone);

  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setTaskName(localStorage.getItem("Task Name"));
    setAssignee(localStorage.getItem("Assignee"));
    setTaskdone(JSON.parse(localStorage.getItem("Taskdone")));
  }, [setID]);

  const updateAPIData = () => {
    axios
      .put(url, {
        taskname: taskname,
        assignee: assignee,
        taskdone: taskdone,
      })
      .then(function (response) {
        navigate("../", { replace: true });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <Flex width="full" align="center" justifyContent="center">
        <Box p={10}>
          <Box textAlign="center">
            <Heading>Update Task</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={(e) => e.preventDefault()}>
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
                width="full"
                mt={4}
                type="submit"
                onClick={updateAPIData}
              >
                Update
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
}
