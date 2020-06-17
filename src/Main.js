import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { Icon, InlineIcon } from '@iconify/react';
import personCircle from '@iconify/icons-bi/person-circle';
import archiveIcon from '@iconify/icons-bi/archive';
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

const resblue = "#256DDA80";
const kindagrey = "#BEBEBE";

const useStyles = (theme) => ({
    root: {
        width: '100%',
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
    notchedOutline: {
        borderWidth: "2px",
        borderColor: "#256DDA80 !important"
    },
    activeIcon: {},
    completedIcon: {}
});

const useOutlinedInputStyles = theme => ({
    root: {
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
        }
    },
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
            rows: [],
            projects: [],
            workex: [],
            core: [],
            depth: [],
            pos: [],
            eca: []
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
            this.tagInput1.value = null;
        }
    }

    addDepth= (e) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            if (this.state.depth.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            this.setState({ depth: [...this.state.depth, val]});
            this.tagInput2.value = null;
        }
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
            name: "",
            mobile: ""
        };
        this.setState({
            rows: [...this.state.rows, item],
        });
    };
    handleAddProject = () => {
        const item = {
            name: "",
            mobile: ""
        };
        this.setState({
            projects: [...this.state.projects, item],
        });
    };
    handleAddWork = () => {
        const item = {
            name: "",
            mobile: ""
        };
        this.setState({
            workex: [...this.state.workex, item],
        });
    };
    handleAddPos = () => {
        const item = {
            name: "",
            mobile: ""
        };
        this.setState({
            pos: [...this.state.pos, item],
        });
    };
    handleAddEca = () => {
        const item = {
            name: "",
            mobile: ""
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
    getStepContent = (stepIndex) => {
        const { outlinedInputClasses } = this.props;
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
                                <TextField id="outlined-basic" label="First" variant="outlined" style={{ marginRight: "20px" }} InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }} />
                                <TextField id="outlined-basic" label="Last" variant="outlined" style={{ marginRight: "20px" }} InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }} />
                            </div>
                            <br />
                            <div style={{ flexDirection: "row", display: "inline-flex", marginTop: "30px" }}>
                                <TextField id="outlined-basic" type="date" variant="outlined" style={{ marginRight: "20px" }} InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }} />
                            </div>
                            <br />
                            <div style={{ flexDirection: "row", display: "inline-flex", marginTop: "30px" }}>

                                <FormControlLabel
                                    control={<Checkbox icon={<Icon icon={manOutline} style={{ fontSize: '32px' }} />} checkedIcon={<Icon icon={manOutline} style={{ fontSize: '32px' }} color={resblue} />} name="checkedH" />}
                                    label="Male"
                                />
                                <FormControlLabel
                                    control={<Checkbox icon={<Icon icon={womanOutline} style={{ fontSize: '32px' }} />} checkedIcon={<Icon icon={womanOutline} style={{ fontSize: '32px' }} color={resblue} />} name="checkedH" />}
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
                                                classes={outlinedInputClasses}
                                            />
                                        }
                                    >
                                        <MenuItem value={10}>Computer Science</MenuItem>
                                        <MenuItem value={20}>Civil Engineering</MenuItem>
                                        <MenuItem value={30}>Biomedical Engineering</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField id="outlined-basic" label="Enrollment no." variant="outlined" style={{ width: '30%', marginLeft: "10px" }} InputProps={{
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
                                                classes={outlinedInputClasses}
                                            />
                                        }
                                    >
                                        <MenuItem value={10}>1</MenuItem>
                                        <MenuItem value={20}>2</MenuItem>
                                        <MenuItem value={30}>3</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <br />
                            <div style={{ flexDirection: "row", display: "inline-flex", marginTop: "30px" }}>
                                <TextField id="outlined-basic" variant="outlined" style={{ marginRight: "20px" }} InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }} />
                            </div>
                            <br />
                            <div style={{ flexDirection: "row", display: "inline-flex", marginTop: "30px" }}>
                                <TextField id="outlined-basic" variant="outlined" style={{ marginRight: "20px" }} InputProps={{
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
                                            classes={outlinedInputClasses}
                                        />
                                    }
                                >
                                    <MenuItem value={10}>2021</MenuItem>
                                    <MenuItem value={20}>2022</MenuItem>
                                    <MenuItem value={30}>2023</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField id="outlined-basic" label="CGPA" variant="outlined" style={{ width: '30%', marginLeft: "10px" }} InputProps={{
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
                                >
                                    <MenuItem value={10}>12th</MenuItem>
                                    <MenuItem value={20}>Diploma</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField id="outlined-basic" label="Year" variant="outlined" style={{ width: '30%', marginLeft: "100px" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                            <TextField id="outlined-basic" label="Board" variant="outlined" style={{ width: '30%', marginLeft: "10px" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                            <TextField id="outlined-basic" label="Institute" variant="outlined" style={{ width: '30%', marginLeft: "10px" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                            <TextField id="outlined-basic" label="CGPA" variant="outlined" style={{ width: '30%', marginLeft: "10px" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10vw', marginRight: '10vw', marginTop: '2vh' }}>
                            <Typography style={{ fontFamily: 'Poppins', color: "#BEBEBE", fontSize: "20px", marginTop: "15px", marginRight: "10px", width: "180px" }}>
                                10th
                </Typography>
                            <TextField id="outlined-basic" label="Year" variant="outlined" style={{ width: '30%', marginLeft: "90px" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                            <TextField id="outlined-basic" label="Board" variant="outlined" style={{ width: '30%', marginLeft: "10px" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                            <TextField id="outlined-basic" label="Institute" variant="outlined" style={{ width: '30%', marginLeft: "10px" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                            <TextField id="outlined-basic" label="CGPA" variant="outlined" style={{ width: '30%', marginLeft: "10px" }} InputProps={{
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
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '20vw', marginRight: '20vw', marginTop: '2vh' }}>
                            <TextField id="outlined-basic" label="Description" variant="outlined" style={{ width: '30%', marginLeft: "10px" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                            <FormControl variant="outlined" className={classes.formControl} style={{ marginLeft: "10px" }}>
                                <InputLabel>Month</InputLabel>
                                <Select
                                    style={{ width: "150px" }}
                                    input={
                                        <OutlinedInput
                                            label="Month"
                                            classes={outlinedInputClasses}
                                        />
                                    }
                                >
                                    <MenuItem value={10}>January</MenuItem>
                                    <MenuItem value={20}>February</MenuItem>
                                    <MenuItem value={30}>March</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField id="outlined-basic" label="Year" variant="outlined" style={{ width: '30%', marginLeft: "10px" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                        </div>
                        <table>
                            <tbody>
                                {this.state.rows.map((item, idx) => (
                                    <tr id="addr0" key={idx}>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '25.8vw', marginRight: '20vw', marginTop: '2vh' }}>
                                            <TextField id="outlined-basic" label="Description" variant="outlined" style={{ width: '17.7vw', marginLeft: "10px" }} InputProps={{
                                                classes: {
                                                    notchedOutline: classes.notchedOutline
                                                }
                                            }} />
                                            <FormControl variant="outlined" className={classes.formControl} style={{ marginLeft: "10px" }}>
                                                <InputLabel>Month</InputLabel>
                                                <Select
                                                    style={{ width: "150px" }}
                                                    input={
                                                        <OutlinedInput
                                                            label="Month"
                                                            classes={outlinedInputClasses}
                                                        />
                                                    }
                                                >
                                                    <MenuItem value={10}>January</MenuItem>
                                                    <MenuItem value={20}>February</MenuItem>
                                                    <MenuItem value={30}>March</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <TextField id="outlined-basic" label="Year" variant="outlined" style={{ width: '17.8vw', marginLeft: "10px" }} InputProps={{
                                                classes: {
                                                    notchedOutline: classes.notchedOutline
                                                }
                                            }} />
                                        </div>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '40vw', marginTop: '2vh' }}>
                            <Typography onClick={this.handleAddRow} style={{ color: "blue" }}>+ Add More</Typography>
                            {this.state.rows.length > 0 ? (
                                <Icon icon={archiveIcon} style={{ fontSize: "28px", marginLeft: "1vw" }} onClick={this.handleRemoveRow} />
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
                            <TextField id="outlined-basic" label="Title" variant="outlined" style={{ width: '20vw' }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                            <TextField id="outlined-basic" label="Duration" variant="outlined" style={{ width: '20vw', marginLeft: "2vw" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                            <TextField multiline rows={8} id="outlined-basic" label="Description" variant="outlined" style={{ width: '42vw', marginTop: "2vh" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                            <table>
                                <tbody>
                                    {this.state.projects.map((item, idx) => (
                                        <tr id="addr0" key={idx}>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                                                <TextField id="outlined-basic" label="Title" variant="outlined" style={{ width: '20vw' }} InputProps={{
                                                    classes: {
                                                        notchedOutline: classes.notchedOutline
                                                    }
                                                }} />
                                                <TextField id="outlined-basic" label="Duration" variant="outlined" style={{ width: '20vw', marginLeft: "2vw" }} InputProps={{
                                                    classes: {
                                                        notchedOutline: classes.notchedOutline
                                                    }
                                                }} />
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                                                <TextField multiline rows={8} id="outlined-basic" label="Description" variant="outlined" style={{ width: '42vw', marginTop: "2vh" }} InputProps={{
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
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '40vw', marginTop: '2vh' }}>
                            <Typography onClick={this.handleAddProject} style={{ color: "blue" }}>+ Add More</Typography>
                            {this.state.projects.length > 0 ? (
                                <Icon icon={archiveIcon} style={{ fontSize: "28px", marginLeft: "1vw" }} onClick={this.handleRemoveProject} />
                            ) : (
                                    <div>
                                    </div>
                                )}
                        </div>
                        <Typography style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Poppins', fontSize: "40px", marginTop: "15px", marginRight: "10px" }}>
                            Work Experience
                    </Typography>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                            <TextField id="outlined-basic" label="Place" variant="outlined" style={{ width: '20vw' }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                            <TextField id="outlined-basic" label="Duration" variant="outlined" style={{ width: '20vw', marginLeft: "2vw" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                            <TextField multiline rows={8} id="outlined-basic" label="Description" variant="outlined" style={{ width: '42vw', marginTop: "2vh" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                            <table>
                                <tbody>
                                    {this.state.workex.map((item, idx) => (
                                        <tr id="addr0" key={idx}>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                                                <TextField id="outlined-basic" label="Place" variant="outlined" style={{ width: '20vw' }} InputProps={{
                                                    classes: {
                                                        notchedOutline: classes.notchedOutline
                                                    }
                                                }} />
                                                <TextField id="outlined-basic" label="Duration" variant="outlined" style={{ width: '20vw', marginLeft: "2vw" }} InputProps={{
                                                    classes: {
                                                        notchedOutline: classes.notchedOutline
                                                    }
                                                }} />
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                                                <TextField multiline rows={8} id="outlined-basic" label="Description" variant="outlined" style={{ width: '42vw', marginTop: "2vh" }} InputProps={{
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
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '40vw', marginTop: '2vh' }}>
                            <Typography onClick={this.handleAddWork} style={{ color: "blue" }}>+ Add More</Typography>
                            {this.state.workex.length > 0 ? (
                                <Icon icon={archiveIcon} style={{ fontSize: "28px", marginLeft: "1vw" }} onClick={this.handleRemoveWork} />
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
                                <Typography style={{ fontFamily: 'Poppins', color: "#BEBEBE", fontSize: "30px"}}>
                                    Programming Skills
                                </Typography>
                                <Typography style={{ fontFamily: 'Poppins', color: "#BEBEBE", fontSize: "30px"}}>
                                    Software Skills
                                </Typography>
                            </div>
                            <div style={{display: "table", marginTop: "5vh" }}>
                                <div style={{display: 'flex'}}>
                                    <FormControlLabel control={<GreenCheckbox name="checkedG" />} label="Windows"/>
                                    <FormControlLabel control={<GreenCheckbox name="checkedG" />} label="Mac"/>
                                    <FormControlLabel control={<GreenCheckbox name="checkedG" />} label="Linux"/>
                                </div>
                                <div style={{ display: 'flex', marginTop: "1vh"}}>
                                    <FormControlLabel control={<GreenCheckbox name="checkedG" />} label="Java"/>
                                    <FormControlLabel control={<GreenCheckbox name="checkedG" />} label="C/C++"/>
                                    <FormControlLabel control={<GreenCheckbox name="checkedG" />} label="Python"/>
                                    <FormControlLabel control={<GreenCheckbox name="checkedG" />} label="Other"/>
                                </div>
                                <div style={{ display: 'flex', marginTop: "1vh"}}>
                                    <FormControlLabel control={<GreenCheckbox name="checkedG" />} label="App"/>
                                    <FormControlLabel control={<GreenCheckbox name="checkedG" />} label="Web"/>
                                    <FormControlLabel control={<GreenCheckbox name="checkedG" />} label="Scripting"/>
                                    <FormControlLabel control={<GreenCheckbox name="checkedG" />} label="Other"/>
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
                            <div style={{display: "table"}}>
                                <div style={{display: 'flex', marginTop: "5vh"}}>
                                    <ul className="input-tag__tags">
                                        {core.map((tag, i) => (
                                            <li key={tag}>
                                                {tag}
                                                <button type="button" onClick={() => { this.removeCore(i); }}>+</button>
                                            </li>
                                        ))}
                                        <li className="input-tag__tags__input"><input type="text" onKeyDown={this.addCore} ref={c => { this.tagInput1 = c; }} /></li>
                                    </ul>
                                </div>
                                <div style={{display: 'flex', marginTop: "2vh"}}>
                                    <ul className="input-tag__tags">
                                        {depth.map((tag, i) => (
                                            <li key={tag}>
                                                {tag}
                                                <button type="button" onClick={() => { this.removeDepth(i); }}>+</button>
                                            </li>
                                        ))}
                                        <li className="input-tag__tags__input"><input type="text" onKeyDown={this.addDepth} ref={c => { this.tagInput2 = c; }} /></li>
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
                            <TextField id="outlined-basic" label="Position" variant="outlined" style={{ width: '20vw' }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                            <TextField id="outlined-basic" label="Duration" variant="outlined" style={{ width: '20vw', marginLeft: "2vw" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                            <TextField multiline rows={8} id="outlined-basic" label="Description" variant="outlined" style={{ width: '42vw', marginTop: "2vh" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                            <table>
                                <tbody>
                                    {this.state.pos.map((item, idx) => (
                                        <tr id="addr0" key={idx}>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                                                <TextField id="outlined-basic" label="Position" variant="outlined" style={{ width: '20vw' }} InputProps={{
                                                    classes: {
                                                        notchedOutline: classes.notchedOutline
                                                    }
                                                }} />
                                                <TextField id="outlined-basic" label="Duration" variant="outlined" style={{ width: '20vw', marginLeft: "2vw" }} InputProps={{
                                                    classes: {
                                                        notchedOutline: classes.notchedOutline
                                                    }
                                                }} />
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                                                <TextField multiline rows={8} id="outlined-basic" label="Description" variant="outlined" style={{ width: '42vw', marginTop: "2vh" }} InputProps={{
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
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '40vw', marginTop: '2vh' }}>
                            <Typography onClick={this.handleAddPos} style={{ color: "blue" }}>+ Add More</Typography>
                            {this.state.pos.length > 0 ? (
                                <Icon icon={archiveIcon} style={{ fontSize: "28px", marginLeft: "1vw" }} onClick={this.handleRemovePos} />
                            ) : (
                                    <div>
                                    </div>
                                )}
                        </div>
                        <Typography style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Poppins', fontSize: "40px", marginTop: "15px", marginRight: "10px" }}>
                            Extracurricular activities
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                            <TextField id="outlined-basic" label="Event" variant="outlined" style={{ width: '20vw' }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                            <TextField id="outlined-basic" label="Duration" variant="outlined" style={{ width: '20vw', marginLeft: "2vw" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                            <TextField multiline rows={8} id="outlined-basic" label="Description" variant="outlined" style={{ width: '42vw', marginTop: "2vh" }} InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                            <table>
                                <tbody>
                                    {this.state.eca.map((item, idx) => (
                                        <tr id="addr0" key={idx}>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                                                <TextField id="outlined-basic" label="Event" variant="outlined" style={{ width: '20vw' }} InputProps={{
                                                    classes: {
                                                        notchedOutline: classes.notchedOutline
                                                    }
                                                }} />
                                                <TextField id="outlined-basic" label="Duration" variant="outlined" style={{ width: '20vw', marginLeft: "2vw" }} InputProps={{
                                                    classes: {
                                                        notchedOutline: classes.notchedOutline
                                                    }
                                                }} />
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                                                <TextField multiline rows={8} id="outlined-basic" label="Description" variant="outlined" style={{ width: '42vw', marginTop: "2vh" }} InputProps={{
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
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '40vw', marginTop: '2vh' }}>
                            <Typography onClick={this.handleAddEca} style={{ color: "blue" }}>+ Add More</Typography>
                            {this.state.eca.length > 0 ? (
                                <Icon icon={archiveIcon} style={{ fontSize: "28px", marginLeft: "1vw" }} onClick={this.handleRemoveEca} />
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
                        </div>
                    ) : (
                            <div>
                                {this.getStepContent(activeStep)}
                            </div>
                        )}
                </div>
                <div style={{ position: "fixed", bottom: "5vh", right: "2vw" }}>
                    {activeStep === steps.length ? (
                        <div>
                            <Button onClick={this.handleReset}>Submit</Button>
                        </div>
                    ) : (
                            <div>
                                <div>
                                    <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.backButton}>
                                        Back
                      </Button>
                                    <Button variant="contained" color="primary" onClick={this.handleNext}>
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles, useOutlinedInputStyles, { withTheme: true })(Main);