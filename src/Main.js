import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { Icon, InlineIcon } from '@iconify/react';
import personCircle from '@iconify/icons-bi/person-circle';
import deleteOutlined from '@iconify/icons-ant-design/delete-outlined';
import Typography from '@material-ui/core/Typography';
import './stylesheets/home.css';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import manOutline from '@iconify/icons-ion/man-outline';
import womanOutline from '@iconify/icons-ion/woman-outline';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Link, Router } from 'react-router-dom'
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import outlineLibraryAdd from '@iconify/icons-ic/outline-library-add';
import closeCircleOutlined from '@iconify/icons-ant-design/close-circle-outlined';
import axios from 'axios';

const resblue = "#256DDA80";
const kindagrey = "#BEBEBE";

const useStyles = (theme) => ({
    root: {
        width: '100%',
        "& $notchedOutline": {
            borderWidth: "2px",
            borderColor: resblue
        },
        "&:hover $notchedOutline": {
            borderWidth: "2px",
            borderColor: resblue
        },
        "&$focused $notchedOutline": {
            borderWidth: "2px",
            borderColor: resblue
        },
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    icon: {
        color: "#BEBEBE",
        "&$activeIcon": {
            color: resblue
        },
        "&$completedIcon": {
            color: resblue
        },
    },

    activeIcon: {},
    completedIcon: {},
    focused: {},
    notchedOutline: {}
});

const GreenCheckbox = withStyles({
    root: {
      color: kindagrey,
      '&$checked': {
        color: resblue,
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

function getSteps() {
    return ['Personal', 'Academic', 'Projects', 'Platforms', 'Positions'];
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            rows: [{}],
            projects: [{}],
            workex: [{}],
            core: [],
            depth: [],
            pos: [{}],
            eca: [{}],
            psOther: false,
            psOtl: [],
            softskills: [],
            os: [],
            fname: "",
            lname: "",
            dob: "" ,
            isMale: false,
            isFemale: false,
            branch: "",
            enrollment: "",
            year: "",
            email: "",
            phone: "",
            gyear: "",
            gcgpa: "",
            hs: "",
            hsyear: "",
            hsboard: "",
            hsinsti: "",
            hscgpa:"",
            ssyear: "",
            ssboard: "",
            ssinsti: "",
            sscgpa:""
        }
    }


    removeCore = (i) => {
        const newTags = [ ...this.state.core ];
        newTags.splice(i, 1);
        this.setState({ core: newTags });
    }

    removeDepth = (i) => {
        const newTags = [ ...this.state.depth ];
        newTags.splice(i, 1);
        this.setState({ depth: newTags });
    }

    addCore = (e) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            if (this.state.core.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            this.setState({ core: [...this.state.core, val]});
            e.target.value = null;
        }
    }

    addDepth= (e) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            if (this.state.depth.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            this.setState({ depth: [...this.state.depth, val]});
            e.target.value = null;
        }
    }

    addPs = (e) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            if (this.state.psOtl.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            this.setState({ psOtl: [...this.state.psOtl, val]});
            e.target.value = null;
        }
    }

    removePs = (i) => {
        const newTags = [ ...this.state.psOtl ];
        newTags.splice(i, 1);
        this.setState({ psOtl: newTags });
    }

    handleNext = () => {
        this.setState(state => ({
            activeStep: this.state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: this.state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    onSubmit = () => {
        const resume = {
            first_name: this.state.fname,
            last_name: this.state.lname,
            dob: this.state.dob,
            gender: this.state.isMale ? "M" : "F",
            branch: this.state.branch,
            enrollment_no: this.state.enrollment,
            year_of_study: this.state.year,
            email_id: this.state.email,
            phone_no: this.state.phone,
            grad_year: this.state.gyear,
            grad_cgpa: this.state.gcgpa,
            high_school: this.state.hs,
            high_school_year: this.state.hsyear,
            high_school_board: this.state.hsboard,
            high_school_institute: this.state.hsinsti,
            high_school_cgpa: this.state.hscgpa,
            secondary_school_year: this.state.ssyear,
            secondary_school_board: this.state.ssboard,
            secondary_school_institute: this.state.ssinsti,
            secondary_school_cgpa: this.state.sscgpa,
            scholastic_achievements: this.state.rows,
            projects: this.state.projects,
            work_experience: this.state.workex,
            platforms_os: this.state.os,
            platforms_ps: this.state.psOtl,
            platforms_ss: this.state.softskills,
            courses_core: this.state.core,
            courses_depth: this.state.depth,
            positions: this.state.pos,
            extracurricular: this.state.eca
        }
        axios.post('http://127.0.0.1:5000/', resume)
        .then(function (response) {
            console.log(response);
        });
    }
    handleChange = idx => e => {
        const { name, value } = e.target;
        const rows = [...this.state.rows];
        rows[idx] = {
            [name]: value
        };
        this.setState({
            rows
        });
    };
    handleAddRow = () => {
        const item = {
            description: "",
            duration: ""
        };
        this.setState({
            rows: [...this.state.rows, item],
        });
        console.log(this.state.rows);
    };
    handleAddProject = () => {
        const item = {
            title: "",
            duration: "",
            description: ""
        };
        this.setState({
            projects: [...this.state.projects, item],
        });
    };
    handleAddWork = () => {
        const item = {
            place: "",
            duration: "",
            description: ""
        };
        this.setState({
            workex: [...this.state.workex, item],
        });
    };
    handleAddPos = () => {
        const item = {
            position: "",
            duration: "",
            description: ""
        };
        this.setState({
            pos: [...this.state.pos, item],
        });
    };
    handleAddEca = () => {
        const item = {
            event: "",
            duration: "",
            description: ""
        };
        this.setState({
            eca: [...this.state.eca, item],
        });
    };
    handleRemoveRow = () => {
        this.setState({
            rows: this.state.rows.slice(0, -1)
        });
    };
    handleRemoveProject = () => {
        this.setState({
            projects: this.state.projects.slice(0, -1)
        });
    };
    handleRemoveWork = () => {
        this.setState({
            workex: this.state.workex.slice(0, -1)
        });
    };
    handleRemovePos = () => {
        this.setState({
            pos: this.state.pos.slice(0, -1)
        });
    };
    handleRemoveEca = () => {
        this.setState({
            eca: this.state.eca.slice(0, -1)
        });
    };
    handlepsOt = () => {
        console.log(this.state.psOther);
        this.setState({
            psOther: !this.state.psOther
        })
    }

    onFNameChange = (e) => {
        this.setState({
            fname: e.target.value
        })
    }

    onLNameChange = (e) => {
        this.setState({
            lname: e.target.value
        })
    }

    onDobChange = (e) => {
        console.log(e.target.value);
        this.setState({
            dob: e.target.value
        })
    }

    setMale = () => {
        this.setState({
            isMale: true,
            isFemale: false
        })
    }

    setFemale = () => {
        this.setState({
            isFemale: true,
            isMale: false
        })
    }

    setBranch = (e) => {
        this.setState({
            branch: e.target.value
        })
    }

    onEnrollmentChange = (e) => {
        this.setState({
            enrollment: e.target.value
        })
    }

    setYear = (e) => {
        this.setState({
            year: e.target.value
        })
    }

    setEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    setPhone = (e) => {
        this.setState({
            phone: e.target.value
        })
    }

    setGyear = (e) => {
        this.setState({
            gyear: e.target.value
        })
    }

    setGcgpa = (e) => {
        this.setState({
            gcgpa: e.target.value
        })
    }

    setHs = (e) => {
        this.setState({
            hs: e.target.value
        })
    }

    setHsy = (e) => {
        this.setState({
            hsyear: e.target.value
        })
    }

    setHsb = (e) => {
        this.setState({
            hsboard: e.target.value
        })
    }

    setHsi = (e) => {
        this.setState({
            hsinsti: e.target.value
        })
    }

    setHscg = (e) => {
        this.setState({
            hscgpa: e.target.value
        })
    }

    setSsy = (e) => {
        this.setState({
            ssyear: e.target.value
        })
    }

    setSsb = (e) => {
        this.setState({
            ssboard: e.target.value
        })
    }

    setSsi = (e) => {
        this.setState({
            ssinsti: e.target.value
        })
    }

    setSscg = (e) => {
        this.setState({
            sscgpa: e.target.value
        })
    }

    setSdesc = idx => e => {
        this.setState({
            ...this.state.rows[idx].description = e.target.value
        })
    };

    setSyear = idx => e => {
        this.setState({
            ...this.state.rows[idx].duration = e.target.value
        })
    };

    handleRemoveSpecificRow = (idx) => () => {
        const rows = [...this.state.rows]
        rows.splice(idx, 1)
        this.setState({ rows })
    }

    setPtitle = idx => e => {
        this.setState({
            ...this.state.projects[idx].title= e.target.value
        })
    };

    setPdesc = idx => e => {
        this.setState({
            ...this.state.projects[idx].description = e.target.value
        })
    };

    setPdur = idx => e => {
        this.setState({
            ...this.state.projects[idx].duration = e.target.value
        })
    };

    setWplace = idx => e => {
        this.setState({
            ...this.state.workex[idx].place= e.target.value
        })
    };

    setWdesc = idx => e => {
        this.setState({
            ...this.state.workex[idx].description = e.target.value
        })
    };

    setWdur = idx => e => {
        this.setState({
            ...this.state.workex[idx].duration = e.target.value
        })
    };

    addSoftskill = (e) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            if (this.state.softskills.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            this.setState({ softskills: [...this.state.softskills, val]});
            e.target.value = null;
        }
    }

    removeSoftskill = (i) => {
        const newTags = [ ...this.state.softskills ];
        newTags.splice(i, 1);
        this.setState({ softskills: newTags });
    }

    addOs = (e) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            if (this.state.os.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            this.setState({ os: [...this.state.os, val]});
            e.target.value = null;
        }
    }

    removeOs = (i) => {
        const newTags = [ ...this.state.os ];
        newTags.splice(i, 1);
        this.setState({ os: newTags });
    }

    setPosp = idx => e => {
        this.setState({
            ...this.state.pos[idx].position= e.target.value
        })
    };

    setPosdur = idx => e => {
        this.setState({
            ...this.state.pos[idx].duration = e.target.value
        })
    };

    setPosdesc = idx => e => {
        this.setState({
            ...this.state.pos[idx].description = e.target.value
        })
    };

    setEcae = idx => e => {
        this.setState({
            ...this.state.eca[idx].event= e.target.value
        })
    };

    setEcadur= idx => e => {
        this.setState({
            ...this.state.eca[idx].duration = e.target.value
        })
    };

    setEcadesc = idx => e => {
        this.setState({
            ...this.state.eca[idx].description = e.target.value
        })
    };


    getStepContent = (stepIndex) => {
        const { classes } = this.props;
        const { core, depth } = this.state;
        switch (stepIndex) {
            case 0:
                return (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
                        <div>
                            <Icon icon={personCircle} style={{ fontSize: '200px', color: "#256DDA80", marginTop: '30%', marginLeft: '20%' }} />
                        </div>
                        <div style={{ width: "30px", display: "table" }}>
                            <Typography style={{ fontFamily: 'Poppins', color: "#BEBEBE", fontSize: "20px", marginTop: "15px", marginRight: "10px" }}>
                                Name
                            </Typography>
                            <Typography style={{ fontFamily: 'Poppins', color: "#BEBEBE", fontSize: "20px", marginTop: "60px", marginRight: "10px" }}>
                                D.O.B
                            </Typography>
                            <Typography style={{ fontFamily: 'Poppins', color: "#BEBEBE", fontSize: "20px", marginTop: "50px", marginRight: "10px" }}>
                                Gender
                            </Typography>
                            <Typography style={{ fontFamily: 'Poppins', color: "#BEBEBE", fontSize: "20px", marginTop: "50px", marginRight: "10px" }}>
                                College
                            </Typography>
                            <Typography style={{ fontFamily: 'Poppins', color: "#BEBEBE", fontSize: "20px", marginTop: "60px", marginRight: "10px" }}>
                                Email
                            </Typography>
                            <Typography style={{ fontFamily: 'Poppins', color: "#BEBEBE", fontSize: "20px", marginTop: "60px", marginRight: "10px" }}>
                                Phone
                            </Typography>
                        </div>
                        <div style={{ marginLeft: "-400px" }}>
                            <div style={{ flexDirection: "row", display: "inline-flex" }}>
                                <TextField id="outlined-basic" label="First" variant="outlined" value={this.state.fname} onChange={this.onFNameChange} style={{ marginRight: "20px" }} InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }} />
                                <TextField id="outlined-basic" label="Last" variant="outlined" value={this.state.lname} onChange={this.onLNameChange} style={{ marginRight: "20px" }} InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }} />
                            </div>
                            <br />
                            <div style={{ flexDirection: "row", display: "inline-flex", marginTop: "30px" }}>
                                <TextField id="outlined-basic" type="date" variant="outlined" value={this.state.dob} onChange={this.onDobChange} style={{ marginRight: "20px" }} InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }} />
                            </div>
                            <br />
                            <div style={{ flexDirection: "row", display: "inline-flex", marginTop: "30px" }}>

                                <FormControlLabel
                                    control={<Checkbox icon={<Icon icon={manOutline} style={{ fontSize: '32px' }} />} checked={this.state.isMale} onChange={this.setMale} checkedIcon={<Icon icon={manOutline} style={{ fontSize: '32px' }} color={resblue} />} name="checkedH" />}
                                    label="Male"
                                />
                                <FormControlLabel
                                    control={<Checkbox icon={<Icon icon={womanOutline} style={{ fontSize: '32px' }} />} checked={this.state.isFemale} onChange={this.setFemale} checkedIcon={<Icon icon={womanOutline} style={{ fontSize: '32px' }} color={resblue} />} name="checkedH" />}
                                    label="Female"
                                />
                            </div>
                            <br />
                            <div style={{ flexDirection: "row", display: "inline-flex", marginTop: "30px" }}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel>Branch</InputLabel>
                                    <Select
                                        style={{ width: "150px" }}
                                        input={
                                            <OutlinedInput
                                                label="Branch"
                                                classes={classes}
                                            />
                                        }
                                        value={this.state.branch}
                                        onChange={this.setBranch}
                                    >
                                        <MenuItem value={"Biomedical Engineering"}>Biomedical Engineering</MenuItem>
                                        <MenuItem value={"Civil Engineering"}>Civil Engineering</MenuItem>
                                        <MenuItem value={"Computer Science"}>Computer Science</MenuItem>
                                        <MenuItem value={"Electronics and Telecommunications"}>Electronics and Telecommunications</MenuItem>
                                        <MenuItem value={"Electrical Engineering"}>Electrical Engineering</MenuItem>
                                        <MenuItem value={"Electronics and Instrumentations"}>Electronics and Instrumentations</MenuItem>
                                        <MenuItem value={"Industrial Productions"}>Industrial Productions</MenuItem>
                                        <MenuItem value={"Information Technology"}>Information Technology</MenuItem>
                                        <MenuItem value={"Mechanical Engineering"}>Mechanical Engineering</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField id="outlined-basic" label="Enrollment no." variant="outlined" value={this.state.enrollment} onChange={this.onEnrollmentChange} style={{ width: '30%', marginLeft: "10px" }} InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }} />
                                <FormControl variant="outlined" className={classes.formControl} style={{ marginLeft: "10px" }}
                                >
                                    <InputLabel>Year</InputLabel>
                                    <Select
                                        input={
                                            <OutlinedInput
                                                label="Year"
                                                style={{ width: "80px" }}
                                                classes={classes}
                                            />
                                        }
                                        value={this.state.year}
                                        onChange={this.setYear}
                                    >
                                        <MenuItem value={"1st"}>1st</MenuItem>
                                        <MenuItem value={"2nd"}>2nd</MenuItem>
                                        <MenuItem value={"3rd"}>3rd</MenuItem>
                                        <MenuItem value={"4th"}>4th</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <br />
                            <div style={{ flexDirection: "row", display: "inline-flex", marginTop: "30px" }}>
                                <TextField id="outlined-basic" variant="outlined" value={this.state.email} onChange={this.setEmail} style={{ marginRight: "20px" }} InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }} />
                            </div>
                            <br />
                            <div style={{ flexDirection: "row", display: "inline-flex", marginTop: "30px" }}>
                                <TextField id="outlined-basic" variant="outlined"  value={this.state.phone} onChange={this.setPhone} style={{ marginRight: "20px" }} InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }} />
                            </div>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '25vw', marginRight: '25vw' }}>
                            <Typography style={{ fontFamily: 'Poppins', color: "#BEBEBE", fontSize: "20px", marginTop: "15px", marginRight: "10px" }}>
                                Graduation
                            </Typography>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel>Year</InputLabel>
                                <Select
                                    style={{ width: "150px" }}
                                    input={
                                        <OutlinedInput
                                            label="Year"
                                            classes={classes}
                                        />
                                    }
                                    value={this.state.gyear}
                                    onChange={this.setGyear}
                                >
                                    <MenuItem value={"2021"}>2021</MenuItem>
                                    <MenuItem value={"2022"}>2022</MenuItem>
                                    <MenuItem value={"2023"}>2023</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField id="outlined-basic" label="CGPA" value={this.state.gcgpa} onChange={this.setGcgpa} variant="outlined" style={{ width: '30%', marginLeft: "10px" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                        </div>
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10vw', marginRight: '10vw' }}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>High School</InputLabel>
                                <Select
                                    style={{ width: "180px" }}
                                    value={this.state.hs}
                                    onChange={this.setHs}
                                >
                                    <MenuItem value={"12th"}>12th</MenuItem>
                                    <MenuItem value={"Diploma"}>Diploma</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField id="outlined-basic" label="Year" value={this.state.hsyear} onChange={this.setHsy} variant="outlined" style={{ width: '30%', marginLeft: "100px" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                            <TextField id="outlined-basic" label="Board" value={this.state.hsboard} onChange={this.setHsb} variant="outlined" style={{ width: '30%', marginLeft: "10px" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                            <TextField id="outlined-basic" label="Institute" value={this.state.hsinsti} onChange={this.setHsi} variant="outlined" style={{ width: '30%', marginLeft: "10px" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                            <TextField id="outlined-basic" label="CGPA" value={this.state.hscgpa} onChange={this.setHscg} variant="outlined" style={{ width: '30%', marginLeft: "10px" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10vw', marginRight: '10vw', marginTop: '2vh' }}>
                            <Typography style={{ fontFamily: 'Poppins', color: "#BEBEBE", fontSize: "20px", marginTop: "15px", marginRight: "10px", width: "180px" }}>
                                10th
                            </Typography>
                            <TextField id="outlined-basic" label="Year" value={this.state.setSyear} onChange={this.setSsy} variant="outlined" style={{ width: '30%', marginLeft: "90px" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                            <TextField id="outlined-basic" label="Board" value={this.state.ssboard} onChange={this.setSsb} variant="outlined" style={{ width: '30%', marginLeft: "10px" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                            <TextField id="outlined-basic" label="Institute" value={this.state.ssinsti} onChange={this.setSsi} variant="outlined" style={{ width: '30%', marginLeft: "10px" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                            <TextField id="outlined-basic" label="CGPA" value={this.state.sscgpa} onChange={this.setSscg} variant="outlined" style={{ width: '30%', marginLeft: "10px" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10vw', marginRight: '10vw', marginTop: '2vh' }}>
                            <Typography style={{ fontFamily: 'Poppins', fontSize: "20px", marginTop: "15px", marginRight: "10px" }}>
                                Scholastic achievements
                            </Typography>
                        </div>
                        <table>
                            <tbody>
                                {this.state.rows.map((item, idx) => (
                                    <tr id="addr0" key={idx}>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '25.8vw', marginRight: '20vw', marginTop: '2vh' }}>
                                            <TextField id="outlined-basic" label="Description" value={this.state.rows[idx].description} onChange={this.setSdesc(idx)} variant="outlined" style={{ width: '25vw', marginLeft: "10px" }} InputProps={{
                                                classes: {
                                                    notchedOutline: classes.notchedOutline
                                                }
                                            }} />

                                            <TextField id="outlined-basic" label="Duration" value={this.state.rows[idx].year} onChange={this.setSyear(idx)} variant="outlined" style={{ width: '15vw', marginLeft: "10px" }} InputProps={{
                                                classes: {
                                                    notchedOutline: classes.notchedOutline
                                                }
                                            }} />
                                            <Icon icon={closeCircleOutlined} color={"red"} style={{fontSize: "32px", marginLeft: "0.5vw"}} onClick={this.handleRemoveSpecificRow(idx)}/>
                                        </div>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div style={{ display: 'flex', marginLeft: "65vw", marginTop: '2vh' }}>
                        <Icon icon={outlineLibraryAdd} style={{ fontSize: "28px", marginLeft: "2vw", marginRight: "1vw" }} onClick={this.handleAddRow} />
                            {this.state.rows.length > 0 ? (
                                <Icon icon={deleteOutlined} style={{ fontSize: "28px"}} onClick={this.handleRemoveRow} />
                            ) : (
                                    <div>
                                    </div>
                                )}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <Typography style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Poppins', fontSize: "40px", marginTop: "15px", marginRight: "10px" }}>
                            Projects
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                            <table>
                                <tbody>
                                    {this.state.projects.map((item, idx) => (
                                        <tr id="addr0" key={idx}>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                                                <TextField id="outlined-basic" label="Title" variant="outlined" value={this.state.projects[idx].title} onChange={this.setPtitle(idx)} style={{ width: '20vw' }} InputProps={{
                                                    classes: {
                                                        notchedOutline: classes.notchedOutline
                                                    }
                                                }} />
                                                <TextField id="outlined-basic" label="Duration" variant="outlined" value={this.state.projects[idx].duration} onChange={this.setPdur(idx)} style={{ width: '20vw', marginLeft: "2vw" }} InputProps={{
                                                    classes: {
                                                        notchedOutline: classes.notchedOutline
                                                    }
                                                }} />
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                                                <TextField multiline rows={8} id="outlined-basic" label="Description" variant="outlined" value={this.state.projects[idx].description} onChange={this.setPdesc(idx)} style={{ width: '42vw', marginTop: "2vh" }} InputProps={{
                                                    classes: {
                                                        notchedOutline: classes.notchedOutline
                                                    }
                                                }} />
                                            </div>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div style={{ display: 'flex', marginLeft: "65vw", marginTop: '2vh' }}>
                        <Icon icon={outlineLibraryAdd} style={{ fontSize: "28px", marginLeft: "1vw", marginRight: "1vw" }} onClick={this.handleAddProject} />
                            {this.state.projects.length > 0 ? (
                                <Icon icon={deleteOutlined} style={{ fontSize: "28px"}} onClick={this.handleRemoveProject} />
                            ) : (
                                    <div>
                                    </div>
                                )}
                        </div>
                        <Typography style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Poppins', fontSize: "40px", marginTop: "15px", marginRight: "10px" }}>
                            Work Experience
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                            <table>
                                <tbody>
                                    {this.state.workex.map((item, idx) => (
                                        <tr id="addr0" key={idx}>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                                                <TextField id="outlined-basic" label="Place" variant="outlined" value={this.state.workex[idx].place} onChange={this.setWplace(idx)} style={{ width: '20vw' }} InputProps={{
                                                    classes: {
                                                        notchedOutline: classes.notchedOutline
                                                    }
                                                }} />
                                                <TextField id="outlined-basic" label="Duration" variant="outlined" value={this.state.workex[idx].duration} onChange={this.setWdur(idx)} style={{ width: '20vw', marginLeft: "2vw" }} InputProps={{
                                                    classes: {
                                                        notchedOutline: classes.notchedOutline
                                                    }
                                                }} />
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                                                <TextField multiline rows={8} id="outlined-basic" label="Description" variant="outlined" value={this.state.workex[idx].description} onChange={this.setWdesc(idx)} style={{ width: '42vw', marginTop: "2vh" }} InputProps={{
                                                    classes: {
                                                        notchedOutline: classes.notchedOutline
                                                    }
                                                }} />
                                            </div>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div style={{ display: 'flex', marginLeft: "65vw", marginTop: '2vh' }}>
                        <Icon icon={outlineLibraryAdd} style={{ fontSize: "28px", marginLeft: "1vw", marginRight: "1vw" }} onClick={this.handleAddWork} />
                            {this.state.workex.length > 0 ? (
                                <Icon icon={deleteOutlined} style={{ fontSize: "28px"}} onClick={this.handleRemoveWork} />
                            ) : (
                                    <div>
                                    </div>
                                )}
                        </div>
                    </div>
                );
            case 3:
                return(
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Typography style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Poppins', fontSize: "40px", marginTop: "15px", marginRight: "10px" }}>
                                Platforms Worked
                            </Typography>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ width: "20vw", display: "table", marginLeft: "25vw", marginTop: "5vh" }}>
                                <Typography style={{ fontFamily: 'Poppins', color: "#BEBEBE", fontSize: "30px"}}>
                                    Operating Skills
                                </Typography>
                                <Typography style={{ fontFamily: 'Poppins', color: "#BEBEBE", fontSize: "30px", marginTop: "1vh"}}>
                                    Programming Skills
                                </Typography>
                                <Typography style={{ fontFamily: 'Poppins', color: "#BEBEBE", fontSize: "30px", marginTop: "1vh"}}>
                                    Software Skills
                                </Typography>
                            </div>
                            <div style={{display: "table", marginTop: "5vh" }}>
                                <div style={{ display: 'flex', marginTop: "1vh"}}>
                                    <ul className="input-tag__tags">
                                        {this.state.os.map((tag, i) => (
                                            <li key={tag}>
                                                {tag}
                                                <Icon icon={closeCircleOutlined} color={"red"} style={{fontSize: "28px", marginLeft: "0.5vw"}} onClick={() => { this.removeOs(i); }}/>
                                            </li>
                                        ))}
                                        <li className="input-tag__tags__input">
                                            <TextField onKeyDown={this.addOs} id="outlined-basic" variant="outlined" style={{ width: '10vw' }} InputProps={{
                                                classes: {
                                                    notchedOutline: classes.notchedOutline
                                                },
                                                style: {
                                                    height: '40px'
                                                }
                                            }} />
                                        </li>
                                    </ul>
                                </div>
                                <div style={{ display: 'flex', marginTop: "1vh"}}>
                                    <ul className="input-tag__tags">
                                        {this.state.psOtl.map((tag, i) => (
                                            <li key={tag}>
                                                {tag}
                                                <Icon icon={closeCircleOutlined} color={"red"} style={{fontSize: "28px", marginLeft: "0.5vw"}} onClick={() => { this.removePs(i); }}/>
                                            </li>
                                        ))}
                                        <li className="input-tag__tags__input">
                                            <TextField onKeyDown={this.addPs} id="outlined-basic" variant="outlined" style={{ width: '10vw' }} InputProps={{
                                                classes: {
                                                    notchedOutline: classes.notchedOutline
                                                },
                                                style: {
                                                    height: '40px'
                                                }
                                            }} />
                                        </li>
                                    </ul>
                                </div>
                                <div style={{ display: 'flex', marginTop: "1vh"}}>
                                    <ul className="input-tag__tags">
                                        {this.state.softskills.map((tag, i) => (
                                            <li key={tag}>
                                                {tag}
                                                <Icon icon={closeCircleOutlined} color={"red"} style={{fontSize: "28px", marginLeft: "0.5vw"}} onClick={() => { this.removeSoftskill(i); }}/>
                                            </li>
                                        ))}
                                        <li className="input-tag__tags__input">
                                            <TextField onKeyDown={this.addSoftskill} id="outlined-basic" variant="outlined" style={{ width: '10vw' }} InputProps={{
                                                classes: {
                                                    notchedOutline: classes.notchedOutline
                                                },
                                                style: {
                                                    height: '40px'
                                                }
                                            }} />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Typography style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Poppins', fontSize: "40px", marginTop: "30px", marginRight: "10px" }}>
                                Courses Undertaken
                            </Typography>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ width: "5vw", display: "table", marginLeft: "25vw", marginTop: "5vh" }}>
                                <Typography style={{ fontFamily: 'Poppins', color: "#BEBEBE", fontSize: "30px"}}>
                                    Core
                                </Typography>
                                <Typography style={{ fontFamily: 'Poppins', color: "#BEBEBE", fontSize: "30px"}}>
                                    Depth
                                </Typography>
                            </div>
                            <div style={{display: "table", marginTop: "4vh"}}>
                                <div style={{ display: 'flex', marginTop: "1vh"}}>
                                    <ul className="input-tag__tags">
                                        {core.map((tag, i) => (
                                            <li key={tag}>
                                                {tag}
                                                <Icon icon={closeCircleOutlined} color={"red"} style={{fontSize: "28px", marginLeft: "0.5vw"}} onClick={() => { this.removeCore(i); }}/>
                                            </li>
                                        ))}
                                        <li className="input-tag__tags__input">
                                            <TextField onKeyDown={this.addCore} id="outlined-basic" variant="outlined" style={{ width: '10vw' }} InputProps={{
                                                classes: {
                                                    notchedOutline: classes.notchedOutline
                                                },
                                                style: {
                                                    height: '40px'
                                                }
                                            }} />
                                        </li>
                                    </ul>
                                </div>
                                <div style={{ display: 'flex', marginTop: "1vh"}}>
                                    <ul className="input-tag__tags">
                                        {depth.map((tag, i) => (
                                            <li key={tag}>
                                                {tag}
                                                <Icon icon={closeCircleOutlined} color={"red"} style={{fontSize: "28px", marginLeft: "0.5vw"}} onClick={() => { this.removeDepth(i); }}/>
                                            </li>
                                        ))}
                                        <li className="input-tag__tags__input">
                                            <TextField onKeyDown={this.addDepth} id="outlined-basic" variant="outlined" style={{ width: '10vw' }} InputProps={{
                                                classes: {
                                                    notchedOutline: classes.notchedOutline
                                                },
                                                style: {
                                                    height: '40px'
                                                }
                                            }} />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return(
                    <div>
                        <Typography style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Poppins', fontSize: "40px", marginTop: "15px", marginRight: "10px" }}>
                            Position of responsiblities
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                            <table>
                                <tbody>
                                    {this.state.pos.map((item, idx) => (
                                        <tr id="addr0" key={idx}>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                                                <TextField id="outlined-basic" label="Position" variant="outlined" value={this.state.pos[idx].position} onChange={this.setPosp(idx)} style={{ width: '20vw' }} InputProps={{
                                                    classes: {
                                                        notchedOutline: classes.notchedOutline
                                                    }
                                                }} />
                                                <TextField id="outlined-basic" label="Duration" variant="outlined" value={this.state.pos[idx].duration} onChange={this.setPosdur(idx)} style={{ width: '20vw', marginLeft: "2vw" }} InputProps={{
                                                    classes: {
                                                        notchedOutline: classes.notchedOutline
                                                    }
                                                }} />
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                                                <TextField multiline rows={8} id="outlined-basic" label="Description" variant="outlined" value={this.state.pos[idx].description} onChange={this.setPosdesc(idx)} style={{ width: '42vw', marginTop: "2vh" }} InputProps={{
                                                    classes: {
                                                        notchedOutline: classes.notchedOutline
                                                    }
                                                }} />
                                            </div>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div style={{ display: 'flex', marginLeft: "65vw", marginTop: '2vh' }}>
                        <Icon icon={outlineLibraryAdd} style={{ fontSize: "28px", marginLeft: "1vw", marginRight: "1vw" }} onClick={this.handleAddPos} />
                            {this.state.pos.length > 0 ? (
                                <Icon icon={deleteOutlined} style={{ fontSize: "28px"}} onClick={this.handleRemovePos} />
                            ) : (
                                    <div>
                                    </div>
                                )}
                        </div>
                        <Typography style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Poppins', fontSize: "40px", marginTop: "15px", marginRight: "10px" }}>
                            Extracurricular activities
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                            <table>
                                <tbody>
                                    {this.state.eca.map((item, idx) => (
                                        <tr id="addr0" key={idx}>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                                                <TextField id="outlined-basic" label="Event" variant="outlined" value={this.state.eca[idx].event} onChange={this.setEcae(idx)} style={{ width: '20vw' }} InputProps={{
                                                    classes: {
                                                        notchedOutline: classes.notchedOutline
                                                    }
                                                }} />
                                                <TextField id="outlined-basic" label="Duration" variant="outlined" value={this.state.eca[idx].duration} onChange={this.setEcadur(idx)} style={{ width: '20vw', marginLeft: "2vw" }} InputProps={{
                                                    classes: {
                                                        notchedOutline: classes.notchedOutline
                                                    }
                                                }} />
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                                                <TextField multiline rows={8} id="outlined-basic" label="Description" variant="outlined" value={this.state.eca[idx].description} onChange={this.setEcadesc(idx)} style={{ width: '42vw', marginTop: "2vh" }} InputProps={{
                                                    classes: {
                                                        notchedOutline: classes.notchedOutline
                                                    }
                                                }} />
                                            </div>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div style={{ display: 'flex', marginLeft: "65vw", marginTop: '2vh' }}>
                        <Icon icon={outlineLibraryAdd} style={{ fontSize: "28px", marginLeft: "1vw", marginRight: "1vw" }} onClick={this.handleAddEca} />
                            {this.state.eca.length > 0 ? (
                                <Icon icon={deleteOutlined} style={{ fontSize: "28px"}} onClick={this.handleRemoveEca} />
                            ) : (
                                    <div>
                                    </div>
                                )}
                        </div>
                    </div>
                );
            default:
                return 'Unknown stepIndex';
        }
    }
    render() {
        const steps = getSteps();
        const { activeStep } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconProps={{ classes: { root: classes.icon, active: classes.activeIcon, completed: classes.completedIcon } }}>
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            {this.getStepContent(activeStep-1)}
                        </div>
                    ) : (
                            <div>
                                {this.getStepContent(activeStep)}
                            </div>
                        )}
                </div>
                <div style={{ position: "fixed", bottom: "5vh", right: "2vw" }}>
                    {activeStep === steps.length-1 ? (
                        <div>
                            <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.backButton}>
                                Back
                            </Button>
                            <Button onClick={this.onSubmit}>Submit</Button>
                        </div>
                    ) : (
                            <div>
                                <div>
                                    <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.backButton}>
                                        Back
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={this.handleNext}>
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles, { withTheme: true })(Main);
