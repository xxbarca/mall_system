import { Button, Col, Form, FormProps, Input, Popconfirm, Row, Select, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ReqPage } from "@/api/interface";
import { skuListApi } from "@/api/modules/sku";
import { Sku as SkuProp } from "@/api/interface/sku";
import { OnlineStatus } from "@/views/product/category/enums";
import { spuAllList } from "@/api/modules/spu";
import { Spu } from "@/api/interface/spu";
import AddEdit from "@/views/sku/components/add-edit";

type FieldType = {
	title?: string;
	spu?: string;
	online?: string;
};

const Sku = () => {
	const [list, setList] = useState<Array<SkuProp.SkuRes>>([]);
	const [spuList, setSpuList] = useState<Array<Spu.SpuRes>>([]);
	const [form] = Form.useForm();
	const [open, setOpen] = useState(false);
	const [sku, setSku] = useState<SkuProp.SkuRes | null>();
	const [pageParam] = useState<ReqPage>({
		page: 1,
		limit: 10
	});
	const { Option } = Select;

	const fetchList = (param: ReqPage & FieldType) => {
		skuListApi(param).then(res => {
			const items = res.data.items.map((item: SkuProp.SkuRes) => {
				return {
					...item,
					key: item.id
				};
			});
			setList(items);
		});
	};

	const onFinish: FormProps<FieldType>["onFinish"] = values => {
		fetchList({ ...pageParam, ...values });
	};

	const fetchSpuList = () => {
		spuAllList().then(res => {
			setSpuList(res.data);
		});
	};
	const onEdit = (sku: SkuProp.SkuRes | null) => {
		setOpen(true);
		setSku(sku);
	};

	const onSuccess = () => {
		fetchList(pageParam);
	};

	const onDelete = (id: string) => {
		console.log(id);
	};

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
			render: (text: string, record: SkuProp.SkuRes, index: number) => index + 1
		},
		{
			title: "标题",
			key: "title",
			dataIndex: "title",
			align: "center" as const
		},
		{
			title: "SPU",
			key: "spu",
			dataIndex: "spu",
			align: "center" as const,
			render: (text: string, record: SkuProp.SkuRes) => <span>{record.spu.title}</span>
		},
		{
			title: "图片",
			key: "img",
			dataIndex: "img",
			align: "center" as const,
			width: 150
		},
		{
			title: "是否上架",
			dataIndex: "online",
			key: "online",
			align: "center" as const,
			render: (text: string) => (
				<Tag color={text === OnlineStatus.ONLINE ? "#108ee9" : "red"}>{text === OnlineStatus.ONLINE ? "上架" : "下架"}</Tag>
			)
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
			title: "库存(个)",
			key: "stock",
			dataIndex: "stock",
			width: 100,
			align: "center" as const
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
			render: (_: any, record: SkuProp.SkuRes, index: number) => (
				<div>
					<Row gutter={10} justify={"center"}>
						<Col>
							<Button size={"small"} onClick={() => onEdit(list[index])}>
								编辑
							</Button>
						</Col>
						<Col>
							<Popconfirm title={"确认删除此条记录?"} onConfirm={() => onDelete(record.id)}>
								<Button danger type={"primary"} size={"small"}>
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
		fetchSpuList();
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
						<Form.Item label={"SPU"} name={"spu"}>
							<Select
								allowClear
								placeholder={"请选择SPU"}
								showSearch
								optionFilterProp="label"
								filterSort={(optionA, optionB) =>
									(optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
								}
								options={spuList.map(i => ({ label: i.title, value: i.id }))}
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
									<Button type={"primary"} onClick={() => onEdit(null)}>
										添加
									</Button>
								</Col>
							</Row>
						</Form.Item>
					</Col>
				</Row>
			</Form>
			<Table columns={columns} dataSource={list} bordered scroll={{ x: "max-content" }} pagination={false} />
			<AddEdit open={open} sku={sku} spuList={spuList} onCancel={() => setOpen(false)} onSuccess={onSuccess} />
		</div>
	);
};

export default Sku;
