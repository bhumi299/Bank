import React from 'react';

class About extends React.Component{
  render()
  {
    return(
      <div className="about">
      <p>This is a <strong>Basic Banking System </strong>with dummy data in the database of 10 customers.</p>
      <p>It has no log-in or authentication page. It only transfers money between multiple users and updates the database accordingly.</p>
      <p>Technological Stack used:</p>
      <ul>
          <li>React Js</li>
          <li>Node Js</li>
          <li>Express</li>
          <li>Mysql</li>
          <li>Cors</li>
      </ul>
      <p>Styling is done through:</p>
      <ul>
        <li>External CSS</li>
        <li>Bootstrap</li>
        <li>Media Query</li>
      </ul>
        </div>
    )
  }
}
export default About;
