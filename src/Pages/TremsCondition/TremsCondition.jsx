import { useState, useRef, useEffect } from "react";
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
  const [initialContent, setInitialContent] = useState("");

  const handleTerms = () => {
    if (content === initialContent) {
      return toast.info("Already up to date");
    }
    const data = {
      text: content,
    };
    console.log(data);
    
    updateTerms(data).unwrap()
      .then((payload) => {
        toast.success(payload?.message);
        setInitialContent(content);
      })
      .catch((error) => toast.error(error?.data?.message));
  };
  const config = {
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
  };

  useEffect(() => {
    if (getTermsAndCondtion?.data?.text) {
      setContent(getTermsAndCondtion?.data?.text);
      setInitialContent(getTermsAndCondtion?.data?.text);
    }
  }, [getTermsAndCondtion]);

  return (
    <>
      <div className="flex justify-start items-center gap-2 mb-3 relative m-5">
        <div className="absolute top-6 left-2 flex items-center">
          <Link
            to={-1}
            className="py-1 px-2 rounded-md flex justify-start items-center gap-1  "
          >
            <IoArrowBackSharp className="text-[var(--primary-color)]" />
          </Link>{" "}
          <p className="font-semibold">Terms & Conditions</p>
        </div>
      </div>

      <div className="custom-jodit-editor mx-5 ">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
        />
        <div className="flex items-center justify-center mt-5">
          <button
            onClick={handleTerms}
            className="bg-[var(--primary-color)]  text-white px-4 py-2 rounded-full test flex items-center justify-center gap-2"
          >
            {isLoading ? <><FiLoader className="animate-spin" /> Loading...</> : "Save Changes"}
          </button>
        </div>
      </div>
    </>
  );
};

export default TremsCondition;
