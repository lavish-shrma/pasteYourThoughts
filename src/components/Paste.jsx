import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router";

const ViewPaste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }

  return (
    <>
      <input
        className="p-2 rounded-lg border-2 min-w-[600px] mt-5"
        type="search"
        id="search-bar"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className="border rounded-lg m-2 p-2" key={paste?._id}>
                <div>{paste.title}</div>
                <div className="p-2">{paste.content}</div>
                <div className="flex flex-row gap-4 place-content-evenly">
                  <button>
                    <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                  </button>
                  <button>
                    <a href={`/paste/${paste?._id}`} target="_blank">
                      view
                    </a>
                  </button>
                  <button onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("copied to clipboard");
                    }}
                  >
                    Copy
                  </button>
                  <button>Share</button>
                </div>
                <div>
                  {paste.createdAt
                    ? new Date(paste.createdAt).toLocaleString()
                    : "No date"}
                </div>
              </div>
            );
          })}
        <div>Crafted by Lavish with Love &lt;3</div>
      </div>
    </>
  );
};

export default ViewPaste;
