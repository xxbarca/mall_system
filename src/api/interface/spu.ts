import { Category } from "@/api/interface/category";
import { Spec } from "@/api/interface/spec";

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
		specKeys: Array<Spec.SpecKey>;
	}
}
