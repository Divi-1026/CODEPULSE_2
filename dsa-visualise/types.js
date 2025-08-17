import React from 'react';
import PropTypes from 'prop-types';

// Topic component prop types
export const topicPropTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  isComingSoon: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

// VariableState component prop types
export const variableStatePropTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  scope: PropTypes.string.isRequired
};

// VisualizationStep component prop types
export const visualizationStepPropTypes = {
  line_executed: PropTypes.number.isRequired,
  variables: PropTypes.arrayOf(PropTypes.shape(variableStatePropTypes)).isRequired,
  output: PropTypes.string.isRequired,
  explanation: PropTypes.string.isRequired
};

// Default props (if needed)
export const defaultTopicProps = {
  isComingSoon: false
};

export const defaultVariableStateProps = {
  scope: 'global'
};

export const defaultVisualizationStepProps = {
  output: '',
  variables: []
};