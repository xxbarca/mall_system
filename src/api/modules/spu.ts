import http from "@/api";
import { PageResult, ResultData } from "@/api/interface";
import { SpecKey, Spu } from "@/api/interface/spu";

export const spuListApi = (params: Record<string, any>) => {
	return http.post<PageResult<Spu.SpuRes>>("/spu/paginate", params);
};

export const specKeyListApi = () => {
	return http.get<ResultData<Array<SpecKey.KeyRes>>>("/spec/key/list");
};
