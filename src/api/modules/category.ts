import http from "@/api";
import { PageResult, Result, ResultData } from "@/api/interface";
import { Category } from "@/api/interface/category";

export const categoryListApi = (params: Object) => {
	return http.post<PageResult<Category.CategoryRes>>("/category/paginate", params);
};

export const categoryCreateApi = (params: Object) => {
	return http.post<Result>("/category", params);
};

export const categoryDeleteApi = (id: string) => {
	return http.delete(`/category/${id}`);
};

export const categoryAllList = () => {
	return http.get<ResultData>("/category/all/list");
};

export const categoryDetail = (id: string) => {
	return http.get<ResultData<Category.CategoryRes>>(`/category/${id}`);
};

export const updateCategoryApi = (id: string, data: Partial<Category.CategoryRes>) => {
	return http.patch(`/category`, { id, ...data });
};

export const switchStatusApi = (id: string) => {
	return http.patch<ResultData>(`/category/switchStatus/${id}`);
};
