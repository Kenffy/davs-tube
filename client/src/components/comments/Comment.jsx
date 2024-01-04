import Avatar from "../custom/Avatar";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FaShare } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";

export default function Comment() {
  return (
    <div className="comment-item">
      <div className="user-infos">
        <Avatar size={26} />
        <div className="info-wrapper">
          <span className="channel-name" onClick={() => {}}>
            John Doe
          </span>
          •<span className="timeline">2 days ago</span>
        </div>
      </div>
      <div className="comment-body">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero,
          repellendus.
        </p>
      </div>
      <div className="comment-actions">
        <div onClick={() => {}} className="action-item like">
          <FaRegHeart />
          <span>25</span>
        </div>
        <div className="comment-action-item">
          <FaShare />
        </div>
        <div
          tabIndex={0}
          onBlur={() => {}}
          onClick={() => {}}
          className="comment-action-item"
        >
          <HiDotsHorizontal />
        </div>
      </div>
    </div>
  );
}
