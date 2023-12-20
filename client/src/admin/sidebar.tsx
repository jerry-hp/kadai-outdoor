import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <div className="bg-[#0B2545] text-white w-1/5 p-4">
      <ul>
      <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/admin">Create Product</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
