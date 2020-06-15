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

const resblue = "#256DDA80";


const useStyles = makeStyles((theme) => ({
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
}));

const useOutlinedInputStyles = makeStyles(theme => ({
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
}));

function getSteps() {
    return ['Personal', 'Academic', 'Projects', 'Platforms', 'Positions'];
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            rows: []
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
            rows: [...this.state.rows, item]
        });
        console.log(this.state.rows.length);
    };
    handleRemoveRow = () => {
        this.setState({
            rows: this.state.rows.slice(0, -1)
        });
    };
    getStepContent = (stepIndex) => {
        const { outlinedInputClasses } = this.props;
        const { classes } = this.props;

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
                            <Typography onClick={this.handleAddRow} style={{color: "blue"}}>+ Add More</Typography>
                            {this.state.rows.length>0 ? (
                                <Icon icon={archiveIcon} style={{ fontSize: "28px", marginLeft: "1vw" }} onClick={this.handleRemoveRow} />
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
                <div style={{ position: "absolute", bottom: "5vh", right: "2vw" }}>
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