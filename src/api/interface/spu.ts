import { Category } from "@/api/interface/category";

export namespace Spu {
	export interface SpuRes {
		id: string;
		delete_time: string;
		update_time: string;
		create_time: string;
		online: string;
		title: string;
		subtitle: string;
		description: string;
		tags: string;
		img: string;
		price: string;
		discount_price: string;
		category: Category.CategoryRes;
		specKeys: Array<SpecKey.KeyRes>;
	}
}

export namespace SpecKey {
	export interface KeyRes {
		id: string;
		name: string;
	}
}
