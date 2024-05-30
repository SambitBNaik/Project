import React from 'react';

class PercentageCircle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: props.percentage || 0
    };
  }

  render() {
    const { percentage } = this.state;
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const progress = circumference - (percentage / 100) * circumference;

    return (
      <svg width="100" height="100">
        <circle
          cx="30"
          cy="30"
          r={radius}
          fill="transparent"
          stroke="#ccc"
          strokeWidth="10"
        />
        <circle
          cx="30"
          cy="30"
          r={radius}
          fill="transparent"
          stroke="#007bff"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
        />
        <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="20px">
          {percentage}%
        </text>
      </svg>
    );
  }
}

export default PercentageCircle;
