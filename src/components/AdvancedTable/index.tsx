import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Table } from "antd";
import { PageMetaData } from "@/api/interface";

interface AdvancedTableProps {
	columns: Array<Record<string, any>>;
	list: Array<Record<string, any>>;
	bordered?: boolean;
	pageMeta: PageMetaData;
	onChange?: (pageNumber: number, pageSize: number) => void;
	onShowSizeChange?: (pageSize: number) => void;
}

const AdvancedTable = forwardRef((props: AdvancedTableProps, ref) => {
	const { columns, list, bordered = true, pageMeta, onChange, onShowSizeChange } = props;
	const { currentPage, perPage, totalItems } = pageMeta;
	const [pageParam, setPageParam] = useState<{ pageNum: number; pageSize: number }>({
		pageNum: 1,
		pageSize: 10
	});
	useEffect(() => {
		setPageParam({
			pageNum: currentPage,
			pageSize: perPage
		});
	});
	useImperativeHandle(ref, () => ({}));

	const handleOnChange = (n: number, s: number) => {
		setPageParam({
			pageNum: n,
			pageSize: s
		});
		if (onChange) {
			onChange(n, s);
		}
	};

	const handleOnShowSizeChange = (s: number) => {
		if (onShowSizeChange) {
			onShowSizeChange(s);
		}
	};

	return (
		<Table
			columns={columns}
			dataSource={list}
			bordered={bordered}
			pagination={{
				size: "small",
				defaultCurrent: 1,
				defaultPageSize: 10,
				current: pageParam.pageNum,
				pageSize: pageParam.pageSize,
				total: totalItems,
				position: ["bottomRight"],
				showQuickJumper: true,
				pageSizeOptions: [10, 20, 30],
				hideOnSinglePage: true,
				onChange: handleOnChange,
				onShowSizeChange: handleOnShowSizeChange
			}}
		/>
	);
});

AdvancedTable.displayName = "AdvancedTable";

export default AdvancedTable;
