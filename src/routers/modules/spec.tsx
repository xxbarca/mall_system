import { RouteObject } from "@/routers/interface";
import { LayoutIndex } from "@/routers/constant";
import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";

const specRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "规格管理"
		},
		children: [
			{
				path: "/spec/key",
				element: lazyLoad(React.lazy(() => import("@/views/spec/key"))),
				meta: {
					requiresAuth: true,
					title: "规格名列表",
					key: "spec_key"
				}
			},
			{
				path: "/spec/value",
				element: lazyLoad(React.lazy(() => import("@/views/spec/value"))),
				meta: {
					requiresAuth: true,
					title: "规格值列表",
					key: "spec_value"
				}
			}
		]
	}
];
export default specRouter;
