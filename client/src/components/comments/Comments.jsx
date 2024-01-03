import { useContext } from "react";
import Avatar from "../custom/Avatar";
import Comment from "./Comment";
import "./comments.css";
import { AppContext } from "../../context/AppContext";

export default function Comments() {
  const { state } = useContext(AppContext);
  return (
    <div className={`comments ${state?.theme}`}>
      <div className="comments-wrapper">
        <h4>23 Comments</h4>
        <form>
          <div className="inputs-wrapper">
            <Avatar size={35} />
            <textarea required placeholder="Enter your comment"></textarea>
          </div>
          <div className="inputs-actions">
            <button onClick={() => {}}>Cancel</button>
            <button type="submit" onClick={() => {}}>
              Comment
            </button>
          </div>
        </form>

        <div className="comment-list">
          {[...Array(5)].map((item, index) => (
            <Comment key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
