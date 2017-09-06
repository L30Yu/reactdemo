import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Auth from '../modules/Auth';

const User = ({ secretData }) => (
  <Card className="container">
    <CardTitle
      title={Auth.getUser()}
      subtitle={"email : "+Auth.getUserEmail()}
    />

    {secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{secretData}</CardText>}
  </Card>
);

User.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default User;
