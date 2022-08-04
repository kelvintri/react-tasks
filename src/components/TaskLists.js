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
  TableCaption,
  TableContainer,
  Box,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

export default function TaskLists() {
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    axios
      .get("https://young-woodland-74082.herokuapp.com/tasks")
      .then((resp) => {
        setAPIData(resp.data.data.data);
      });
  }, []);
  return (
    <Flex>
      <Box width="100%" p={2} my={4}>
        <TableContainer textAlign="center">
          <Table variant="striped" colorScheme="purple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>Task Name</Th>
                <Th>Assignee</Th>
                <Th>TaskDone?</Th>
                <Th>Deadline</Th>
                <Th>Update</Th>
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
                    <Td></Td>
                    <Td>
                      <IconButton
                        colorScheme="blue"
                        aria-label="update"
                        icon={<EditIcon />}
                      />
                      <IconButton
                        colorScheme="red"
                        aria-label="delete"
                        icon={<DeleteIcon />}
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
