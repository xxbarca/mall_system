import { RouteObject } from "@/routers/interface";
import { LayoutIndex } from "@/routers/constant";
import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";

const productRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "商品管理"
		},
		children: [
			{
				path: "product/category",
				element: lazyLoad(React.lazy(() => import("@/views/product/category/index"))),
				meta: {
					requiresAuth: true,
					title: "分类管理",
					key: "category"
				}
			}
		]
	}
];
export default productRouter;
