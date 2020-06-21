import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import PropTypes from 'prop-types';

const ColorPicker = ({ onSelect, initialValues, height }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState(initialValues);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
    onSelect(color);
  };

  const handleChange = (values) => {
    setColor(values.hex);
  };

  return (
    <div>
      <div
        type="button"
        role="presentation"
        style={{
          display: 'inline-block',
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        <div style={{ width: '70px', padding: 5, boxShadow: '0 0 10px #dfdfdf' }}>
          <div
            style={{
              width: '50px',
              height,
              borderRadius: '2px',
              background: color,
              border: '1px solid lightgrey',
            }}
          />
        </div>
      </div>
      { displayColorPicker ? (
        <div style={{
          position: 'absolute',
          zIndex: '2',
        }}
        >
          <div
            type="button"
            role="presentation"
            style={{
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            }}
            onClick={handleClose}
          />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null }

    </div>
  );
};

ColorPicker.propTypes = {
  initialValues: PropTypes.string,
  onSelect: PropTypes.func,
  height: PropTypes.number,
};

ColorPicker.defaultProps = {
  initialValues: '',
  onSelect: () => {},
  height: 30,
};


export default ColorPicker;
