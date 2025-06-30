import http from "@/api";
import { PageResult, ResultData } from "@/api/interface";
import { Spu } from "@/api/interface/spu";
import { Spec } from "@/api/interface/spec";

export const spuListApi = (params: Record<string, any>) => {
	return http.post<PageResult<Spu.SpuRes>>("/spu/paginate", params);
};

export const specKeyListApi = () => {
	return http.get<ResultData<Array<Spec.SpecKey>>>("/spec/key/list");
};

export const switchSpuStatusApi = (id: string) => {
	return http.patch<ResultData<string>>(`/spu/switchStatus/${id}`);
};

export const createSpuApi = (params: Record<string, any>) => {
	return http.post<ResultData<string>>(`/spu`, params);
};

export const spuDeleteApi = (id: string) => {
	return http.delete(`/spu/${id}`);
};

export const updateSpuApi = (id: string, data: Partial<Spu.SpuRes>) => {
	return http.patch(`/spu`, { id, ...data });
};

export const spuAllList = () => {
	return http.get<ResultData>("/spu/all/list");
};

export const keyDetailApi = (id: string) => {
	return http.get<ResultData>(`/spec/key/detail/${id}`);
};

export const setDefaultSkuApi = (params: Record<string, any>) => {
	return http.post(`/spu/setDefaultSku`, params);
};
