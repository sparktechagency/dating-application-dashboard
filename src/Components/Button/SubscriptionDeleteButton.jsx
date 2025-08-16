import { Button, Popconfirm } from "antd";
import { useDeleteSubscriptionPlanMutation } from "../../redux/api/subscriptionApi";


const SubscriptionDeleteButton = ({ record }) => {
      const [deletePlan, { isLoading: isDeleting }] = useDeleteSubscriptionPlanMutation();

    const handleDeletePlan = (id) => {
        deletePlan(id)
            .unwrap()
            .then((payload) => {
                toast.success(payload?.message);
            })
            .catch((error) => {
                toast.error(error?.data?.message);
            });
    };

    return (
        <>
            <Popconfirm
                title="Are you sure to delete this plan?"
                onConfirm={() => handleDeletePlan(record?.id)}
                okText="Yes"
                cancelText="No"
            >
                <Button danger loading={isDeleting}>Delete</Button>
            </Popconfirm>
        </>
    );
};

export default SubscriptionDeleteButton;