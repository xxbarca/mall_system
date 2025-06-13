import { Button, Drawer, Form, FormProps, Input, Radio, Select } from "antd";
import { categoryCreateApi, updateCategoryApi } from "@/api/modules/category";
import { Category } from "@/api/interface/category";
import { OnlineStatus } from "@/views/product/category/enums";
import { useEffect } from "react";

interface Props {
	open: boolean;
	id?: string;
	data: Array<Category.CategoryRes>;
	cate?: Category.CategoryRes;
	onClose: () => void;
	onSuccess: () => void;
}
type FieldType = {
	name: string;
	description: string;
};
export const AddDrawer = ({ open, onSuccess, onClose, data, cate }: Props) => {
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue({
			name: cate?.name,
			description: cate?.description,
			index: cate?.index,
			parent_id: cate?.parent_id,
			online: cate?.online
		});
	});

	const onFinish: FormProps<FieldType>["onFinish"] = values => {
		(cate ? updateCategoryApi(cate.id as string, values) : categoryCreateApi(values))
			.then(() => {
				onClose();
				onSuccess();
			})
			.finally(() => {
				form.resetFields();
			});
	};
	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 }
	};
	return (
		<>
			<Drawer title={"添加分类"} onClose={onClose} open={open} width={600}>
				<Form onFinish={onFinish} {...layout} form={form}>
					<Form.Item label={"分类名称"} name={"name"} rules={[{ required: true, message: "请输入分类名称" }]}>
						<Input />
					</Form.Item>
					<Form.Item label={"分类描述"} name={"description"}>
						<Input />
					</Form.Item>
					<Form.Item label={"上级分类"} name={"parent_id"}>
						<Select>
							{data.map((item: Category.CategoryRes) => (
								<Select.Option key={item.id} value={item.id}>
									{item.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item label={"是否在线"} name={"online"}>
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
					<Form.Item label={null} wrapperCol={{ offset: 8, span: 16 }}>
						<Button type="primary" htmlType="submit">
							确认
						</Button>
					</Form.Item>
				</Form>
			</Drawer>
		</>
	);
};
