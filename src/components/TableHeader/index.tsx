import "./index.less";
import { Button } from "antd";
interface Props {
	onClick: () => void;
	actionTitle?: string;
}
const TableHeader = ({ onClick, actionTitle = "添加分类" }: Props) => {
	return (
		<div className="table-header">
			<span>数据列表</span>
			<Button type="primary" onClick={() => onClick()}>
				{actionTitle}
			</Button>
		</div>
	);
};

export default TableHeader;
