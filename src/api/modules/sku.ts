import http from "@/api";
import { PageResult } from "@/api/interface";
import { Sku } from "@/api/interface/sku";

export const skuListApi = (params: Record<string, any>) => {
	return http.post<PageResult<Sku.SkuRes>>("/sku/paginate", params);
};

export const createSkuApi = (params: Record<string, any>) => {
	return http.post("/sku", params);
};

export const updateSkuApi = (params: Record<string, any>) => {
	return http.patch("/sku", params);
};
