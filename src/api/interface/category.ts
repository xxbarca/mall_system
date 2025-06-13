export namespace Category {
	export interface CategoryRes {
		id: string;
		delete_time: string;
		update_time: string;
		create_time: string;
		level: number;
		online: number;
		index: number;
		img: string;
		name: string;
		description: string;
		parent_id: string;
		parent: CategoryRes;
	}
}
