/**
 *
 * LocaleToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import ToggleOption from 'components/ToggleOption';

function Toggle(props) {
  let content = <option>--</option>;

  // If we have items, render them
  if (props.values) {
    content = props.values.map(value => (
      <ToggleOption key={value} value={value} message={props.messages[value]} />
    ));
  }

  return (
    <div className="select__currency">
      <select value={props.value} onChange={props.onToggle}>
        {content}
      </select>
      <div className="select_arrow--currency" />
    </div>
  );
}

Toggle.propTypes = {
  onToggle: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.number,
  messages: PropTypes.object,
};

export default Toggle;
