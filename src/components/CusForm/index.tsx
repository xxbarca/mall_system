import { Form, Input, Select } from "antd";
import { forwardRef } from "react";

export type CusFormItemType = "INPUT" | "SELECT";

export interface CusFormItemProp {
	label: string;
	name: string;
	rules?: any[];
	type: CusFormItemType;
	defaultValue?: string;
	options?: Array<{ label: string; value: string }>;
	placeholder?: string;
}

export interface CusFormProps {
	formItems: Array<CusFormItemProp>;
}

const getFormItemChild = (item: CusFormItemProp) => {
	const { type, options, placeholder } = item;
	if (type === "INPUT") {
		return <Input placeholder={placeholder} />;
	} else if (type === "SELECT") {
		return <Select options={options} placeholder={placeholder} />;
	}
	return null;
};

const CusForm = forwardRef(({ formItems }: CusFormProps, ref) => {
	const [form] = Form.useForm();

	return (
		<Form form={form} labelCol={{ span: 2 }} ref={ref}>
			{formItems.map((item, i) => (
				<Form.Item label={item.label} name={item.name} key={i} rules={item.rules}>
					{getFormItemChild(item)}
				</Form.Item>
			))}
		</Form>
	);
});

CusForm.displayName = "CusForm";

// const CusForm = ({ formItems }: CusFormProps) => {
// 	const [form] = Form.useForm();
// 	return (
// 		<Form form={form} labelCol={{ span: 2 }}>
// 			{formItems.map((item, i) => (
// 				<Form.Item label={item.label} name={item.name} key={i} rules={item.rules}>
// 					{getFormItemChild(item)}
// 				</Form.Item>
// 			))}
// 		</Form>
// 	);
// };

export default CusForm;
