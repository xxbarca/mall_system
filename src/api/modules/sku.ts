import http from "@/api";
import { PageResult } from "@/api/interface";
import { Sku } from "@/api/interface/sku";

export const skuListApi = (params: Record<string, any>) => {
	return http.post<PageResult<Sku.SkuRes>>("/sku/paginate", params);
};
