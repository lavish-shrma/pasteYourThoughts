import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router";

const ViewPaste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [copied, setCopied] = useState(false);

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }

  const shareData = {
    title: "pasteYourThoughts",
    text: "Check out this paste app!",
    url: window.location.href,
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      // Fallback: copy link
      try {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Copy failed:", err);
      }
    }
  };

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
                    <NavLink href={`/?pasteId=${paste?._id}`}>Edit</NavLink>
                  </button>
                  <button>
                    <NavLink href={`/paste/${paste?._id}`} target="_blank">
                      view
                    </NavLink>
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
                  <button onClick={handleShare}>
                    {copied ? "Link copies" : "share"}
                  </button>
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
