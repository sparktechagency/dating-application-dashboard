import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import {
  useGetSmsPolicyQuery,
  useUpdateSmsPolicyMutation,
} from "../../redux/api/SettingApi";
import { toast } from "sonner";
import { FiLoader } from "react-icons/fi";

const SmsPolicy = () => {
  const { data: getSmsPolicy } = useGetSmsPolicyQuery();
  const [updateSmsPolicy, { isLoading }] = useUpdateSmsPolicyMutation();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const initialText = getSmsPolicy?.data?.text || "";

  const handleTerms = () => {
    const current = content || initialText;
    if (current === initialText) {
      return toast.info("Already up to date");
    }
    const data = {
      text: current,
    };
    updateSmsPolicy(data)
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message);
      })
      .catch((error) => toast.error(error?.data?.message));
  };
  const config = useMemo(() => ({ 
    readonly: false,
    placeholder: "Start typings...",
    style: {
      height: 550,
    },
    buttons: [
      "image",
      "fontsize",
      "bold",
      "italic",
      "underline",
      "|",
      "font",
      "brush",
      "align",
      "link",
      "table",
      "ol",
      "ul",
    ],
  }), []);

  useEffect(() => {
    // rely on initialText fallback instead of syncing state in effect
  }, [getSmsPolicy]);

  return (
    <div className="p-4 bg-white rounded-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex items-center gap-2">
          <Link to={-1} className="flex items-center gap-1 px-2 py-1 rounded-md">
            <IoArrowBackSharp className="text-[var(--primary-color)]" />
          </Link>
          <p className="font-semibold">SMS Policy</p>
        </div>
      </div>

      <div className="custom-jodit-editor">
        <JoditEditor
          ref={editor}
          value={content || initialText}
          config={config}
          tabIndex={1}
          onChange={(newContent) => setContent(newContent)}
        />
        <div className="flex justify-center mt-5">
          <button onClick={()=> handleTerms()} className="flex items-center justify-center gap-2 px-4 py-2 text-white rounded-full bg-[var(--primary-color)]">
            {isLoading ? <><FiLoader className="animate-spin" /> Loading...</> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmsPolicy;