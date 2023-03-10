import {
  Paper,
  TableBody,
  TableCell,
  TextField,
  TableRow,
  Toolbar,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import useTable from "../reusableComponents/UseTable";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import { env } from "../../config";

const headCells = [
  { id: "#", label: "#" },
  { id: "Project", label: "Project" },
  { id: "Project", label: "Task" },
  { id: "start", label: "Project started" },
  { id: "due", label: "Project Due Date" },
  { id: "status", label: "Project Status" },
  { id: "statu", label: "Task Status" },
  { id: "action", label: "Action" },
];
const TaskTable = () => {
  const [records, setRecords] = useState([]);
  const [value, setValue] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, value);

 

  useEffect(() => {
    getProject();
  }, []);

  let getProject = async () => {
    try {
      let response = await axios.get(`${env.api}/task/taskList`);
      setRecords(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h3>Task</h3>
      <Paper className="overflow-auto">
        
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((list, i) => {
              return (
                <TableRow key={i + 1}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{list.project.projectName}</TableCell>
                  <TableCell>
                    <div>
                      <b>{list.taskName}</b>
                      <p>{list.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>{list.project.startDate}</TableCell>
                  <TableCell>{list.project.endDate}</TableCell>
                  <TableCell>
                    <span className={`badge bg-${list.project.color}`}>
                      {list.project.state}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`badge bg-${list.color}`}>
                      {list.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Dropdown>
                      <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Action
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          href={`/portal/viewProject/${list.projectId}`}
                        >
                          Add Productivity
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </>
  );
};

export default TaskTable;
