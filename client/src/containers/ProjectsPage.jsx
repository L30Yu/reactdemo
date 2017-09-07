import React from 'react';
import Auth from '../modules/Auth';
import Projects from '../components/Projects.jsx';

import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import DialogForm from '../components/DialogForm.jsx'



class ProjectsPage extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        this.state = {
            secretData: '',
            projects: [],
            dates: [],
            tabValue: 'a',
            pickedDate: null,
            openDialog: false,
            dialogContent: {title: '', date: ''}
        };

        this.handleTabChange    = this.handleTabChange.bind(this);
        this.handlePickDate     = this.handlePickDate.bind(this);
        this.handleClearDate    = this.handleClearDate.bind(this);
        this.handleAddProject   = this.handleAddProject.bind(this);
        this.handleAddTask      = this.handleAddTask.bind(this); 
        this.handleAddTaskInForm= this.handleAddTaskInForm.bind(this);   
        this.handleAddHoursInForm= this.handleAddHoursInForm.bind(this);   
    }

    handleTabChange(value) {
        this.setState({
            tabValue: value
        });
    }

    handleAddTaskInForm(){

    }

    handleAddHoursInForm(){

    }

    handlePickDate(e, value) {
        if(value == null) return;

        let tmpMonth = ((value.getMonth() + 1) < 10) ? '0' + (value.getMonth() + 1) : (value.getMonth() + 1);
        let tmpDate = (value.getDate() < 10) ? '0' + value.getDate() : value.getDate();
        let tmpValue = value.getFullYear() + '-' + tmpMonth + '-' + tmpDate
        let tmpProjects = JSON.parse(JSON.stringify(projects));
        tmpProjects.forEach(project => {
            project.tasks.forEach(task => task.hours=0)
        });

        let tmpDates = dates.filter(item => {
            if(item.date === tmpValue){        
                tmpProjects.find(project => {
                    if(project.id === item.project_id){
                        project.tasks.forEach( task => {
                            item.tasks.find( itemTask => {
                                if(itemTask.name === task.name){
                                    task.hours = itemTask.hours;
                                    return true;
                                }
                                return false;                                
                            })                            
                        });
                        return true;
                    }
                    return false;
                    });
                return true;
            }
            return false;
        });
        this.setState({
            dates: tmpDates,
            projects: tmpProjects,
            pickedDate: value,
            dialogContent: Object.assign({}, this.state.dialogContent, { date: tmpValue })
        })
        console.log('dialog date:',this.state.dialogContent.date);
    }

    handleClearDate() {
        this.setState({
            pickedDate: null,
            projects: projects,
            dates: dates,
            dialogContent: {title: '', tasks:[], date: ''}
        })
    }

    /** 
     * This method will be executed after initial rendering.
     */
    componentDidMount() {
        this.setState({
            projects: projects,
            dates: dates
        });
    }

    handleAddTask(id){
        if(this.state.pickedDate == null){
            alert('Pick a date first please !');
            return;
        }
        this.setState({
            openDialog: !this.state.openDialog,
            dialogContent: Object.assign({}, this.state.dialogContent, {title: 'Add Tasks in '+this.state.projects.filter(p => p.id==id)[0].name})
        });
    }

    handleAddProject(){
        if(this.state.pickedDate == null){
            alert('Pick a date first please !');
            return;
        }
        this.setState({
            openDialog: !this.state.openDialog,
            dialogContent: Object.assign({}, this.state.dialogContent, {title: 'Add Project'})
        });
    }

    /**
     * Render the component.
     */
    render() {
        const actions = [
            <FlatButton
              label="Submit"
              primary={true}
              onClick={this.handleAddProject}
            />,
          ];

        return (
            <div>
                <Card className="container">
                    <CardTitle
                        title={"User Name: " + Auth.getUser()}
                    />
                    <CardActions>
                        <div>
                            <RaisedButton label="Add Project" primary={true} onClick={this.handleAddProject}/>
                            <Dialog
                                title={this.state.dialogContent.title}
                                actions={actions}
                                modal={false}
                                open={this.state.openDialog}
                                onRequestClose={this.handleAddProject}
                                >
                                { (this.state.dialogContent.date.length>0) && <FlatButton label={this.state.dialogContent.date} primary={true} />}
                                
                                {/**<DialogForm projects={this.state.projects} dates={this.state.dates} handleAddTaskInForm={this.handleAddTaskInForm} handleAddHoursInForm={this.handleAddHoursInForm}/>*/}
                                
                            </Dialog>
                        </div>
                        <DatePicker inputStyle={{ textAlign: 'center' }} autoOk={true} hintText="Pick a Date" value={this.state.pickedDate} onChange={this.handlePickDate} />

                        {(!!this.state.pickedDate) && (<RaisedButton label=" X Clear Date" onClick={this.handleClearDate} secondary={true} />) }

                    </CardActions>
                </Card>
                {this.state.projects.map((item) => {
                    return (<Projects
                        secretData={this.state.secretData}
                        key={item.id}
                        detail={item}
                        pickedDate={this.state.pickedDate}
                        handleTabChange={this.handleTabChange}
                        handleNewTask={this.handleAddTask.bind(this,item.id)}
                        dates={this.state.dates.filter(date => date.tasks.length > 0 && date.project_id === item.id)} />
                    );
                })}
            </div>
        );


    }

}

export default ProjectsPage;

const dates =
    [
        {
            "id": 1,
            "project_id": 1,
            "date": "2017-09-01",
            "tasks": [
                { "name": "Coding", "hours": 4 },
                { "name": "Testing", "hours": 3.5 }
            ]
        },
        {
            "id": 2,
            "project_id": 1,
            "date": "2017-09-02",
            "tasks": [
                { "name": "Coding", "hours": 2.3 },
                { "name": "Testing", "hours": 3.5 },
                { "name": "Maintaining", "hours": 1.8 }
            ]
        },
        {
            "id": 3,
            "project_id": 2,
            "date": "2017-09-01",
            "tasks": [
                { "name": "Analyzing", "hours": 3 },
                { "name": "Coding", "hours": 4 },
                { "name": "Testing", "hours": 3.5 }
            ]
        },
        {
            "id": 4,
            "project_id": 2,
            "date": "2017-09-02",
            "tasks": [
                { "name": "Analyzing", "hours": 1 },
                { "name": "Coding", "hours": 8.3 }
            ]
        },
        {
            "id": 5,
            "project_id": 2,
            "date": "2017-09-03",
            "tasks": [
                { "name": "Coding", "hours": 4 },
                { "name": "Testing", "hours": 5.5 }
            ]
        },
        {
            "id": 6,
            "project_id": 2,
            "date": "2017-09-04",
            "tasks": [
                { "name": "Testing", "hours": 8 }
            ]
        },
        {
            "id": 7,
            "project_id": 2,
            "date": "2017-09-05",
            "tasks": [
                { "name": "Maintaining", "hours": 11.8 }
            ]
        },
        {
            "id": 8,
            "project_id": 2,
            "date": "2017-09-06",
            "tasks": [

            ]
        }
    ];

const projects =
    [
        {
            "id": 1,
            "name": "Dog Power Station",
            "tasks": [
                { "name": "Coding", "hours": 6.3 },
                { "name": "Testing", "hours": 7 },
                { "name": "Maintaining", "hours": 1.8 }
            ],
            "hours": {
                "total": 15.1
            }

        },
        {
            "id": 2,
            "name": "Cat Mining Field",
            "tasks": [
                { "name": "Analyzing", "hours": 4.0 },
                { "name": "Coding", "hours": 16.3 },
                { "name": "Testing", "hours": 17 },
                { "name": "Maintaining", "hours": 11.8 }
            ],
            "hours": {
                "total": 49.1
            }

        }
    ];

console.log(projects, dates);