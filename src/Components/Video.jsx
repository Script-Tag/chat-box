import React, { Component } from 'react';
import ReactPlayer from 'react-player'

class Video extends Component {
    state = {  }
    render() { 
        return <ReactPlayer
                controls
                width='100%'
                // height='100%' 
                url={this.props.videoUrl} 
            />;
    }
}
 
export default Video;