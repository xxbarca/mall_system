import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { categoryAllList, categoryDeleteApi, categoryDetail, categoryListApi, switchStatusApi } from "@/api/modules/category";
import { Table, Popconfirm, Button, Row, Col, Switch, message, Form, Input, FormProps, Select } from "antd";
import { Category as CategoryProp } from "@/api/interface/category";
import { OnlineStatus } from "@/views/product/category/enums";
import { PageMetaData, ReqPage } from "@/api/interface";
import Page from "@/components/page";
import { AddEdit } from "@/views/product/category/componets/add-edit";

type FieldType = {
	name?: string;
	parent?: string;
};
const Category = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [list, setList] = useState<Array<CategoryProp.CategoryRes>>([]);
	const [data, setData] = useState<Array<CategoryProp.CategoryRes>>([]);
	const [pageMeta, setPageMeta] = useState<PageMetaData>({} as PageMetaData);
	const [cate, setCate] = useState<CategoryProp.CategoryRes>();
	const [pageParam, setPageParam] = useState<ReqPage>({
		page: 1,
		limit: 10
	});
	const [form] = Form.useForm();
	const { Option } = Select;
	const fetchList = (param: ReqPage & FieldType) => {
		categoryListApi(param).then(res => {
			const items = res.data.items.map((item: CategoryProp.CategoryRes) => {
				return {
					...item,
					key: item.id
				};
			});
			setList(items);
			setPageMeta(res.data.meta);
		});
	};
	const fetchAll = () => {
		categoryAllList().then(res => {
			setData(res.data);
		});
	};
	useEffect(() => {
		fetchList(pageParam);
		fetchAll();
	}, []);
	const onDelete = (id: string) => {
		categoryDeleteApi(id).then(res => {
			if (res.code === 200) {
				message.success("删除分类成功", 0.5).then(() => {
					fetchList(pageParam);
				});
			}
		});
	};
	const onEdit = (id: string) => {
		categoryDetail(id).then(res => {
			setCate(res.data);
			setOpen(true);
		});
	};
	const onChange = (page: number, limit: number) => {
		setPageParam({
			page,
			limit
		});
		fetchList({ page, limit });
	};

	const switchStatus = (id: string) => {
		switchStatusApi(id).then(res => {
			if (res.code === 200) {
				message.success("修改状态成功").then(() => {});
			}
		});
	};

	const onFinish: FormProps<FieldType>["onFinish"] = values => {
		fetchList({ ...pageParam, ...values });
	};

	const onReset = () => {
		form.resetFields();
		fetchList(pageParam);
	};

	const onSuccess = () => {
		fetchList(pageParam);
	};

	const columns = [
		{
			title: "序号",
			key: "index",
			align: "center" as const,
			render: (text: string, record: CategoryProp.CategoryRes, index: number) => index
		},
		{ title: "分类名称", dataIndex: "name", key: "name", align: "center" as const },
		{ title: "分类描述", dataIndex: "description", key: "description", align: "center" as const },
		{ title: "排序", dataIndex: "index", key: "index", align: "center" as const },
		{ title: "图片", dataIndex: "img", key: "img", align: "center" as const },
		{
			title: "是否上线",
			dataIndex: "online",
			key: "online",
			align: "center" as const,
			render: (text: string, record: CategoryProp.CategoryRes) => (
				<Switch defaultChecked={text === OnlineStatus.ONLINE} onChange={() => switchStatus(record.id)} />
			)
		},
		{
			title: "父分类",
			dataIndex: "parent",
			key: "parent",
			align: "center" as const,
			render: (_: any, record: CategoryProp.CategoryRes) => <div>{record.parent ? record.parent.name : ""}</div>
		},
		{
			title: "创建时间",
			dataIndex: "create_time",
			key: "create_time",
			align: "center" as const,
			render: (t: string) => <div>{dayjs(t).format("YYYY-MM-DD hh:mm:ss")}</div>
		},
		{
			title: "更新时间",
			dataIndex: "update_time",
			key: "update_time",
			align: "center" as const,
			render: (t: string) => <div>{dayjs(t).format("YYYY-MM-DD hh:mm:ss")}</div>
		},
		{
			title: "删除时间",
			dataIndex: "delete_time",
			key: "delete_time",
			align: "center" as const,
			render: (t: string) => <div>{t ? dayjs(t).format("YYYY-MM-DD hh:mm:ss") : ""}</div>
		},
		{
			title: "操作",
			dataIndex: "",
			align: "center" as const,
			key: "x",
			render: (_: any, record: CategoryProp.CategoryRes) => (
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
	return (
		<div className="card content-box">
			<Form onFinish={onFinish} form={form}>
				<Row gutter={10}>
					<Col span={6}>
						<Form.Item label={"分类名称"} name={"name"}>
							<Input placeholder={"请输入分类名称"} />
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item label={"父分类"} name={"parent"}>
							<Select
								allowClear
								placeholder={"请选择父分类"}
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
						<Form.Item label={"是否上线"} name={"online"}>
							<Select placeholder={"请选择是否在线"}>
								<Option value={OnlineStatus.ONLINE}>在线</Option>
								<Option value={OnlineStatus.OFFLINE}>下线</Option>
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
			<Table bordered dataSource={list} columns={columns} pagination={false} />
			<Page pageMeta={pageMeta} onChange={onChange} />
			<AddEdit open={open} data={data} cate={cate} onCancel={() => setOpen(false)} onSuccess={onSuccess} />
		</div>
	);
};

export default Category;
