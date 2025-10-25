import { useState, useRef, useEffect, useMemo } from "react";
import JoditEditor from "jodit-react";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import {
  useGetTermsConditionQuery,
  useUpdateTermsMutation,
} from "../../redux/api/SettingApi";
import { toast } from "sonner";
import { FiLoader } from "react-icons/fi";
const TremsCondition = () => {
  const { data: getTermsAndCondtion } = useGetTermsConditionQuery();
  const [updateTerms, { isLoading }] = useUpdateTermsMutation();
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const initialText = getTermsAndCondtion?.data?.text || "";

  const handleTerms = () => {
    const current = content || initialText;
    if (current === initialText) {
      return toast.info("Already up to date");
    }
    const data = {
      text: current,
    };
    // console.log(data);

    updateTerms(data).unwrap()
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
    // keep for future side-effects if needed; no state sync here to avoid setState in effect
  }, [getTermsAndCondtion]);

  return (
    <div className="p-4 bg-white rounded-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex items-center gap-2">
          <Link to={-1} className="flex items-center gap-1 px-2 py-1 rounded-md">
            <IoArrowBackSharp className="text-[var(--primary-color)]" />
          </Link>
          <p className="font-semibold">Terms & Conditions</p>
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
          <button
            onClick={handleTerms}
            className="flex items-center justify-center gap-2 px-4 py-2 text-white rounded-full bg-[var(--primary-color)]"
          >
            {isLoading ? <><FiLoader className="animate-spin" /> Loading...</> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TremsCondition;
