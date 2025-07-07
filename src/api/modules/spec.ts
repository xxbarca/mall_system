import http from "@/api";
import { PageResult } from "@/api/interface";
import { Spec } from "@/api/interface/spec";

export const specKeyListApi = (params: Record<string, any>) => {
	return http.post<PageResult<Spec.SpecKey>>("/spec/paginate/key", params);
};

export const specKeyCreateApi = (params: Record<string, any>) => {
	return http.post("/spec/key", params);
};
