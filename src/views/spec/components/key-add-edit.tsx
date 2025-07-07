import { Form, Input, message, Modal } from "antd";
import { specKeyCreateApi } from "@/api/modules/spec";

interface Props {
	open: boolean;
	onSuccess: () => void;
	onCancel: () => void;
}
export const KeyAddEdit = ({ open, onSuccess, onCancel }: Props) => {
	const [form] = Form.useForm();
	const onOk = () => {
		form.validateFields().then(values => {
			console.log(values);
			specKeyCreateApi(values).then(() => {
				message.success("创建规格值成功", 0.5).then(() => {
					onSuccess();
				});
			});
		});
	};
	return (
		<Modal open={open} width={"60%"} title={"创建规格名"} onCancel={onCancel} onOk={onOk} afterClose={() => form.resetFields()}>
			<Form labelCol={{ span: 2 }} form={form}>
				<Form.Item label={"名称"} name={"name"} rules={[{ required: true, message: "请输入标题" }]}>
					<Input placeholder={"请输入标题"} />
				</Form.Item>
				<Form.Item label={"单位"} name={"unit"}>
					<Input placeholder={"请输入标题"} />
				</Form.Item>
			</Form>
		</Modal>
	);
};
