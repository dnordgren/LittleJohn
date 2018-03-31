import * as React from "react";

export interface IUserProps {
  id: string;
  name: string;
  watchlists: Array<string>;
}

export class User extends React.Component<IUserProps, {}> {
  render(): JSX.Element {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <a href="#">{this.props.id}</a>
        {this.props.watchlists.map(w => w)}
      </div>
    );
  }
}
