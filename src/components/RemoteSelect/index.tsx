import { Select } from "antd";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
interface Props {
	fetchOptionsApi: () => any;
	debounceTimeout?: number;
	placeholder?: string;
	onChange?: (value: string) => void;
	allowClear: boolean;
}

const RemoteSelect = (p: Props) => {
	const [options, setOptions] = useState([]);
	const [loading, setLoading] = useState(false);
	const { fetchOptionsApi, debounceTimeout = 500, placeholder, onChange, allowClear = true } = p;
	// 防抖的获取选项函数
	const debounceFetcher = debounce(async () => {
		try {
			setLoading(true);
			const newOptions = await fetchOptionsApi();
			setOptions(newOptions);
		} catch (error) {
			console.error("Failed to fetch options:", error);
		} finally {
			setLoading(false);
		}
	}, debounceTimeout);
	useEffect(() => {
		// 组件加载时获取初始选项
		debounceFetcher();
		// 清除防抖函数
		return () => {
			debounceFetcher.cancel();
		};
	}, []);
	return <Select options={options} loading={loading} placeholder={placeholder} onChange={onChange} allowClear={allowClear} />;
};

export default RemoteSelect;
