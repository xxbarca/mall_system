export namespace Spec {
	export interface SpecKey {
		id: string;
		name: string;
		values: Array<SpecValue>;
	}

	export interface SpecValue {
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
