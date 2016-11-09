import React, {Component} from 'react';
import UserStoriesBox from '../../components/UserStories';

class UserStories extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="UserStories">
        <UserStoriesBox {...this.props}/>
      </div>
    );
  }
}

export default UserStories;


