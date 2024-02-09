import React, { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { Pagination } from "antd";
import NavTopSection from "../common/NavTopSection/NavTopSection";
import NavMenuMobile from "../common/NavTopSection/NavMenuMobile";
import { TableLoading } from "react-bootstrap-table-loading";
import { TextField } from "@mui/material";
import { DatePicker } from "react-rainbow-components";
import ApiUrl from "../../api/ApiURL";

const Extra = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  const [reg_mobile, setMobile] = useState(0);

  const [day_active, setDay] = useState("");
  const [extend_day, setExtenDay] = useState(0);
  const [is_admission_done, setAdmission] = useState(false);
  const [reg_course_title, setcourse] = useState("");
  const [reg_uuid, setUid] = useState("");
  const [is_active, setActive] = useState(false);
  const [show, setShow] = useState(false);
  const [CourseData, setCourseData] = useState([]);
  // const [selectCourseData,setSelectCourseData]=useState('')
  const [superuser, setSuperuser] = useState("");
  const [reg_id, setRegid] = useState(0);
  const [reRun, setReRun] = useState(false);
  // Pagination state
  const [total, setTotal] = useState("");
  const [page, setPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(100);

  const [reg_fullname, setFullname] = useState("");
  const [dob, setDob] = useState("");
  const [course, setCouse] = useState("");
  const [nationality, setnationality] = useState("Bangladeshi");
  const [admision, setadmision] = useState(false);
  const [email, setEmail] = useState("");
  const [FaceBook, seFacebook] = useState("");
  const [nid, setInd] = useState("");
  const [reg_present_add, setAddress] = useState("");
  const [reg_present_city, setCity] = useState("");
  const [occupation, setoccopation] = useState("");
  const [selectCourse, setselectCourse] = useState("");
  const [Gender, setGender] = useState("Male");
  const [newCourse, setNewCourse] = useState([]);

  // const [currentPage,setCurentPage]=useState([])

  const handleClose = () => setShow(false);
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    // //console.log(inputDate);
    const year = date.getFullYear().toString().slice(-2); // Extract last 2 digits of the year
    const day = date.getDate().toString().padStart(2, "0"); // Ensure 2-digit day with leading zero
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ensure 2-digit month with leading zero
    const hours = date.getHours();
    const munites = date.getMinutes();

    return `${day}/${month}/${year}\n
  ${hours}:${munites}`;
  }

  let courseOnChange = (event) => {
    setCouse(event);
    //console.log(event);
  };
  let GenderOnChange = (event) => {
    setGender(event);
    //console.log(event);
  };
  let NationalityChange = (event) => {
    setnationality(event);
    // //console.log(event);
  };
  let Admision = (event) => {
    setadmision(event);
    // //console.log(event);
  };
  const handleShow = (item) => {
    setShow(true);
    if(!item.reg_gender == null){
      setGender(item.reg_gender);
    }
    // //console.log(Gender);
 
    // //console.log(Gender);
    setInd(item.reg_nid);
    setFullname(item.reg_fullname);
    setMobile(item.reg_mobile);
    setAddress(item.reg_present_add);
    setCity(item.reg_present_city);
    setDay(item.day_active);
    setadmision(item.is_admission_done);
    setAdmission(item.is_admission_done);
    setcourse(item.batch_schedule_time_id);
    setUid(item.reg_uuid);
    setActive(item.is_active);
    setRegid(item.reg_id);
    setEmail(item.reg_email);
    setCouse(item.batch_schedule_time_id);
    seFacebook(item.reg_fb_name);
    setoccopation(item.reg_occupation);
    setselectCourse(item.reg_course_title);
    // setGender(item.reg_gender);
    setDob(item.reg_dob);
    // //console.log(item.reg_gender);
    // //console.log(Gender);
    if (selectCourse.length > 0) {
      // //console.log('ajksdhfjkashdf');
      let data = CourseData.filter(
        (x) => x.batch_schedule_name != selectCourse
      );
      setNewCourse(data);
      // //console.log(data);
      //  //console.log(selectCourse);
    } else {
      setNewCourse(CourseData);
    }
  };
  let birth_dateOnChange = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let new_date = year + "-" + month + "-" + day;
    setDob(new_date);
  };

  useEffect(() => {
    setSuperuser(sessionStorage.getItem("super_user_name"));
    axios.get(ApiUrl.BaseUrl + "api/getUser/").then((resp) => {
      setData(resp.data);
      setTotal(resp.data.length);
      // //console.log(resp.data);
    });
    axios.get(ApiUrl.BaseUrl + "api/time-date/").then((resp) => {
      setCourseData(resp.data.data);
      // //console.log(resp.data.data)
      //  setcourse(resp.data.data[0].batch_schedule_name)
    });
    // //console.log(reRun);
  }, [superuser, reRun]);


  const indexofLastPage = page + postPerPage;
  const indexofFirstPage = 0;
  const FilterData = data.filter(
    (data) =>
      data.reg_id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      // data.is_active.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.reg_mobile
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      data.reg_fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.is_admission_done
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      data.date_time.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // data.item.day_active.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||

      data.reg_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentPage = FilterData?.slice(indexofFirstPage, indexofLastPage);
  const UpdateUser = (e) => {
    e.preventDefault();

    let UpdateData = new FormData(e.target);
    //  let courseUp=(document.getElementById('CourseId').value);

    UpdateData.append("reg_dob", dob);
    UpdateData.append("reg_nationality", nationality);
    UpdateData.append("reg_course_title", course);
    UpdateData.append("reg_gender", Gender);
    UpdateData.append("is_admission_done", admision);
    if (dob < 1) {
      alert("date Required");
    } else {
      axios
        .put(ApiUrl.BaseUrl + `api/short-data/${reg_uuid}/`, UpdateData)
        .then(function (response) {
          // //console.log(response);
        })
        .then(
          handleClose,
          setReRun((prevCheck) => !prevCheck)
        )
        .catch(function (error) {
          //console.log(error);
        });
    }
  };
  return (
    <Fragment>
      <div className="Desktop">
        <NavTopSection />
      </div>

      <div className="Mobile">
        <NavMenuMobile />
      </div>

      <div className=" container mt-5 ">
        <Form>
          <Form.Group controlId="searchForm">
            <Form.Control
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-100"
            />
          </Form.Group>
        </Form>
        <div className="extra_table ">
          <Table
            striped
            bordered
            hover
            className="d-none d-lg-block extra_table2 "
          >
            <thead className="mx-auto ">
              <tr className="table_tr">
                <th className="">ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Active Day</th>
                <th>Admission</th>
                <th>Reg Date</th>
                <th>Active</th>
                <th>Update</th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>

            <Modal
              show={show}
              onHide={handleClose}
              size="lg"
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Update</Modal.Title>
              </Modal.Header>
              <form onSubmit={(e) => UpdateUser(e)}>
                <Modal.Body>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <TextField
                        defaultValue={reg_fullname}
                        fullWidth
                        name="reg_fullname"
                        label="Student Name "
                        // onChange={this.student_nameOnChange}
                        id="StudentName"
                        // //maxlength="10"
                        required // Add the required attribute
                        type="text" // Specify the input type
                        inputProps={{ maxLength: 100 }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                              borderColor: "#5BA9DB", // Border color on hover
                              // borderStyle: 'dotted', // Border color on hover
                            },
                            "& fieldset": {
                              borderColor: "#5BA9DB", // Border color on hover
                              // borderStyle: 'dotted', // Border color on hover
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#7B5DA7", // Border color when focused
                              // backgroundImage: 'linear-gradient(to right, rgba(86, 181, 227, 100), rgba(125, 88, 165, 100))',
                              borderWidth: "1px", // Border width when focused
                              // borderStyle: 'dotted', // Border style when focused
                            },
                          },
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <TextField
                        fullWidth
                        defaultValue={reg_mobile}
                        label="Mobile Number"
                        // onChange={this.student_mobileOnChange}
                        id="MobileNumber"
                        required // Add the required attribute
                        type="tel" // Use type="tel" for phone numbers
                        name="reg_mobile"
                        onInput={(e) =>
                          (e.target.value = e.target.value.slice(0, 15))
                        }
                        // value={this.state.student_mobile}
                        // inputProps={{ maxLength: 100 }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                              borderColor: "#5BA9DB", // Border color on hover
                              // borderStyle: 'dotted', // Border color on hover
                            },
                            "& fieldset": {
                              borderColor: "#5BA9DB", // Border color on hover
                              // borderStyle: 'dotted', // Border color on hover
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#7B5DA7", // Border color when focused
                              // backgroundImage: 'linear-gradient(to right, rgba(86, 181, 227, 100), rgba(125, 88, 165, 100))',
                              borderWidth: "1px", // Border width when focused
                              // borderStyle: 'dotted', // Border style when focused
                            },
                          },
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <TextField
                        fullWidth
                        label="Email"
                        value={email}
                        disabled
                        name="email"
                        // onChange={this.student_nameOnChange}
                        id="StudentName"
                        // //maxlength="10"
                        required // Add the required attribute
                        type="email" // Specify the input type
                        inputProps={{ maxLength: 100 }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                              borderColor: "#5BA9DB", // Border color on hover
                              // borderStyle: 'dotted', // Border color on hover
                            },
                            "& fieldset": {
                              borderColor: "#5BA9DB", // Border color on hover
                              // borderStyle: 'dotted', // Border color on hover
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#7B5DA7", // Border color when focused
                              // backgroundImage: 'linear-gradient(to right, rgba(86, 181, 227, 100), rgba(125, 88, 165, 100))',
                              borderWidth: "1px", // Border width when focused
                              // borderStyle: 'dotted', // Border style when focused
                            },
                          },
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <TextField
                        fullWidth
                        defaultValue={FaceBook}
                        label="Facebook Name "
                        name="reg_fb_name"
                        // onChange={this.student_nameOnChange}
                        id="StudentName"
                        //maxlength="10"
                        // required // Add the required attribute
                        type="text" // Specify the input type
                        inputProps={{ maxLength: 100 }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                              borderColor: "#5BA9DB", // Border color on hover
                              // borderStyle: 'dotted', // Border color on hover
                            },
                            "& fieldset": {
                              borderColor: "#5BA9DB", // Border color on hover
                              // borderStyle: 'dotted', // Border color on hover
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#7B5DA7", // Border color when focused
                              // backgroundImage: 'linear-gradient(to right, rgba(86, 181, 227, 100), rgba(125, 88, 165, 100))',
                              borderWidth: "1px", // Border width when focused
                              // borderStyle: 'dotted', // Border style when focused
                            },
                          },
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <TextField
                        fullWidth
                        defaultValue={nid}
                        label="Nid/Passport/Birth-Certificate "
                        name="reg_nid"
                        // onChange={this.student_nameOnChange}
                        //maxlength="10"
                        required // Add the required attribute
                        type="text" // Specify the input type
                        inputProps={{ maxLength: 100 }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                              borderColor: "#5BA9DB", // Border color on hover
                              // borderStyle: 'dotted', // Border color on hover
                            },
                            "& fieldset": {
                              borderColor: "#5BA9DB", // Border color on hover
                              // borderStyle: 'dotted', // Border color on hover
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#7B5DA7", // Border color when focused
                              // backgroundImage: 'linear-gradient(to right, rgba(86, 181, 227, 100), rgba(125, 88, 165, 100))',
                              borderWidth: "1px", // Border width when focused
                              // borderStyle: 'dotted', // Border style when focused
                            },
                          },
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <TextField
                        fullWidth
                        defaultValue={reg_present_add}
                        label="Address "
                        // onChange={this.student_nameOnChange}
                        id="StudentName"
                        name="reg_present_add"
                        //maxlength="10"
                        required // Add the required attribute
                        type="text" // Specify the input type
                        inputProps={{ maxLength: 100 }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                              borderColor: "#5BA9DB", // Border color on hover
                              // borderStyle: 'dotted', // Border color on hover
                            },
                            "& fieldset": {
                              borderColor: "#5BA9DB", // Border color on hover
                              // borderStyle: 'dotted', // Border color on hover
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#7B5DA7", // Border color when focused
                              // backgroundImage: 'linear-gradient(to right, rgba(86, 181, 227, 100), rgba(125, 88, 165, 100))',
                              borderWidth: "1px", // Border width when focused
                              // borderStyle: 'dotted', // Border style when focused
                            },
                          },
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <TextField
                        fullWidth
                        label="City "
                        defaultValue={reg_present_city}
                        name="reg_present_city"
                        // onChange={this.student_nameOnChange}
                        id="StudentName"
                        //maxlength="10"
                        required // Add the required attribute
                        type="text" // Specify the input type
                        inputProps={{ maxLength: 100 }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                              borderColor: "#5BA9DB", // Border color on hover
                              // borderStyle: 'dotted', // Border color on hover
                            },
                            "& fieldset": {
                              borderColor: "#5BA9DB", // Border color on hover
                              // borderStyle: 'dotted', // Border color on hover
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#7B5DA7", // Border color when focused
                              // backgroundImage: 'linear-gradient(to right, rgba(86, 181, 227, 100), rgba(125, 88, 165, 100))',
                              borderWidth: "1px", // Border width when focused
                              // borderStyle: 'dotted', // Border style when focused
                            },
                          },
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <TextField
                        fullWidth
                        label="Occupation"
                        defaultValue={occupation}
                        name="reg_occupation"
                        // onChange={this.student_nameOnChange}
                        id="StudentName"
                        //maxlength="10"
                        required // Add the required attribute
                        type="text" // Specify the input type
                        inputProps={{ maxLength: 100 }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                              borderColor: "#5BA9DB", // Border color on hover
                              // borderStyle: 'dotted', // Border color on hover
                            },
                            "& fieldset": {
                              borderColor: "#5BA9DB", // Border color on hover
                              // borderStyle: 'dotted', // Border color on hover
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#7B5DA7", // Border color when focused
                              // backgroundImage: 'linear-gradient(to right, rgba(86, 181, 227, 100), rgba(125, 88, 165, 100))',
                              borderWidth: "1px", // Border width when focused
                              // borderStyle: 'dotted', // Border style when focused
                            },
                          },
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        {/* <Form.Label>  Day Active : {day_active}</Form.Label> */}
                        <TextField
                          fullWidth
                          label="Add Active Days"
                          name="day_active"
                          // onChange={this.student_nameOnChange}
                          id="StudentName"
                          //maxlength="10"
                          // Add the required attribute
                          type="text" // Specify the input type
                          inputProps={{ maxLength: 100 }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&:hover fieldset": {
                                borderColor: "#5BA9DB", // Border color on hover
                                // borderStyle: 'dotted', // Border color on hover
                              },
                              "& fieldset": {
                                borderColor: "#5BA9DB", // Border color on hover
                                // borderStyle: 'dotted', // Border color on hover
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#7B5DA7", // Border color when focused
                                // backgroundImage: 'linear-gradient(to right, rgba(86, 181, 227, 100), rgba(125, 88, 165, 100))',
                                borderWidth: "1px", // Border width when focused
                                // borderStyle: 'dotted', // Border style when focused
                              },
                            },
                          }}
                        />
                        <br />
                        <Form.Label> Day Active : {day_active}</Form.Label>
                        {/* <Form.Control type="text"  onChange={(e)=>setExtenDay(e.target.value)} /> */}
                        {/* <p className='text-danger'> How much days do you want to add</p> */}
                      </Form.Group>
                    </div>

                    <div className="form-group col-lg-6 col-md-6 col-sm-12 p-0 m-0 ">
                      <div className="inputDateP">
                        <DatePicker
                          value={dob}
                          id="datePicker-17"
                          onChange={birth_dateOnChange}
                          maxDate={new Date()}
                          placeholder="Select Date of Birth"
                        />
                      </div>
                    </div>
                    <div className="form-group col-lg-6 col-md-6 col-sm-12 marginNationality">
                      <Form.Label> Nationality :</Form.Label>
                      <select
                        onChange={(value) =>
                          NationalityChange(value.target.value)
                        }
                        required
                        // maxlength="50"
                        className="form-select placeholderApplyText py-3 col-md-12"
                        aria-label="Default select example"
                      >
                        <option
                          className="placeholderApplyText"
                          value="Bangladeshi"
                        >
                          Bangladeshi
                        </option>
                        <option
                          className="placeholderApplyText"
                          value="Other Country"
                        >
                          Other Country
                        </option>
                      </select>
                    </div>
                    <div className="form-group col-lg-6 col-md-6 col-sm-12 marginNationality">
                      <Form.Label> Admision :</Form.Label>
                      <select
                        onChange={(value) => Admision(value.target.value)}
                        required
                        // maxlength="50"
                        className="form-select placeholderApplyText py-3 col-md-12"
                        aria-label="Default select example"
                      >
                        {is_admission_done && (
                          <option className="placeholderApplyText" value={true}>
                            True
                          </option>
                        )}
                        {is_admission_done && (
                          <option
                            className="placeholderApplyText"
                            value={false}
                          >
                            False
                          </option>
                        )}

                        {!is_admission_done && (
                          <option
                            className="placeholderApplyText"
                            value={false}
                          >
                            False
                          </option>
                        )}
                        {!is_admission_done && (
                          <option className="placeholderApplyText" value={true}>
                            true
                          </option>
                        )}
                      </select>
                    </div>
                    <div className="form-group col-lg-6 col-md-6 col-sm-12 marginNationality">
                      <Form.Label> Gender :</Form.Label>
                      <select
                        // onChange={this.nationalityOnChange}
                        required
                        defaultValue={Gender}
                        // maxlength="50"
                        className="form-select placeholderApplyText py-3 col-md-12"
                        aria-label="Default select example"
                        onChange={(value) => GenderOnChange(value.target.value)}
                        id="Gander"
                      >
                        <option className="placeholderApplyText" value="Male">
                          Male
                        </option>
                        <option className="placeholderApplyText" value="Female">
                          Female
                        </option>
                      </select>
                    </div>
                    <div className="form-group col-lg-6 col-md-6 col-sm-12 marginNationality">
                      <Form.Label> Select Course :</Form.Label>
                      <select
                        onChange={(value) => courseOnChange(value.target.value)}
                        required
                        className="form-select placeholderApplyText py-3 col-md-12"
                        aria-label="Default select example"
                        id="CourseId"
                      >
                        <option className="placeholderApplyText" value={course}>
                          {selectCourse}
                        </option>

                        {newCourse.map((x) => (
                          <option
                            key={x?.batch_schedule_time_id}
                            className="placeholderApplyText"
                            value={x?.batch_schedule_time_id}
                          >
                            {x?.batch_schedule_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  {/* <Button variant="primary"  type='submit' onClick={DataUpdate}> */}
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </Modal.Footer>
              </form>
            </Modal>
            {data.length > 0 ? (
              <tbody className="hr_table ">
                {/* Map through your data and filter based on searchTerm */}
                {currentPage
                  ?.filter(
                    (item) =>
                      item.reg_id
                        .toString()
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      item.reg_mobile
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      item.reg_fullname
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      item.is_admission_done
                        .toString()
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      item.date_time
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      item.day_active
                        .toString()
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      item.is_active
                        .toString()
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      item.reg_email
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.reg_id}</td>
                      <td>{item.reg_fullname}</td>
                      <td className="extra_table_email">{item.reg_email}</td>
                      <td>{item.reg_mobile}</td>
                      <td>{item.day_active}</td>

                      {item.is_admission_done && <td>true</td>}
                      {!item.is_admission_done && <td>false</td>}
                      <td>{formatDate(item.date_time)}</td>
                      {item.is_active && <td>True</td>}
                      {!item.is_active && <td>False</td>}

                      <td className="mx-auto ">
                        {" "}
                        <Button
                          className="mx-auto text-right btn btn-smn"
                          onClick={() => handleShow(item.reg_id)}
                        >
                          Update
                          
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            ) : (
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="ph-item py-4"></td>
                  <td></td>
                  <td></td>
                  <td className="ph-item"></td>
                  <td></td>
                  <td></td>
                  <td className="ph-item"></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="ph-item text-white">Loading......</td>
                  <td className="text-white">Loading........</td>
                  <td className="text-white">Loading@gmail.com......</td>
                  <td className="ph-item text-white">+880141444444.....</td>
                  <td className="text-white">Loading......</td>
                  <td className="text-white">Loading...</td>
                  <td className="ph-item text-white"> Loading...</td>
                  <td className="text-white">Loading...</td>
                  <td className="text-white">Loading...</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="ph-item py-4"></td>
                  <td></td>
                  <td></td>
                  <td className="ph-item"></td>
                  <td></td>
                  <td></td>
                  <td className="ph-item"></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="ph-item text-white">Loading......</td>
                  <td className="text-white">Loading........</td>
                  <td className="text-white">Loading@gmail.com......</td>
                  <td className="ph-item text-white">+880141444444.....</td>
                  <td className="text-white">Loading......</td>
                  <td className="text-white">Loading...</td>
                  <td className="ph-item text-white"> Loading...</td>
                  <td className="text-white">Loading...</td>
                  <td className="text-white">Loading...</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="ph-item py-4"></td>
                  <td></td>
                  <td></td>
                  <td className="ph-item"></td>
                  <td></td>
                  <td></td>
                  <td className="ph-item"></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="ph-item text-white">Loading......</td>
                  <td className="text-white">Loading........</td>
                  <td className="text-white">Loading@gmail.com......</td>
                  <td className="ph-item text-white">+880141444444.....</td>
                  <td className="text-white">Loading......</td>
                  <td className="text-white">Loading...</td>
                  <td className="ph-item text-white"> Loading...</td>
                  <td className="text-white">Loading...</td>
                  <td className="text-white">Loading...</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="ph-item py-4"></td>
                  <td></td>
                  <td></td>
                  <td className="ph-item"></td>
                  <td></td>
                  <td></td>
                  <td className="ph-item"></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            )}
          </Table>
        </div>
        <div className="d-flex d-lg-none">
          {data.length > 0 ? (
            <div>
              {currentPage
                ?.filter(
                  (item) =>
                    item.reg_id
                      .toString()
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    item.reg_mobile
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    item.reg_fullname
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    item.is_admission_done
                      .toString()
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    item.date_time
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    item.reg_email
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                )
                .map((item, index) => (
                  <div className="col-lg-4 col-md-6 col-sm-12 CardColor1 card shadow-sm border-0 mt-3 px-4 mr-3" key={index}>
                    <div className="profileCardPadding  hw-data">
                      <div className="row">
                        <div className="row w-100 m-0 p-0">
                          <h6 className="courseTitle col-md-4 col-sm-4 px-sm-3 col-3 p-0">
                            <span className="TextBold">Id :</span>
                          </h6>
                          <h6 className="courseTitle col-md-7 col-sm-7 col-9">
                            {" "}
                            {item.reg_id}
                          </h6>
                        </div>
                        <div className="row w-100 m-0 p-0">
                          <h6 className="courseTitle col-md-4 col-sm-4 px-sm-3 col-3 p-0">
                            <span className="TextBold">Name :</span>
                          </h6>
                          <h6 className="courseTitle col-md-7 col-sm-7 col-9">
                            {item.reg_fullname}
                          </h6>
                        </div>
                        <div className="row w-100 m-0 p-0">
                          <h6 className="courseTitle col-md-4 col-sm-4 px-sm-3 col-3 p-0">
                            <span className="TextBold">Email :</span>
                          </h6>
                          <h6 className="courseTitle col-md-7 col-sm-7 col-9">
                            {item.reg_email}{" "}
                          </h6>
                        </div>
                        <div className="row w-100 m-0 p-0">
                          <h6 className="courseTitle col-md-4 col-sm-4 px-sm-3 col-3 p-0">
                            <span className="TextBold">Mobile :</span>
                          </h6>
                          <h6 className="courseTitle col-md-7 col-sm-7 col-9">
                            {item.reg_mobile}
                          </h6>
                        </div>
                        <div className="row w-100 m-0 p-0">
                          <h6 className="courseTitle col-md-4 col-sm-4 px-sm-3 col-3 p-0">
                            <span className="TextBold">Active Day :</span>
                          </h6>
                          <h6 className="courseTitle col-md-7 col-sm-7 col-9">
                            {item.day_active}
                          </h6>
                        </div>
                        <div className="row w-100 m-0 p-0">
                          <h6 className="courseTitle col-md-4 col-sm-4 px-sm-3 col-3 p-0">
                            <span className="TextBold">Admission :</span>
                          </h6>
                          {/* <h6 className="courseTitle col-md-7 col-sm-7 col-9">{this.state.ProfileData.gender}</h6> */}
                          {item.is_admission_done && (
                            <h6 className="courseTitle col-md-7 col-sm-7 col-9">
                              {" "}
                              true
                            </h6>
                          )}
                          {!item.is_admission_done && (
                            <h6 className="courseTitle col-md-7 col-sm-7 col-9">
                              {" "}
                              false
                            </h6>
                          )}
                        </div>
                        <div className="row w-100 m-0 p-0">
                          <h6 className="courseTitle col-md-4 col-sm-4 px-sm-3 col-3 p-0">
                            <span className="TextBold">Active :</span>
                          </h6>
                          {item.is_active && (
                            <h6 className="courseTitle col-md-7 col-sm-7 col-9">
                              True
                            </h6>
                          )}
                          {!item.is_active && (
                            <h6 className="courseTitle col-md-7 col-sm-7 col-9">
                              {" "}
                              False
                            </h6>
                          )}
                        </div>
                        <div>
                          <Button
                            className="mx-auto text-right btn-sm btn "
                            onClick={() => handleShow(item)}
                          >
                            Update
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="col-lg-4 col-md-6 col-sm-12 CardColor1 card shadow-sm border-0 mt-3 px-4 mr-3 ph-item">
              <div className="profileCardPadding  hw-data">
                <div className="row">
                  <div className="row w-100 m-0 p-0">
                    <h6 className="courseTitle col-md-4 col-sm-4 px-sm-3 col-3 p-0">
                      <span className="TextBold">Id :</span>
                    </h6>
                    <h6 className="courseTitle col-md-7 col-sm-7 col-9">
                      {" "}
                      Loading.....
                    </h6>
                  </div>
                  <div className="row w-100 m-0 p-0">
                    <h6 className="courseTitle col-md-4 col-sm-4 px-sm-3 col-3 p-0">
                      <span className="TextBold">Name :</span>
                    </h6>
                    <h6 className="courseTitle col-md-7 col-sm-7 col-9">
                      Loading....
                    </h6>
                  </div>
                  <div className="row w-100 m-0 p-0">
                    <h6 className="courseTitle col-md-4 col-sm-4 px-sm-3 col-3 p-0">
                      <span className="TextBold">Email :</span>
                    </h6>
                    <h6 className="courseTitle col-md-7 col-sm-7 col-9">
                      Loading .....
                    </h6>
                  </div>
                  <div className="row w-100 m-0 p-0">
                    <h6 className="courseTitle col-md-4 col-sm-4 px-sm-3 col-3 p-0">
                      <span className="TextBold">Mobile :</span>
                    </h6>
                    <h6 className="courseTitle col-md-7 col-sm-7 col-9">
                      Loading....
                    </h6>
                  </div>
                  <div className="row w-100 m-0 p-0">
                    <h6 className="courseTitle col-md-4 col-sm-4 px-sm-3 col-3 p-0">
                      <span className="TextBold">Active Day </span>
                    </h6>
                    <h6 className="courseTitle col-md-7 col-sm-7 col-9">
                      Loading....
                    </h6>
                  </div>
                  <div className="row w-100 m-0 p-0">
                    <h6 className="courseTitle col-md-4 col-sm-4 px-sm-3 col-3 p-0">
                      <span className="TextBold">Admission </span>
                    </h6>
                    {/* <h6 className="courseTitle col-md-7 col-sm-7 col-9">{this.state.ProfileData.gender}</h6> */}
                    <h6 className="courseTitle col-md-7 col-sm-7 col-9">
                      {" "}
                      Loading....
                    </h6>
                    {/* {!item.is_admission_done && <h6 className="courseTitle col-md-7 col-sm-7 col-9"> Loading</h6>} */}
                  </div>
                  <div className="row w-100 m-0 p-0">
                    <h6 className="courseTitle col-md-4 col-sm-4 px-sm-3 col-3 p-0">
                      <span className="TextBold">Active :</span>
                    </h6>
                    <h6 className="courseTitle col-md-7 col-sm-7 col-9">
                      Loading....
                    </h6>
                  </div>
                  <div>
                    <Button className="mx-auto text-right btn-sm btn ">
                      Loading.....
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex text-break"></div>
        </div>
        <Pagination
          onChange={(value) => setPage(value)}
          pageSize={postPerPage}
          total={total}
          current={page}
          className="py-5 text-center"
        />
      </div>
    </Fragment>
  );
};

export default Extra;

