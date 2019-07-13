import React, { PureComponent } from 'react';

export default class PlanningInfo extends PureComponent {
  render() {
    const { description, address } = this.props;
    return (
      <div>
        <div>
          {description} |{address}
        </div>
      </div>
    );
  }
}