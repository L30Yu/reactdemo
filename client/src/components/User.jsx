import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';


const User = ({ secretData }) => (
  <Card className="container">
    <CardTitle
      title="User Info"
      subtitle="This your own portofolio."
    />

    {secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{secretData}</CardText>}
  </Card>
);

User.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default User;
