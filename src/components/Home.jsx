import React, { use, useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParamas, setSearchParams] = useSearchParams("");
  const pasteId = searchParamas.get("pasteId");
  const dispatch = useDispatch();
  const allpastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allpastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };
    // dispatch(
    //   addToPaste({
    //     title,
    //     content: value,
    //     _id: paste._id,
    //     createdAt: paste.createdAt,
    //   })
    // );

    if (pasteId) {
      // update
      dispatch(updateToPaste(paste));
    } else {
      // create
      dispatch(addToPaste(paste));
    }

    // after creating or updating the paste, clear the input fields
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between p-4">
        <input
          className="bg-[#1a1a1a] p-2 rounded-lg mt-2 w-[66%] pl-4"
          name="textarea"
          type="text"
          placeholder="enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={createPaste}>
          {pasteId ? "Update My Paste" : "Create New Paste"}
        </button>
      </div>
      <div className="mt-5">
        <textarea
          className="bg-[#1a1a1a] rounded-lg mt-4 min-w-[500px] max-h-[400px] p-4"
          name="textarea"
          value={value}
          placeholder="enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
