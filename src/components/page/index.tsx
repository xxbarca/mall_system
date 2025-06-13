import "./index.less";
import { Pagination } from "antd";
import { PageMetaData } from "@/api/interface";

interface Prop {
	pageMeta: PageMetaData;
	onChange: (page: number, limit: number) => void;
}

const Page = ({ pageMeta, onChange }: Prop) => {
	return (
		<div className={"page"}>
			<Pagination current={pageMeta.currentPage} total={pageMeta.totalItems} onChange={onChange} align={"end"} />
		</div>
	);
};

export default Page;
