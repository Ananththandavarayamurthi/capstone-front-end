import React, { useState,  useEffect } from "react";
import {
  Paper,
  TableBody,
  TableCell,
  TextField,
  TableRow,
  Toolbar,
} from "@mui/material";
import useTable from "../reusableComponents/UseTable";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import axios from "axios";
import { env } from "../../config";

const headCells = [
  { id: "#", label: "#" },
  { id: "Project", label: "Project" },
  { id: "start", label: "Date started" },
  { id: "due", label: "Due Date" },
  { id: "status", label: "Status" },
  { id: "action", label: "Action" },
];

const ProjectTable = () => {
  const [records, setRecords] = useState([]);
  const [alarm, setAlarm] = useState(false);
  const [value, setValue] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, value);



  // Getting all projects
  useEffect(() => {
    getProject();
  }, [alarm]);

  let getProject = async () => {
    try {
      let response = await axios.get(`${env.api}/projects/projectList`);
      setRecords(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  let userDelete = async (id) => {
    try {
      let response = await axios.delete(`${env.api}/projects/del/${id}`);
      if (response.status === 200) {
        setAlarm(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <h3>Projects</h3>
      <Paper className="overflow-auto">
        <Toolbar className="d-flex justify-content-between ">
          <Link
            to="/portal/createProject"
            type="button"
            className="btn btn-primary text-black"
          >
            <AddToPhotosIcon />
            Add Project
          </Link>
       
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((list, i) => {
              return (
                <TableRow key={i + 1}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>
                    <div>
                      <b>{list.projectName}</b>
                      <p>{list.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>{list.startDate}</TableCell>
                  <TableCell>{list.endDate}</TableCell>
                  <TableCell>
                    <span className={`badge bg-${list.color}`}>
                      {list.state}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Dropdown>
                      <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Action
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          as={Link}
                          to={`/portal/viewProject/${list._id}`}
                        >
                          View
                        </Dropdown.Item>
                        <Dropdown.Item href={`/portal/editProject/${list._id}`}>
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            userDelete(list._id);
                          }}
                        >
                          Delete
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

export default ProjectTable;
