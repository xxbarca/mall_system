import { RouteObject } from "@/routers/interface";
import { LayoutIndex } from "@/routers/constant";
import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";

const spuRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "SPU管理"
		},
		children: [
			{
				path: "spu",
				element: lazyLoad(React.lazy(() => import("@/views/spu/index"))),
				meta: {
					requiresAuth: true,
					title: "SPU列表",
					key: "spu"
				}
			}
		]
	}
];
export default spuRouter;
