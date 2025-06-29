import { Form, Input, message, Modal, Select, Switch } from "antd";
import { Category } from "@/api/interface/category";
import { useEffect, useState } from "react";
import { Spu } from "@/api/interface/spu";
import { createSpuApi, specKeyListApi, updateSpuApi } from "@/api/modules/spu";
import { OnlineStatus } from "@/views/product/category/enums";
import { Spec } from "@/api/interface/spec";

interface Props {
	open: boolean;
	data: Array<Category.CategoryRes>;
	spu?: Spu.SpuRes;
	onCancel: () => void;
	onSuccess: () => void;
}
const AddEdit = ({ open, onCancel, onSuccess, data, spu }: Props) => {
	const [form] = Form.useForm();
	const [checked, setChecked] = useState<boolean>(true);
	const [keyList, setKeyList] = useState<Array<Spec.SpecKey>>([]);
	const onOk = () => {
		form.validateFields().then(values => {
			const params = {
				...values,
				online: checked ? OnlineStatus.ONLINE : OnlineStatus.OFFLINE
			};
			(spu ? updateSpuApi(spu.id as string, params) : createSpuApi(params)).then(() => {
				message.success(spu ? "修改SPU成功" : "创建SPU成功", 0.5).then(() => {
					onSuccess();
					onCancel();
				});
			});
		});
	};
	const fetchKeyList = () => {
		specKeyListApi().then(res => {
			setKeyList(res.data);
		});
	};
	const onClose = () => {
		onCancel();
	};

	const handleOnSwitchChange = (checked: boolean) => {
		setChecked(checked);
	};
	useEffect(() => {
		form.setFieldsValue({
			title: spu?.title,
			subtitle: spu?.subtitle,
			description: spu?.description,
			price: spu?.price,
			discount_price: spu?.discount_price,
			category: spu?.category.id,
			spec_key_list: spu?.specKeys.map(i => i.id),
			online: spu?.online === OnlineStatus.ONLINE
		});
		setChecked(spu?.online === OnlineStatus.ONLINE);
	}, [spu, form]);
	useEffect(() => {
		fetchKeyList();
	}, []);
	const layout = {
		labelCol: { span: 2 }
	};
	return (
		<Modal
			open={open}
			title={spu ? "修改SPU" : "创建SPU"}
			onCancel={onClose}
			onOk={onOk}
			width={"60%"}
			afterClose={() => form.resetFields()}
		>
			<Form {...layout} form={form}>
				<Form.Item label={"标题"} name={"title"} rules={[{ required: true, message: "请输入标题" }]}>
					<Input placeholder={"请输入标题"} />
				</Form.Item>
				<Form.Item label={"副标题"} name={"subtitle"}>
					<Input placeholder={"请输入副标题"} />
				</Form.Item>
				<Form.Item label={"描述"} name={"description"}>
					<Input placeholder={"请输入描述"} />
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
				<Form.Item label={"是否上架"} name={"online"} valuePropName={"checked"}>
					<Switch checkedChildren="上架" unCheckedChildren="下架" onChange={handleOnSwitchChange} />
				</Form.Item>
				<Form.Item label={"选择规格"} name={"spec_key_list"}>
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
