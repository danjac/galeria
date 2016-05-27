import React, { PropTypes } from 'react';
import * as bs from 'react-bootstrap';

const images = [
  'http://i.imgur.com/RJ9EQC2.jpg',
  'http://i.imgur.com/8mb9FFv.jpg',
  'http://i.imgur.com/WRUg64g.jpg',
  'https://i.imgur.com/uy39kkd.jpg',
  'http://i.imgur.com/AKH5Y4M.jpg',
  'http://i.imgur.com/95H0FiD.jpg',
  'https://i.imgur.com/A5HWAdT.jpg',
  'http://i.imgur.com/82P7dxw.jpg',
];

class Front extends React.Component {
  render() {
    return (
      <bs.Grid>
        <bs.Row>
          {images.map(image => {
            return (
            <bs.Col xs={6} md={4} key={image}>
              <bs.Thumbnail src={image}>
                <h3>title goes here...</h3>
                <p>description goes here...</p>
              </bs.Thumbnail>
            </bs.Col>
            );
          })}
        </bs.Row>
      </bs.Grid>
    );
  }
}

export default Front;
