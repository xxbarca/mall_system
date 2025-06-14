import { Form, Input, message, Modal, Radio, Select } from "antd";
import { Category } from "@/api/interface/category";
import { OnlineStatus } from "@/views/product/category/enums";
import { categoryCreateApi, updateCategoryApi } from "@/api/modules/category";
import { useEffect } from "react";

interface Props {
	open: boolean;
	data: Array<Category.CategoryRes>;
	cate?: Category.CategoryRes;
	onCancel: () => void;
	onSuccess: () => void;
}

export const AddEdit = ({ open, data, cate, onCancel, onSuccess }: Props) => {
	const [form] = Form.useForm();
	useEffect(() => {
		form.setFieldsValue({
			name: cate?.name,
			description: cate?.description,
			index: cate?.index,
			parent: cate?.parent.id,
			online: cate?.online || OnlineStatus.ONLINE
		});
	});
	const layout = {
		labelCol: { span: 2 }
	};
	const onOk = () => {
		form.validateFields().then(values => {
			(cate ? updateCategoryApi(cate.id as string, values) : categoryCreateApi(values))
				.then(() => {
					message.success(cate ? "修改分类成功" : "创建分类成功", 0.5).then(() => {
						onCancel();
						onSuccess();
					});
				})
				.finally(() => {
					form.resetFields();
				});
		});
	};
	return (
		<Modal open={open} title={"添加分类"} onCancel={onCancel} onOk={onOk} width={"60%"}>
			<Form {...layout} form={form}>
				<Form.Item label={"分类名称"} name={"name"} rules={[{ required: true, message: "请输入分类名称" }]}>
					<Input />
				</Form.Item>
				<Form.Item label={"分类描述"} name={"description"}>
					<Input />
				</Form.Item>
				<Form.Item label={"上级分类"} name={"parent"} rules={[{ required: true, message: "请选择父分类" }]}>
					<Select>
						{data.map((item: Category.CategoryRes) => (
							<Select.Option key={item.id} value={item.id}>
								{item.name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label={"是否在线"} name={"online"} rules={[{ required: true, message: "请选择是否在线" }]}>
					<Radio.Group
						name="online"
						defaultValue={OnlineStatus.ONLINE}
						options={[
							{
								value: OnlineStatus.ONLINE,
								label: "在线"
							},
							{
								value: OnlineStatus.OFFLINE,
								label: "下线"
							}
						]}
					/>
				</Form.Item>
				<Form.Item label={"排序"} name={"index"}>
					<Input type={"number"} />
				</Form.Item>
			</Form>
		</Modal>
	);
};
