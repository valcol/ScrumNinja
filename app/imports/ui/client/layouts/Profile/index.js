import React, { Component } from 'react';
import MyProfileBox from '../../components/MyProfile';

class MyProfile extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        {/* left column */}
        <div className="col-md-12">
          <MyProfileBox/>
        </div>
      </div>
    );
  }
}

export default MyProfile;
