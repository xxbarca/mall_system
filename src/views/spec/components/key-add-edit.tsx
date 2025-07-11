import { Form, Input, message, Modal } from "antd";
import { specKeyCreateApi, specKeyUpdateApi } from "@/api/modules/spec";
import { Spec } from "@/api/interface/spec";
import { useEffect } from "react";

interface Props {
	open: boolean;
	onSuccess: () => void;
	onCancel: () => void;
	specKey?: Spec.SpecKey | null;
}
export const KeyAddEdit = ({ open, onSuccess, onCancel, specKey }: Props) => {
	const [form] = Form.useForm();
	const onOk = () => {
		form.validateFields().then(values => {
			(specKey ? specKeyUpdateApi({ id: specKey.id, ...values }) : specKeyCreateApi(values)).then(() => {
				message.success(specKey ? "更新规格名成功" : "创建规格名成功", 0.5).then(() => {
					onSuccess();
				});
			});
		});
	};
	useEffect(() => {
		if (specKey) {
			form.setFieldsValue(specKey);
		}
	}, [specKey, form]);
	return (
		<Modal
			open={open}
			width={"60%"}
			title={specKey ? "更新规格名" : "创建规格名"}
			onCancel={onCancel}
			onOk={onOk}
			afterClose={() => form.resetFields()}
		>
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
