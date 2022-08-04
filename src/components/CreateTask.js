import React, { useState } from "react";
import {
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

export default function CreateTask() {
  const [taskName, setTaskName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [taskdone, setTaskdone] = useState(false);

  const postData = () => {
    axios
      .post("https://young-woodland-74082.herokuapp.com/task", {
        taskname: taskName,
        assignee: assignee,
        taskdone: taskdone,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Buat Tugas Baru</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form>
            <FormControl>
              <FormLabel>Nama Tugas</FormLabel>
              <Input onChange={(e) => setTaskName(e.target.value)} />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Untuk</FormLabel>
              <Input onChange={(e) => setAssignee(e.target.value)} />
            </FormControl>
            <Checkbox onChange={(e) => setTaskdone(!taskdone)}>
              Sudah Selesai?
            </Checkbox>
            <Button width="full" mt={4} type="submit" onClick={postData}>
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}
