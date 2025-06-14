// * 请求响应参数(不包含data)
export interface Result {
	code: number;
	message: string | string[];
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data: T;
}

export interface PageMetaData {
	currentPage: number;
	itemCount: number;
	perPage: number;
	totalItems: number;
	totalPages: number;
}

export interface PageData<T = any> extends Result {
	data: {
		items: Array<T>;
		meta: PageMetaData;
	};
}

// * 分页响应参数
export interface ResPage<T> {
	datalist: T[];
	pageNum: number;
	pageSize: number;
	total: number;
}

// * 分页请求参数
export interface ReqPage {
	page: number;
	limit: number;
}

// * 登录
export namespace Login {
	export interface ReqLoginForm {
		username: string;
		password: string;
	}
	export interface ResLogin {
		accessToken: string;
		refreshToken: string;
	}
	export interface ResAuthButtons {
		[propName: string]: any;
	}
}
