import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';


const Projects = ({ secretData }) => (
  <Card className="container">
    <CardTitle
      title="Projects Info"
      subtitle="Lets list all of our projects : "
    />

    {secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{secretData}</CardText>}
  </Card>
);

Projects.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Projects;
