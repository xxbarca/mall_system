import { Spu } from "@/api/interface/spu";
import { Spec } from "@/api/interface/spec";

export namespace Sku {
	export interface SkuRes {
		id: string;
		title: string;
		delete_time: string;
		update_time: string;
		create_time: string;
		online: string;
		img: string;
		price: string;
		discount_price: string;
		spu: Spu.SpuRes;
		specs: Array<Spec.Spec>;
	}
}
