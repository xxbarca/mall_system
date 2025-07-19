import AdvancedForm, { FormItemConfig } from "@/components/AdvancedForm";
import { useEffect, useState } from "react";
import { Spec } from "@/api/interface/spec";
import { PageMetaData, ReqPage } from "@/api/interface";
import { specKeyListAllApi, specValueListApi } from "@/api/modules/spec";
import dayjs from "dayjs";
import AdvancedTable from "@/components/AdvancedTable";

const SpecValue = () => {
	const [list, setList] = useState<Array<Spec.SpecValue>>([]);
	const [pageMeta, setPageMeta] = useState<PageMetaData>({});
	const [formParam, setFormParams] = useState<Record<string, any>>({});
	const [pageParam, setPageParam] = useState<ReqPage>({
		page: 1,
		limit: 2
	});
	const fetchKeyListApi = async () => {
		const res = await specKeyListAllApi();
		return res.data.map(i => ({
			label: i.name,
			value: i.id
		}));
	};
	const formItems: Array<FormItemConfig> = [
		{
			label: "规格值",
			name: "value",
			type: "INPUT",
			placeholder: "请输入规格值"
		},
		{
			label: "规格名",
			name: "key",
			type: "REMOTE_SELECT",
			fetchOptionsApi: fetchKeyListApi,
			placeholder: "请选择规格名"
		}
	];
	const columns = [
		{
			title: "序号",
			key: "index",
			width: 100,
			align: "center" as const,
			fixed: "left" as const,
			render: (text: string, record: Spec.SpecValue, index: number) => index
		},
		{
			title: "标题",
			key: "value",
			dataIndex: "value",
			width: 100,
			align: "center" as const,
			fixed: "left" as const
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

	const fetchKeyOptions = () => {
		specKeyListAllApi().then(res => {
			res.data.map(i => ({
				label: i.name,
				value: i.id
			}));
		});
	};

	const fetchList = () => {
		specValueListApi({ ...pageParam, ...formParam }).then(res => {
			const items = res.data.items.map(item => {
				return {
					...item,
					key: item.id
				};
			});
			setPageMeta(res.data.meta);
			setList(items);
		});
	};

	useEffect(() => {
		fetchKeyOptions();
	}, []);

	useEffect(() => {
		fetchList();
	}, [pageParam, formParam]);

	const onSubmit = (values: Record<string, any>) => {
		setFormParams(values);
	};

	const onReset = () => {
		setFormParams({});
	};

	const handleOnChange = (n: number, s: number) => {
		setPageParam({
			page: n,
			limit: s
		});
	};

	return (
		<div className={"card content-box"}>
			<AdvancedForm formItems={formItems} onSubmit={onSubmit} onReset={onReset}></AdvancedForm>
			<AdvancedTable columns={columns} list={list} pageMeta={pageMeta!} onChange={handleOnChange} />
		</div>
	);
};

export default SpecValue;
