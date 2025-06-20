import { Form, Input, Modal, Select, Switch } from "antd";
import { Category } from "@/api/interface/category";
import { useEffect, useState } from "react";
import { SpecKey } from "@/api/interface/spu";
import { specKeyListApi } from "@/api/modules/spu";

interface Props {
	open: boolean;
	data: Array<Category.CategoryRes>;
	onCancel: () => void;
	onSuccess: () => void;
}
const AddEdit = ({ open, onCancel, onSuccess, data }: Props) => {
	const [form] = Form.useForm();
	const [keyList, setKeyList] = useState<Array<SpecKey.KeyRes>>([]);
	const onOk = () => {
		onSuccess();
	};
	const fetchKeyList = () => {
		specKeyListApi().then(res => {
			setKeyList(res.data);
		});
	};
	useEffect(() => {
		fetchKeyList();
	}, []);
	const layout = {
		labelCol: { span: 2 }
	};
	return (
		<Modal open={open} title={"创建SPU"} onCancel={onCancel} onOk={onOk} width={"60%"}>
			<Form {...layout} form={form}>
				<Form.Item label={"标题"} name={"title"} rules={[{ required: true, message: "请输入标题" }]}>
					<Input placeholder={"请输入标题"} />
				</Form.Item>
				<Form.Item label={"副标题"} name={"subtitle"}>
					<Input placeholder={"请输入副标题"} />
				</Form.Item>
				<Form.Item label={"价格"} name={"price"} rules={[{ required: true, message: "请输入价格" }]}>
					<Input placeholder={"请输入价格"} />
				</Form.Item>
				<Form.Item label={"折扣"} name={"discount_price"}>
					<Input placeholder={"请输入折扣"} />
				</Form.Item>
				<Form.Item label={"分类"} name={"category"} rules={[{ required: true, message: "请选择分类" }]}>
					<Select
						placeholder={"请选择所属分类"}
						style={{ width: 200 }}
						showSearch
						optionFilterProp="label"
						filterSort={(optionA, optionB) =>
							(optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
						}
						options={data.filter((d: Category.CategoryRes) => !!d.parent).map(i => ({ label: i.name, value: i.id }))}
					/>
				</Form.Item>
				<Form.Item label={"是否上架"} name={"online"}>
					<Switch checkedChildren="上架" unCheckedChildren="下架" defaultChecked />
				</Form.Item>
				<Form.Item label={"选择规格"}>
					<Select
						placeholder={"请选择规格"}
						showSearch
						style={{ width: 200 }}
						mode={"multiple"}
						options={keyList.map(i => ({ label: i.name, value: i.id }))}
					></Select>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default AddEdit;
