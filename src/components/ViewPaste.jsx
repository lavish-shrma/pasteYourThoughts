import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ViewPaste = () => {
  const { id } = useParams();
  console.log(id);

  const pastes = useSelector((state) => state.paste.pastes);

  const paste = pastes.filter((paste) => paste._id === id)[0];
  console.log("paste -> ", paste);

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-center p-4">
        <input
          className="bg-[#1a1a1a] p-2 rounded-lg mt-2 w-[66%] pl-4"
          name="textarea"
          type="text"
          id="search-bar"
          placeholder="Title"
          value={paste ? paste.title : ""}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <textarea
          className="bg-[#1a1a1a] rounded-lg mt-4 min-w-[500px] max-h-[400px] p-4"
          name="textarea"
          value={paste ? paste.content : ""}
          disabled
          placeholder="enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;
