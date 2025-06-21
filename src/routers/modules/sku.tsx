import React from "react";
import { RouteObject } from "@/routers/interface";
import { LayoutIndex } from "@/routers/constant";
import lazyLoad from "@/routers/utils/lazyLoad";

const skuRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "SKU管理"
		},
		children: [
			{
				path: "sku",
				element: lazyLoad(React.lazy(() => import("@/views/sku/index"))),
				meta: {
					requiresAuth: true,
					title: "SKU列表",
					key: "sku"
				}
			}
		]
	}
];
export default skuRouter;
