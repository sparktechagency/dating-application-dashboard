import { toast } from "sonner";
import { usePodcastDoneMutation } from "../../redux/api/podcastManagementApi";
import { LuLoader } from "react-icons/lu";


const SheduleDoneButton = ({ id }) => {
    const [podCastDone, { isLoading }] = usePodcastDoneMutation();
    const handleDonePodcast = (id) => {
        const data = {
            podcastId: id,
        };
        podCastDone(data)
            .unwrap()
            .then((payload) => {
                toast.success(payload?.message)
            })
            .catch((error) => toast.error(error?.data?.message));
    };
    return (
        <button
            onClick={() => {
                handleDonePodcast(id);
            }}
            className="bg-[#FFA175] text-white flex justify-center items-center w-14 h-8 rounded-md"
        >
            {isLoading ? <><LuLoader className="animate-spin w-5 h-5" /></> : "Done"}
        </button>
    );
};

export default SheduleDoneButton;