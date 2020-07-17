/**
 *
 * LocaleToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Arrow from 'components/Arrow';
import Select from 'components/Select';
import ToggleOption from '../ToggleOption';
import SelectWrapper from './SelectWrapper';

function Toggle(props) {
  let content = <option>--</option>;

  // If we have items, render them
  if (props.values) {
    content = props.values.map(value => (
      <ToggleOption key={value} value={value} message={props.messages[value]} />
    ));
  }

  return (
    <SelectWrapper>
      <Select value={props.value} onChange={props.onToggle}>
        {content}
      </Select>
      <Arrow />
    </SelectWrapper>
  );
}

Toggle.propTypes = {
  onToggle: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  messages: PropTypes.object,
};

export default Toggle;
