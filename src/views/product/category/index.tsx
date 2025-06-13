import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { categoryAllList, categoryDeleteApi, categoryDetail, categoryListApi, switchStatusApi } from "@/api/modules/category";
import { Table, Popconfirm, Button, Row, Col, Switch, message } from "antd";
import { AddDrawer } from "@/views/product/category/componets/add-drawer";
import { Category as CategoryProp } from "@/api/interface/category";
import { OnlineStatus } from "@/views/product/category/enums";
import { PageMetaData } from "@/api/interface";
import Page from "@/components/page";
import TableHeader from "@/components/TableHeader";

const Category = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [list, setList] = useState<Array<CategoryProp.CategoryRes>>([]);
	const [data, setData] = useState<Array<CategoryProp.CategoryRes>>([]);
	const [pageMeta, setPageMeta] = useState<PageMetaData>({} as PageMetaData);
	const [cate, setCate] = useState<CategoryProp.CategoryRes>();
	const fetchList = (page: number = 1, limit: number = 10) => {
		categoryListApi({ page, limit }).then(res => {
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
		fetchList();
		fetchAll();
	}, []);
	const onDelete = (id: string) => {
		categoryDeleteApi(id).then(res => {
			if (res.code === 200) {
				fetchList();
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
		fetchList(page, limit);
	};

	const switchStatus = (id: string) => {
		switchStatusApi(id).then(res => {
			if (res.code === 200) {
				message.success("修改状态成功").then(() => {});
			}
		});
	};

	const columns = [
		{ title: "分类名称", dataIndex: "name", key: "name", align: "center" },
		{ title: "分类描述", dataIndex: "description", key: "description", align: "center" },
		{ title: "排序", dataIndex: "index", key: "index", align: "center" },
		{ title: "图片", dataIndex: "img", key: "img", align: "center" },
		{
			title: "是否上线",
			dataIndex: "online",
			key: "online",
			align: "center",
			render: (text: number, record: CategoryProp.CategoryRes) => (
				<Switch defaultChecked={text === OnlineStatus.ONLINE} onChange={() => switchStatus(record.id)} />
			)
		},
		{
			title: "父分类",
			dataIndex: "parent",
			key: "parent",
			align: "center",
			render: (_: any, record: CategoryProp.CategoryRes) => <div>{record.parent ? record.parent.name : ""}</div>
		},
		{
			title: "创建时间",
			dataIndex: "create_time",
			key: "create_time",
			align: "center",
			render: (t: string) => <div>{dayjs(t).format("YYYY-MM-DD hh:mm:ss")}</div>
		},
		{
			title: "更新时间",
			dataIndex: "update_time",
			key: "update_time",
			align: "center",
			render: (t: string) => <div>{dayjs(t).format("YYYY-MM-DD hh:mm:ss")}</div>
		},
		{
			title: "删除时间",
			dataIndex: "delete_time",
			key: "delete_time",
			align: "center",
			render: (t: string) => <div>{t ? dayjs(t).format("YYYY-MM-DD hh:mm:ss") : ""}</div>
		},
		{
			title: "操作",
			dataIndex: "",
			align: "center",
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
			<TableHeader onClick={() => setOpen(true)} />
			<Table bordered dataSource={list} columns={columns} pagination={false} />
			<Page pageMeta={pageMeta} onChange={onChange} />
			<AddDrawer open={open} onClose={() => setOpen(false)} onSuccess={fetchList} data={data} cate={cate} />
		</div>
	);
};

export default Category;
