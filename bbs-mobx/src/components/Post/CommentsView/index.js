import React, { Component } from "react";
import "./style.css";
import { getFormatDate } from './../../../utils/date';
import { observer } from "mobx-react";

@observer
class CommentsView extends Component {
  render() {
    const { comments } = this.props;
    return (
      <ul className="commentsView">
        {comments.map(item => {
          return (
            <li key={item.id}>
              <div>{item.content}</div>
              <div className="sub">
                <span>{item.author.username}</span>
                <span>·</span>
                <span>{getFormatDate(item.updatedAt)}</span>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default CommentsView;
