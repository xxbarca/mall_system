import { BaseRes } from "@/api/interface/index";

export namespace Spec {
	export interface SpecKey extends BaseRes {
		id: string;
		name: string;
		values?: Array<SpecValue>;
		unit: string;
	}

	export interface SpecValue extends BaseRes {
		id: string;
		value: string;
	}

	export interface Spec {
		key: string;
		key_id: string;
		value: string;
		value_id: string;
	}
}
