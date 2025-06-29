import { Form, Input, message, Modal, Select, Switch } from "antd";
import { Sku } from "@/api/interface/sku";
import { useEffect, useState } from "react";
import { Spu } from "@/api/interface/spu";
import { OnlineStatus } from "@/views/product/category/enums";
import { createSkuApi, updateSkuApi } from "@/api/modules/sku";
import { Spec } from "@/api/interface/spec";

interface Props {
	open: boolean;
	sku?: Sku.SkuRes | null;
	spuList: Array<Spu.SpuRes>;
	onCancel: () => void;
	onSuccess: () => void;
}

const AddEdit = ({ open, sku, onCancel, spuList, onSuccess }: Props) => {
	const [checked, setChecked] = useState(false);
	const [selectedSpu, setSelectedSpu] = useState<Spu.SpuRes | null>();
	const [specs, setSpecs] = useState<Array<Spec.Spec>>([]);
	const [form] = Form.useForm();

	const onClose = () => {
		onCancel();
	};

	const onOk = () => {
		form.validateFields().then(values => {
			const params = {
				...values,
				online: checked ? OnlineStatus.ONLINE : OnlineStatus.OFFLINE,
				specs
			};
			const keys = selectedSpu?.specKeys.map(i => i.id);
			keys?.forEach(key => delete params[key]);
			(sku ? updateSkuApi({ ...params, id: sku.id }) : createSkuApi(params)).then(() => {
				message.success(sku ? "修改SKU成功" : "创建SKU成功", 0.5).then(() => {
					onSuccess();
					onCancel();
				});
			});
		});
	};

	const handleOnSwitchChange = (checked: boolean) => {
		setChecked(checked);
	};

	const setSpu = (spu: Spu.SpuRes | null) => {
		setSelectedSpu(spu);
	};

	const handleOnSpuSelected = (v: string) => {
		const selectedSpu = spuList.find(item => item.id === v);
		setSpu(selectedSpu!);
	};

	const handleOnClose = () => {
		form.resetFields();
		setSpu(null);
	};

	const handleOnSelect = (o: { label: string; value: string }, i: Spec.SpecKey) => {
		const obj = {
			key: i.name,
			key_id: i.id,
			value: o.label,
			value_id: o.value
		};
		const index = specs?.findIndex(i => i.key_id === obj.key_id);
		if (index === -1) {
			specs?.push(obj);
		} else {
			specs?.splice(index, 1, obj);
		}
		setSpecs(specs);
	};

	useEffect(() => {
		if (sku) {
			form.setFieldsValue({
				...sku,
				spu: sku.spu.id,
				online: sku.online === OnlineStatus.ONLINE
			});
			setSelectedSpu(sku.spu);
			setSpecs(sku.specs);
			sku.specs.forEach(i => form.setFieldValue([i.key_id], i.value_id));
		}
	}, [sku]);

	return (
		<Modal
			open={open}
			title={sku ? "修改SKU" : "创建SKU"}
			width={"60%"}
			onCancel={onClose}
			onOk={onOk}
			afterClose={handleOnClose}
		>
			<Form form={form} labelCol={{ span: 2 }}>
				<Form.Item label={"标题"} name={"title"} rules={[{ required: true, message: "请输入标题" }]}>
					<Input placeholder={"请输入标题"} />
				</Form.Item>
				<Form.Item label={"SPU"} name={"spu"} rules={[{ required: true, message: "请选择SPU" }]}>
					<Select
						allowClear
						placeholder={"请选择SPU"}
						showSearch
						optionFilterProp="label"
						onSelect={handleOnSpuSelected}
						filterSort={(optionA, optionB) =>
							(optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
						}
						options={spuList.map(i => ({ label: i.title, value: i.id }))}
					></Select>
				</Form.Item>
				<Form.Item label={"价格"} name={"price"} rules={[{ required: true, message: "请输入价格" }]}>
					<Input placeholder={"请输入价格"} type={"number"} />
				</Form.Item>
				<Form.Item label={"折扣价"} name={"discount_price"} rules={[{ required: true, message: "请输入价格" }]}>
					<Input placeholder={"请输入折扣价"} type={"number"} />
				</Form.Item>
				<Form.Item label={"库存"} name={"stock"} rules={[{ required: true, message: "请输入库存" }]}>
					<Input placeholder={"请输入库存"} type={"number"} />
				</Form.Item>
				<Form.Item label={"是否上架"} name={"online"} valuePropName={"checked"}>
					<Switch checkedChildren="上架" unCheckedChildren="下架" defaultChecked={true} onChange={handleOnSwitchChange} />
				</Form.Item>
				{selectedSpu &&
					selectedSpu.specKeys.map(i => {
						return (
							<Form.Item label={i.name} name={i.id} key={i.id} rules={[{ required: true, message: "请选择" + i.name }]}>
								<Select
									allowClear
									placeholder={"请选择" + i.name}
									showSearch
									optionFilterProp="label"
									defaultValue={specs.find(s => s.key_id === i.id)?.value_id}
									onSelect={(v, o) => handleOnSelect(o, i)}
									filterSort={(optionA, optionB) =>
										(optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
									}
									options={i.values.map(d => ({ label: d.value, value: d.id }))}
								/>
							</Form.Item>
						);
					})}
			</Form>
		</Modal>
	);
};
export default AddEdit;
