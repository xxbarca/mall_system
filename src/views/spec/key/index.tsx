import { Button, Col, Form, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { ReqPage } from "@/api/interface";
import { specKeyListApi } from "@/api/modules/spec";
import { Spec } from "@/api/interface/spec";
import dayjs from "dayjs";
import { KeyAddEdit } from "@/views/spec/components/key-add-edit";

const SpecKey = () => {
	const [list, setList] = useState<Array<Spec.SpecKey>>([]);
	const [open, setOpen] = useState(false);
	const [pageParam] = useState<ReqPage>({
		page: 1,
		limit: 10
	});

	const fetchList = (param: ReqPage) => {
		specKeyListApi(param).then(res => {
			const items = res.data.items.map((item: Spec.SpecKey) => {
				return {
					...item,
					key: item.id
				};
			});
			setList(items);
		});
	};

	const onSuccess = () => {
		setOpen(false);
		fetchList(pageParam);
	};

	useEffect(() => {
		fetchList(pageParam);
	}, []);

	const columns = [
		{
			title: "序号",
			key: "index",
			width: 100,
			align: "center" as const,
			fixed: "left" as const,
			render: (text: string, record: Spec.SpecKey, index: number) => index
		},
		{
			title: "标题",
			key: "name",
			dataIndex: "name",
			align: "center" as const
		},
		{
			title: "单位",
			key: "unit",
			dataIndex: "unit",
			align: "center" as const
		},
		{
			title: "创建时间",
			key: "create_time",
			dataIndex: "create_time",
			align: "center" as const,
			render: (t: string) => <div>{dayjs(t).format("YYYY-MM-DD hh:mm:ss")}</div>
		},
		{
			title: "删除时间",
			key: "delete_time",
			dataIndex: "delete_time",
			align: "center" as const,
			render: (t: string) => <div>{t ? dayjs(t).format("YYYY-MM-DD hh:mm:ss") : ""}</div>
		},
		{
			title: "更新时间",
			key: "update_time",
			dataIndex: "update_time",
			align: "center" as const,
			render: (t: string) => <div>{t ? dayjs(t).format("YYYY-MM-DD hh:mm:ss") : ""}</div>
		}
	];
	return (
		<div className={"card content-box"}>
			<Form>
				<Row gutter={10}>
					<Col span={6}>
						<Form.Item label={null}>
							<Row gutter={10}>
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
			<KeyAddEdit open={open} onSuccess={onSuccess} onCancel={() => setOpen(false)} />
		</div>
	);
};

export default SpecKey;
