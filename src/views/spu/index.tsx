import { Button, Col, Form, FormProps, Input, message, Popconfirm, Row, Select, Switch, Table, Tag } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Spu as SpuProp } from "@/api/interface/spu";
import { PageMetaData, ReqPage } from "@/api/interface";
import { spuListApi, switchSpuStatusApi } from "@/api/modules/spu";
import Page from "@/components/page";
import { OnlineStatus } from "@/views/product/category/enums";
import { categoryAllList } from "@/api/modules/category";
import { Category as CategoryProp } from "@/api/interface/category";
import AddEdit from "@/views/spu/components/add-edit";

type FieldType = {
	title?: string;
	category?: string;
	online?: string;
};

const Sku = () => {
	const [pageParam] = useState<ReqPage>({
		page: 1,
		limit: 10
	});
	const { Option } = Select;
	const [open, setOpen] = useState<boolean>(false);
	const [list, setList] = useState<Array<SpuProp.SpuRes>>([]);
	const [data, setData] = useState<Array<CategoryProp.CategoryRes>>([]);
	const [pageMeta, setPageMeta] = useState<PageMetaData>({} as PageMetaData);
	const [form] = Form.useForm();
	const switchStatus = (id: string) => {
		switchSpuStatusApi(id).then(res => {
			if (res.code === 200) {
				message.success("修改状态成功").then(() => {});
			}
		});
	};

	const onEdit = (id: string) => {
		console.log(id);
	};
	const onDelete = (id: string) => {
		console.log(id);
	};
	const fetchList = (param: ReqPage & FieldType) => {
		spuListApi(param).then(res => {
			const items = res.data.items.map((item: SpuProp.SpuRes) => {
				return {
					...item,
					key: item.id
				};
			});
			setList(items);
			setPageMeta(res.data.meta);
		});
	};
	const fetchCategory = () => {
		categoryAllList().then(res => {
			setData(res.data);
		});
	};
	const onFinish: FormProps<FieldType>["onFinish"] = values => {
		fetchList({ ...pageParam, ...values });
	};
	const onChange = (page: number, limit: number) => {
		console.log(page, limit);
	};

	const onSuccess = () => {};

	const onReset = () => {
		form.resetFields();
		fetchList(pageParam);
	};

	const columns = [
		{
			title: "序号",
			key: "index",
			align: "center" as const,
			fixed: "left" as const,
			render: (text: string, record: SpuProp.SpuRes, index: number) => index
		},
		{
			title: "图片",
			key: "img",
			dataIndex: "img",
			align: "center" as const,
			width: 150
		},
		{
			title: "标题",
			key: "title",
			dataIndex: "title",
			align: "center" as const
		},
		{
			title: "副标题",
			key: "subtitle",
			dataIndex: "subtitle",
			width: 180,
			align: "center" as const
		},
		{
			title: "价格(元)",
			key: "price",
			dataIndex: "price",
			align: "center" as const,
			width: 100
		},
		{
			title: "折扣价(元)",
			key: "discount_price",
			dataIndex: "discount_price",
			align: "center" as const,
			width: 100
		},
		{
			title: "分类",
			key: "category",
			dataIndex: "category",
			align: "center" as const,
			width: 100,
			render: (t: string, record: SpuProp.SpuRes) => <span>{record.category.name}</span>
		},
		{
			title: "标签",
			key: "tags",
			dataIndex: "tags",
			align: "center" as const,
			render: (t: string) => (
				<span>
					{t.split("$").map(tag => (
						<Tag color={"green"} key={tag}>
							{tag.toUpperCase()}
						</Tag>
					))}
				</span>
			)
		},
		{
			title: "是否上架",
			dataIndex: "online",
			key: "online",
			align: "center" as const,
			render: (text: string, record: SpuProp.SpuRes) => (
				<Switch defaultChecked={text === OnlineStatus.ONLINE} onChange={() => switchStatus(record.id)} />
			)
		},
		{
			title: "创建时间",
			dataIndex: "create_time",
			key: "create_time",
			align: "center" as const,
			width: 200,
			render: (t: string) => <div>{dayjs(t).format("YYYY-MM-DD hh:mm:ss")}</div>
		},
		{
			title: "更新时间",
			dataIndex: "update_time",
			key: "update_time",
			align: "center" as const,
			width: 200,
			render: (t: string) => <div>{dayjs(t).format("YYYY-MM-DD hh:mm:ss")}</div>
		},
		{
			title: "删除时间",
			dataIndex: "delete_time",
			key: "delete_time",
			align: "center" as const,
			width: 200,
			render: (t: string) => <div>{t ? dayjs(t).format("YYYY-MM-DD hh:mm:ss") : ""}</div>
		},
		{
			title: "操作",
			dataIndex: "",
			align: "center" as const,
			key: "x",
			width: 200,
			fixed: "right" as const,
			render: (_: any, record: SpuProp.SpuRes) => (
				<div>
					<Row gutter={10}>
						<Col>
							<Button size={"middle"} onClick={() => onEdit(record.id)}>
								编辑
							</Button>
						</Col>
						<Col>
							<Popconfirm title={"确认删除此条记录?"} onConfirm={() => onDelete(record.id)}>
								<Button danger type={"primary"} size={"middle"}>
									删除
								</Button>
							</Popconfirm>
						</Col>
					</Row>
				</div>
			)
		}
	];

	useEffect(() => {
		fetchList(pageParam);
		fetchCategory();
	}, []);
	return (
		<div className={"card content-box"}>
			<Form form={form} onFinish={onFinish}>
				<Row gutter={10}>
					<Col span={6}>
						<Form.Item label={"标题"} name={"title"}>
							<Input placeholder={"请输入标题"} />
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item label={"请选择分类"} name={"category"}>
							<Select
								allowClear
								placeholder={"请选择分类"}
								showSearch
								optionFilterProp="label"
								filterSort={(optionA, optionB) =>
									(optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
								}
								options={data.map(i => ({ label: i.name, value: i.id }))}
							></Select>
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item label={"是否上架"} name={"online"}>
							<Select placeholder={"请选择是否上架"}>
								<Option value={OnlineStatus.ONLINE}>上架</Option>
								<Option value={OnlineStatus.OFFLINE}>下架</Option>
							</Select>
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item label={null}>
							<Row gutter={10}>
								<Col>
									<Button type={"primary"} htmlType={"submit"}>
										搜索
									</Button>
								</Col>
								<Col>
									<Button onClick={onReset}>重置</Button>
								</Col>
								<Col>
									<Button type={"primary"} onClick={() => setOpen(true)}>
										添加
									</Button>
								</Col>
							</Row>
						</Form.Item>
					</Col>
				</Row>
			</Form>
			<Table columns={columns} dataSource={list} bordered scroll={{ x: "max-content" }} pagination={false} />
			<Page pageMeta={pageMeta} onChange={onChange} />
			<AddEdit open={open} data={data} onCancel={() => setOpen(false)} onSuccess={onSuccess} />
		</div>
	);
};

export default Sku;
