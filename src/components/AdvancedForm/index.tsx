import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import React, { forwardRef, useImperativeHandle } from "react";
import RemoteSelect from "@/components/RemoteSelect";

export type CusFormItemType = "INPUT" | "SELECT" | "REMOTE_SELECT" | "DATE" | "SWITCH" | "UPLOAD";

export interface FormItemConfig {
	label: string;
	name: string;
	rules?: any[];
	type: CusFormItemType;
	defaultValue?: any;
	options?: Array<{ label: string; value: string }>;
	placeholder?: string;
	disabled?: boolean;
	span?: number; // 栅格布局span
	customRender?: (form: any) => React.ReactNode;
	fetchOptionsApi?: () => any;
	allowClear?: boolean;
}

export interface CusFormProps {
	formItems: Array<FormItemConfig>;
	onSubmit: (values: any) => void;
	showReset?: boolean;
	showSubmit?: boolean;
	showAdd?: boolean;
	onReset?: () => void;
}

const AdvancedForm = forwardRef(
	({ formItems, onSubmit, showSubmit = true, showReset = true, showAdd = true, onReset: reset }: CusFormProps, ref) => {
		const [form] = Form.useForm();
		const onFinish = (values: Record<string, any>) => {
			onSubmit(values);
		};
		const onReset = () => {
			form.resetFields();
			if (reset) {
				reset();
			}
		};

		const onFieldChange = (v: string, name: string) => {
			form.setFieldValue(name, v);
		};

		const renderFormItem = (item: FormItemConfig) => {
			const { type, options, placeholder, disabled, fetchOptionsApi, allowClear = true } = item;
			switch (type) {
				case "INPUT":
					return <Input placeholder={placeholder || `请输入${item.label}`} disabled={disabled} allowClear={allowClear} />;
				case "SELECT":
					return (
						<Select
							options={options}
							placeholder={placeholder || `请选择${item.label}`}
							disabled={disabled}
							allowClear={allowClear}
						/>
					);
				case "REMOTE_SELECT":
					return (
						<RemoteSelect
							fetchOptionsApi={fetchOptionsApi!}
							placeholder={placeholder}
							allowClear={allowClear}
							onChange={v => onFieldChange(v, item.name)}
						/>
					);
				default:
					return <Input placeholder={placeholder || `请输入${item.label}`} disabled={disabled} />;
			}
		};

		useImperativeHandle(ref, () => ({
			form,
			reset: form.resetFields
		}));
		return (
			<Form form={form} labelCol={{ span: 6 }} onFinish={onFinish}>
				<Row gutter={10}>
					{formItems.map(item => (
						<Col span={item.span || 6} key={item.name}>
							<Form.Item initialValue={item.defaultValue} label={item.label} name={item.name} rules={item.rules}>
								{renderFormItem(item)}
							</Form.Item>
						</Col>
					))}
					<Col span={6}>
						{(showReset || showReset || showAdd) && (
							<Form.Item>
								<Space>
									{showSubmit && (
										<Button type={"primary"} htmlType={"submit"}>
											搜索
										</Button>
									)}
									{showReset && <Button onClick={onReset}>重置</Button>}
									{showAdd && <Button type={"primary"}>添加</Button>}
								</Space>
							</Form.Item>
						)}
						{/*<Form.Item label={null}>*/}
						{/*	<Row gutter={10}>*/}
						{/*		<Col>*/}
						{/*			<Button type={"primary"} htmlType={"submit"}>*/}
						{/*				搜索*/}
						{/*			</Button>*/}
						{/*		</Col>*/}
						{/*		<Col>*/}
						{/*			<Button onClick={onReset}>重置</Button>*/}
						{/*		</Col>*/}
						{/*		<Col>*/}
						{/*			<Button type={"primary"}>添加</Button>*/}
						{/*		</Col>*/}
						{/*	</Row>*/}
						{/*</Form.Item>*/}
					</Col>
				</Row>
			</Form>
		);
	}
);

AdvancedForm.displayName = "AdvancedForm";

// const AdvancedForm = ({ formItems }: CusFormProps) => {
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

export default AdvancedForm;
