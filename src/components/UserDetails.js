import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineModeEdit, MdDelete } from "react-icons/md";
import { BsPlusLg } from "react-icons/bs";
import { Table, Modal, Button } from "react-bootstrap";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
  name: "",
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  name: Yup.string().required("This is required field"),
  email: Yup.string().email("Not a Valid Mail").required("This is required"),
  password: Yup.string().min(6).max(12).required("Required"),
});

export const UserDetails = () => {
  const [show, setShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleShow1 = () => setDeleteModal(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState([]);
  const api = `https://ecom-react-task.herokuapp.com/user`;
  const token = JSON.parse(localStorage.getItem("token"));
  const handleClose1 = () => {
    setDeleteModal(false);
  };
  useEffect(() => {
    axios
      .get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [data]);

  const deleteData = async (id) => {
    console.log(id, "fhjdsak");
    try {
      const response = await axios({
        method: "delete",
        url: `https://ecom-react-task.herokuapp.com/user/${id}`,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("deleted successfully");
    } catch (err) {}
  };

  const onSubmit = async (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
    console.log(values);

    try {
      const response = await axios({
        method: "post",
        url: "https://ecom-react-task.herokuapp.com/user",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          name: values.name,
          email: values.email,
          password: values.password,
        },
      });

      console.log(response);
    } catch (err) {}
  };

  return (
    <div>
      <div>
        <div className="screen-container">
          <h2>User Table</h2>
        </div>
        <div>
          <h5 className="text-end">
            <Button onClick={handleShow}>
              <BsPlusLg />
              Add User
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Screen</Modal.Title>
              </Modal.Header>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Modal.Body>
                  <Form>
                    <div className="row">
                      <div className="col-6">
                        <label for="name">Name</label>
                        <span>
                          <Field type="text" id="name" name="name" />
                        </span>
                      </div>
                      <ErrorMessage name="name" component={TextError} />
                      <div className="col-6">
                        <label for="email">Email</label>
                        <span>
                          <Field type="text" id="email" name="email" />
                        </span>
                      </div>
                      <div className="col-6">
                        <label for="password">Password</label>
                        <span>
                          <Field
                            type="password"
                            id="password"
                            name="password"
                          />
                        </span>
                      </div>
                    </div>
                    <ErrorMessage name="password" component={TextError} />

                    <Modal.Footer>
                      <Button type="submit" variant="primary">
                        Add User
                      </Button>
                      <Button variant="danger" onClick={handleClose}>
                        Cancel
                      </Button>
                    </Modal.Footer>
                  </Form>
                </Modal.Body>
              </Formik>
            </Modal>
          </h5>
        </div>

        <Table bordered hover className="m-3">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>User</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, ind) => (
              <tr key={ind}>
                <td>{ind + 1}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td className="d-flex">
                  <div className="fonty">
                    <MdOutlineModeEdit />
                  </div>
                  <div className="delete fonty">
                    <MdDelete fonty onClick={handleShow1} />
                  </div>
                  <Modal show={deleteModal} onHide={handleClose1}>
                    <Modal.Header closeButton>
                      <Modal.Title>Delete Screen</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="row">
                        <h5>Are you sure to delete this screen?</h5>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="danger"
                        // onClick={()=>handleClose1(d.id)}
                        onClick={() => deleteData(d.id)}
                      >
                        Delete
                      </Button>
                      <Button variant="primary" onClick={handleClose1}>
                        Cancel
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
