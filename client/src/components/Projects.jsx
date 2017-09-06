import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import Toggle from 'material-ui/Toggle';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const Projects = (props) => (
  <Card className="container">
    <CardTitle
      title={"Project: " + props.detail.name}
    >
    </CardTitle>
    <div>
      <CardText expandable={true}>
        <Tabs
          value={props.tabValue}
          onChange={props.handleChange}
        >
          <Tab label="Tasks" value="a">
            <div>
              <Table>
                <TableBody>
                  {props.detail.tasks.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableRowColumn>{item.name}</TableRowColumn>
                        <TableRowColumn>{item.hours} Hours</TableRowColumn>                        
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </Tab>
          <Tab label="Dates" value="b">
            <div>
              {
                (props.dates.length > 0) ?

                  (<Table>
                    <TableBody>
                      {props.dates.map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableRowColumn>{item.date}</TableRowColumn>
                            <TableRowColumn>{item.tasks.map(task => task.hours).reduce((total, hour) => total + hour)} Hours</TableRowColumn>                            
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>)
                  :
                  (<p>No record found on this day!!!</p>)
              }
            </div>
          </Tab>
        </Tabs>
        <CardActions>
          <FloatingActionButton secondary={true} onClick={props.handleNewTask}>
            <ContentAdd />
          </FloatingActionButton> 
        </CardActions>
      </CardText>
    </div>

  </Card>
);

export default Projects;
